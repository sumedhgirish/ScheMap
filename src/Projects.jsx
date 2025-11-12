import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import "./Projects.css";

function Settings({ project }) {
  return (
    <div className="settings">
      <h2 className="project_title">{project.title}</h2>
      <p className="project_desc">{project.desc}</p>
    </div>
  );
}

function Greeter({ user }) {
  return (
    <div className="greeter">
      <h2 className="welcome">
        Welcome, <span className="username">{user.fullname}</span>
      </h2>
    </div>
  );
}

function SearchBar() {
  return <div className="search"></div>;
}

function ProjectList() {
  return <div className="projectlist"></div>;
}

function Projects() {
  const auth_token = localStorage.getItem("auth_token");
  if (!auth_token) return <Navigate to="/login" replace />;

  try {
    const { exp } = jwtDecode(auth_token);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("auth_token");
      return <Navigate to="/login" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  const default_user = {
    name: {
      first: "Sumedh",
      last: "Girish",
    },
    username: "crownedhog",
    projects: [],
    password: "password1",
  };
  const default_project = {
    title: "ScheMap",
    desc: "A schematic visualizer for project management.",
    todo: {
      completed: [],
      pending: [],
      ignored: [],
    },
    chat: [],
    posts: [],
  };

  return (
    <>
      <div className="infocard">
        <Greeter user={default_user} />
        <Settings project={default_project} />
      </div>
      <SearchBar />
      <ProjectList />
    </>
  );
}

export default Projects;
