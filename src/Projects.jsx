import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import "./Projects.css";
import { useEffect, useState } from "react";

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
      <p className="info">
        You have <span className="numProj">{user.project_ids.length}</span>{" "}
        active projects.
      </p>
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
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  const auth_token = localStorage.getItem("auth_token");
  useEffect(() => {
    if (!auth_token) return;
    const loadUser = async () => {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auth_token }),
      })
        .then(async (resp) => {
          const data = await resp.json();
          setUser(data.user);
          console.log(data);
          setProjects(data.projects);
        })
        .catch((err) => console.log(err));
    };
    loadUser();
  }, [auth_token]);

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

  if (!user) return <div>Loading...</div>;
  console.log(user, projects);

  return (
    <>
      <div className="infocard">
        <Greeter user={user} />
        <Settings project={projects} />
      </div>
      <SearchBar />
      <ProjectList />
    </>
  );
}

export default Projects;
