import { Navigate, useNavigate } from "react-router";
import { useEffect, useReducer, useState } from "react";
import api from "./api/axios";
import "./Projects.css";

const initialState = {
  user: null,
  projects: [],
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "set_user":
      return { ...state, user: action.payload };

    case "set_projects":
      return { ...state, projects: action.payload };

    case "set_index":
      return { ...state, index: action.payload };

    case "add_project":
      return { ...state, projects: [action.payload, ...state.projects] };

    case "set_state":
      return action.payload;

    default:
      return state;
  }
}

function Options({ tabs }) {
  const [selectedTab, selectTab] = useState(tabs[0]);

  useEffect(() => {
    selectTab(tabs[0]);
  }, [tabs]);

  return (
    <div className="tabbox">
      <div className="tabs">
        {tabs.map((tab) => (
          <h3
            key={tab.title}
            onClick={() => selectTab(tab)}
            className={
              tab.title === selectedTab.title ? "selectedTabTitle" : "tabTitle"
            }
          >
            {tab.title}
          </h3>
        ))}
      </div>

      <div className="tabcontent">{selectedTab.component}</div>
    </div>
  );
}

function Greeter({ user, projects, dispatch, navigate }) {
  const tabs = [
    {
      title: "Details",
      component: (
        <p className="info">
          You have <span className="numProj">{projects.length}</span> active
          projects.
        </p>
      ),
    },
    {
      title: "Settings",
      component: (
        <div className="info">
          <div className="options">
            <span>Full Name</span>
            <span>{user.fullname}</span>

            <span>Username</span>
            <code>{user.username}</code>

            <span>Account ID</span>
            <code>{user._id}</code>
          </div>

          <div className="accButtons">
            <input
              type="button"
              id="logout"
              className="logoutButton"
              value="Logout"
              onClick={() =>
                api
                  .post("/auth/logout")
                  .then(() => dispatch({ type: "set_user", payload: null }))
                  .then(() => navigate("/login"))
              }
            />
            <input
              type="button"
              id="deleteacc"
              className="delButton"
              value="Delete Account"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="greeter">
      <h2 className="welcome">
        Welcome, <span className="username">{user.name.first}</span>
      </h2>
      <Options tabs={tabs} />
    </div>
  );
}

function Settings({ project, dispatch }) {
  console.log(!project);
  const selectProject = (
    <p className="infoDesc">Please select a project to view details.</p>
  );
  const optionTabs = [
    {
      title: "Overview",
      component: !project ? (
        selectProject
      ) : (
        <div className="info">
          <div className="infoHeader">
            <h1 className="infoTitle">{project.metadata.title}</h1>
            <p className="infoDesc">{project.metadata.desc}</p>
          </div>

          <div className="projectOptions">
            <span>Todo</span>
            <span>
              {project.content.todo.pending.length} pending,{" "}
              {project.content.todo.completed.length} completed,{" "}
              {project.content.todo.ignored.length} ignored
            </span>

            <span>Chat</span>
            <span>{project.content.chat.length} messages</span>

            <span>Posts</span>
            <span>{project.content.posts.length} posts</span>

            <span>Status</span>
            <span>
              {project.permissions.view.length} members,{" "}
              {project.permissions.edit.length} admin
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Create",
      component: (
        <div className="info">
          <form
            className="newprojectOptions"
            action={async (e) => {
              const form = new FormData(e.target);
              form.append("members", []);
              form.append("admins", []);

              let res = await api.post("/projects/create", form);
              dispatch({ type: "add_project", payload: res.data.project });
            }}
          >
            <input
              type="text"
              name="title"
              className="pinputBox"
              placeholder="Title"
            />

            <input
              type="text"
              name="desc"
              className="pinputBox"
              placeholder="Description"
            />

            <input type="submit" className="pformButton" value="Create" />
          </form>
        </div>
      ),
    },
    {
      title: "Edit",
      component: <p className="info">Hello, World</p>,
    },
  ];

  return (
    <div className="settings">
      <Options tabs={optionTabs} />
    </div>
  );
}

function SearchBar() {
  const dummy = () => console.log("dummy");

  return (
    <div className="search">
      <form className="searchbox" onSubmit={dummy}>
        <input type="text" className="pinputBox" placeholder="Title" />
        <input type="submit" className="pformButton" value="search" />
      </form>
    </div>
  );
}

function ProjectElement({ _id, metadata }) {
  return (
    <div className="projectElement" key={_id}>
      <h4 className="projectTitle">{metadata.title}</h4>
      <p className="projectDesc">{metadata.desc}</p>
      <p className="projectId">{_id}</p>
    </div>
  );
}

function ProjectList({ projects, dispatch }) {
  return (
    <div className="projectlist">
      {projects.map((p, i) => (
        <div
          key={p._id}
          onClick={() => {
            console.log("triggered index change to", i);
            dispatch({ type: "set_index", payload: i });
          }}
        >
          <ProjectElement {...p} index={i} />
        </div>
      ))}
    </div>
  );
}

function Projects() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userRes = await api.post("users/current");
        let projRes = await api.post("projects/list");
        let payload = {
          user: userRes.data.user,
          projects: projRes.data.projects,
          index: 0,
        };
        dispatch({ type: "set_state", payload: payload });
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  if (!state.user) return <p>Loading...</p>;
  return (
    <div className="infocard">
      <Greeter
        user={state.user}
        projects={state.projects}
        dispatch={dispatch}
        navigate={navigate}
      />
      <Settings project={state.projects[state.index]} dispatch={dispatch} />
      <SearchBar />
      <ProjectList projects={state.projects} dispatch={dispatch} />
    </div>
  );
}

export default Projects;
