import "./Workspace.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "./api/axios";

function Heading() {}
function Todo() {}
function Posts() {}
function Chat() {}

function Workspace() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchFunc = async () => {
      const result = await api.post("/projects/query/" + projectId, {});
      setProject(result.data.project);
    };
    fetchFunc();
  }, [projectId]);

  return <div className="workspace"></div>;
}

export default Workspace;
