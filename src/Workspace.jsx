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

function Todo({ todo }) {
  // has 3 arrays completed, pending, ignored. list all elements in pending above all elements in completed
  // dont display ignored
  // each item is simply { task: string, user: userobject with fullname property }
  return <div className="todo card"></div>;
}
function Posts({ posts }) {
  return <div className="posts card"></div>;
}
function Chat({ chat }) {
  return <div className="chat card"></div>;
}

function Workspace() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => {
    const fetchFunc = async () => {
      const response = await api.post("/projects/query/" + projectId, {});
      setProject(response.data.result.project);
    };
    fetchFunc();
  }, [projectId]);

  if (!projectId) {
    return <h2>{"We could not find what you were looking for..."}</h2>;
  }

  if (!project) {
    return <h2>{"Loading..."}</h2>;
  }
  return (
    <div className="workspace">
      <Heading metadata={project.metadata} />
      <Todo todo={project.content.todo} />
      <Chat chat={project.content.chat} />
      <Posts posts={project.content.posts} />
    </div>
  );
}

export default Workspace;
