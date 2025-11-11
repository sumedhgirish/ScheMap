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
  const default_user = {
    fullname: "Sumedh Girish",
  };
  const default_project = {
    title: "ScheMap",
    desc: "A schematic visualizer for project management.",
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
