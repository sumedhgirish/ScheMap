import "./Workspace.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "./api/axios";

function Heading({ metadata }) {
  function formatDate(d) {
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  const creation_date = new Date(metadata.creationDate);
  return (
    <div className="heading card">
      <div className="headline">
        <h1 className="title">{metadata.title}</h1>
        <p className="doc">{formatDate(creation_date)}</p>
      </div>
      <p className="desc">{metadata.desc}</p>
    </div>
  );
}

function Todo({ todo, projectId, redraw }) {
  function Card({ task, i }) {
    return (
      <div key={task.task} className="task">
        <input
          type="button"
          className={task.completed ? "checkBox" : "checkedBox"}
          onClick={async () => {
            await api.post(`/projects/toggleTodo/${projectId}`, {
              index: i,
            });
            redraw(true);
          }}
        />
        <h3 className="taskTitle">{task.task}</h3>
      </div>
    );
  }

  const list_items =
    todo.length === 0 ? (
      <p className="emptyText">To-Do List is empty</p>
    ) : (
      todo.map((task, i) => <Card key={task._id} task={task} i={i} />)
    );

  return (
    <div className="todo card">
      <form
        className="input"
        action={async (formdata) => {
          const response = await api.post(
            `/projects/newTodo/${projectId}`,
            formdata,
          );
          console.log(response);
          redraw(true);
        }}
      >
        <input type="submit" className="addTodo" value="" />
        <input
          type="text"
          className="taskinput"
          placeholder="New Task"
          name="task"
        />
      </form>
      <div className="list">{list_items}</div>
    </div>
  );
}

function Members({ projectId, members }) {
  const [allUsers, setAllUsers] = useState([]);
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [localMembers, setLocalMembers] = useState(members);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.post(`/users/list/${projectId}`);
      console.log(res.data.users);
      setAllUsers(res.data.users);
    };
    fetchUsers();
  }, [projectId]);

  useEffect(() => {
    if (!input.trim()) {
      setFiltered([]);
      return;
    }

    const f = allUsers.filter(
      (u) =>
        u.username.toLowerCase().includes(input.toLowerCase()) &&
        !localMembers.includes(u._id),
    );
    setFiltered(f.slice(0, 5)); // max 5 suggestions
  }, [input, allUsers, localMembers]);

  async function addMember(userid) {
    await api.post(`/projects/addUser/${projectId}`, { userid });
    setLocalMembers((prev) => [...prev, userid]);
    setInput("");
  }

  return (
    <div className="members card">
      <h2 className="membersTitle">Members</h2>

      {/* Search and add user */}
      <div className="memberAddBox">
        <input
          type="text"
          className="memberInput"
          placeholder="Add user by name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Autocomplete dropdown */}
        {filtered.length > 0 && (
          <div className="suggestions">
            {filtered.map((u) => (
              <div
                key={u._id}
                className="suggestionItem"
                onClick={() => addMember(u._id)}
              >
                {u.username}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Member list */}
      <div className="memberList">
        {localMembers.length === 0 ? (
          <p className="memptyText">No members yet</p>
        ) : (
          localMembers.map((m) => {
            const user = allUsers.find((u) => u._id === m);
            return (
              <div key={m} className="memberItem">
                <div className="memberAvatar">
                  {user?.username[0]?.toUpperCase() || "?"}
                </div>
                <p className="memberName">{user?.username || "(unknown)"}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function Chat({ chat, projectId, refresh }) {
  const [message, setMessage] = useState("");

  async function sendMessage() {
    if (!message.trim()) return;
    await api.post(`/projects/chat/${projectId}`, { message });
    setMessage("");
    refresh(true);
  }

  return (
    <div className="chat card">
      <div className="chatList">
        {chat.length === 0 ? (
          <p className="emptyText">Start the conversation...</p>
        ) : (
          chat.map((msg, i) => (
            <div key={i} className="chatMessage">
              <p className="sender">{msg.sender?.username || "User"}</p>
              <p className="message">{msg.message}</p>
            </div>
          ))
        )}
      </div>

      <form className="chatInput" action={sendMessage}>
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          className="taskinput"
        />
        <input type="submit" className="sendBtn" value="" />
      </form>
    </div>
  );
}

function Workspace() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [redraw, setRedraw] = useState(true);

  useEffect(() => {
    const fetchFunc = async () => {
      if (!redraw) {
        return;
      }
      const response = await api.post("/projects/query/" + projectId, {});
      setProject(response.data.result.project);
      setRedraw(false);
    };
    fetchFunc();
    // const refreshChat = setInterval(() => setRedraw(true), 1000 * 1);
    // return () => clearInterval(refreshChat);
  }, [projectId, redraw]);

  if (!projectId) {
    return <h2>{"We could not find what you were looking for..."}</h2>;
  }

  if (!project) {
    return <h2>{"Loading..."}</h2>;
  }
  return (
    <div className="workspace">
      <Heading metadata={project.metadata} />
      <Todo
        todo={project.content.todo}
        projectId={projectId}
        redraw={setRedraw}
      />
      <Chat
        chat={project.content.chat}
        projectId={projectId}
        refresh={setRedraw}
      />
      <Members members={project.permissions.view} projectId={projectId} />
    </div>
  );
}

export default Workspace;
