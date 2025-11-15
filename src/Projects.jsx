import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import api from "./api/axios";
import "./Projects.css";

function Options({ tabs }) {
  const [selectedTab, selectTab] = useState(tabs[0]);
  function OptionElement(tab) {
    console.log(tab, selectedTab, tab.title == selectedTab.title);
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
    {
      title: "Settings",
      component: (
        <p className="info">
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
            />
            <input
              type="button"
              id="deleteacc"
              className="delButton"
              value="Delete Account"
            />
          </div>
        </p>
      ),
    },
  ];
  return (
    <div className="greeter">
      <h2 className="welcome">
        Welcome, <span className="username">{user.name.first}</span>
      </h2>
      <Options tabs={defaultTabs} />
    </div>
  );
}

function Settings({ project }) {
  if (!project) return <div className="settings"></div>;
  return <div className="settings"></div>;
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
