import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import api from "./api/axios";
import "./Projects.css";

function Options({ tabs }) {
  const [selectedTab, selectTab] = useState(tabs[0]);
  function OptionElement(tab) {
    return <h3>{tab.title}</h3>;
  }
  return (
    <div className="tabbox">
      <div className="tabs">{tabs.map(OptionElement)}</div>
      <div className="tabcontext">{selectedTab.component}</div>
    </div>
  );
}

function Greeter({ user, projects }) {
  const defaultTabs = [
    {
      title: "Details",
      component: (
        <p className="info">
          You have <span className="numProj">{projects.length}</span> active
          projects.
        </p>
      ),
    },
  ];
  return (
    <div className="greeter">
      <h2 className="welcome">
        Welcome, <span className="username">{user.fullname}</span>
      </h2>
      <Options tabs={defaultTabs} />
    </div>
  );
}

function Settings({ project }) {
  if (!project) return <div className="settings"></div>;
  return (
    <div className="settings">
      <h2 className="project_title">{project.title}</h2>
      <p className="project_desc">{project.desc}</p>
      <div className="stats">
        <p className="todo_desc">
          {project.todo.pending.length} of{" "}
          {project.todo.pending.length + project.todo.completed.length} Pending
          Tasks
        </p>
        <p classname="chat_desc">{project.chat.length} Messages</p>
        <p classname="posts">{project.posts.length} Posts</p>
      </div>
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
  useEffect(() => {
    const fetchData = async () => {
      let result = await api.post("projects/list");
      setProjects(result.data.projects);
      result = await api.post("users/current");
      setUser(result.data.user);
    };
    fetchData();
  }, []);

  // Make this better later
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="infocard">
        <Greeter user={user} projects={projects} />
        <Settings />
        <SearchBar />
        <ProjectList projects={projects} />
      </div>
    </>
  );
}

export default Projects;
