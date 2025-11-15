import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "./api/axios";
import "./Projects.css";

function Options({ tabs }) {
  const [selectedTab, selectTab] = useState(tabs[0]);
  function OptionElement(tab) {
    if (tab.title == selectedTab.title) {
      return (
        <h3 onClick={() => selectTab(tab)} className="selectedTabTitle">
          {tab.title}
        </h3>
      );
    }
    return (
      <h3 onClick={() => selectTab(tab)} className="tabTitle">
        {tab.title}
      </h3>
    );
  }
  return (
    <div className="tabbox">
      <div className="tabs">{tabs.map(OptionElement)}</div>
      <div className="tabcontent">{selectedTab.component}</div>
    </div>
  );
}

function Greeter({ user, projects, setUser }) {
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
              onClick={async () =>
                await api.post("/auth/logout").then(() => setUser(null))
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

function Settings({ project }) {
  const dummy = () => console.log("dummy");
  const selectProject = (
    <p className="infoDesc">Please select a project to view details.</p>
  );
  const defaultTabs = [
    {
      title: "Overview",
      component:
        !project || project.length == 0 ? (
          selectProject
        ) : (
          <div className="info">
            <div className="infoHeader">
              <h1 className="infoTitle">{project.title}</h1>
              <p className="infoDesc">{project.desc}</p>
            </div>
            <div className="projectOptions">
              <span>Todo</span>
              <span>
                {project.todo.pending.length} pending,{" "}
                {project.todo.completed.length} completed,{" "}
                {project.todo.ignored.length} ignored
              </span>
              <span>Chat</span>
              <span>{project.chat.length} messages</span>
              <span>Posts</span>
              <span>{project.posts.length} posts</span>
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
          <form className="newprojectOptions" action={dummy}>
            <input
              type="text"
              id="new_title"
              name="new_title"
              className="pinputBox"
              placeholder="Title"
            />
            <input
              type="text"
              id="new_desc"
              name="new_desc"
              className="pinputBox"
              placeholder="Description"
            />
            <input
              type="submit"
              id="create"
              className="pformButton"
              value="Create"
            />
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
      <Options tabs={defaultTabs} />
    </div>
  );
}

function SearchBar() {
  const dummy = () => console.log("dummy");
  return (
    <div className="search">
      <form className="searchbox" action={dummy}>
        <input
          type="text"
          id="title"
          name="title"
          className="pinputBox"
          placeholder="Title"
        />
        <input
          type="submit"
          id="search_value"
          className="pformButton"
          value="search"
        />
      </form>
    </div>
  );
}

function ProjectElement({ title, _id, desc }) {
  console.log("inside single renderer");
  return (
    <div className="projectElement">
      <h4 className="projectTitle">{title}</h4>
      <p className="projectDesc">{desc}</p>
      <p className="projectId">{_id}</p>
    </div>
  );
}

function ProjectList({ projects }) {
  console.log(projects);
  return (
    <div className="projectlist">{projects.map(ProjectElement, projects)}</div>
  );
}

function Projects() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let result;
      try {
        result = await api.post("users/current");
        setUser(result.data.user);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
      result = await api.post("projects/list");
      setProjects(result.data.projects);
    };
    fetchData();
  }, [navigate, user]);

  // Make this better later
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="infocard">
        <Greeter user={user} projects={projects} setUser={setUser} />
        <Settings />
        <SearchBar />
        <ProjectList projects={projects} />
      </div>
    </>
  );
}

export default Projects;
