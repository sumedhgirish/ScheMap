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

function Posts({ posts }) {
  return <div className="posts card"></div>;
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
    const refreshChat = setInterval(() => setRedraw(true), 1000 * 1);
    return () => clearInterval(refreshChat);
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
      <Posts posts={project.content.posts} />
    </div>
  );
}

export default Workspace;
