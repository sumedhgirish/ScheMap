import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
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
      <p className="info">
        You have <span className="numProj">{user.project_ids.length}</span>{" "}
        active projects.
      </p>
    </div>
  );
}

function SearchBar() {
  async function CreateProject(formdata) {
    try {
      const data = formdata;
      const auth_token = localStorage.getItem("auth_token");
      data.append("auth_token", auth_token);
      console.log(JSON.stringify(Object.fromEntries(data)));
      const result = await fetch("/api/new_project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function JoinProject(formdata) {
    try {
      const data = formdata;
      const auth_token = localStorage.getItem("auth_token");
      data.append("auth_token", auth_token);
      console.log(JSON.stringify(Object.fromEntries(data)));
      const result = await fetch("/api/join_project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="search">
      <form className="pformBox" action={CreateProject}>
        <input
          type="text"
          id="title"
          name="title"
          className="pinputBox"
          placeholder="Title"
        />
        <input
          type="text"
          id="desc"
          name="desc"
          className="pinputBox"
          placeholder="Description"
        />
        <input
          type="submit"
          id="new_project"
          className="pformButton"
          value="Add Project"
        />
      </form>
      <p>or</p>
      <form className="pformBox" action={JoinProject}>
        <input
          type="text"
          id="title"
          name="project_id"
          className="pinputBox"
          placeholder="Project ID"
          required
        />
        <input
          type="submit"
          id="join_project"
          className="pformButton"
          value="Join"
          required
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
      <ProjectList projects={projects} />
    </>
  );
}

export default Projects;
