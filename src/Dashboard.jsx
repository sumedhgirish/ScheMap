import "./Dashboard.css";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <div className="dbnavbar">
      <span className="brand">
        <img src="src/assets/logo.png" className="logo" alt="Logo" />
        <p className="title">Home</p>
      </span>
      <span className="links">
        <NavLink to="/about" className="redirect_link">
          About
        </NavLink>
        <NavLink to="/projects" className="redirect_link">
          Projects
        </NavLink>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="heroImage">
        <div className="heroText">
          <h1 className="herocont">Sche-Map</h1>
          <p className="herodesc">Schedule. Map. Execute. Repeat.</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, content }) {
  return (
    <div className="featureCard">
      <h2 className="featuretitle">{title}</h2>
      <p className="featurecontent">{content}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <NavBar />
      <Hero />
      <div className="features">
        <FeatureCard title="Multi-User Collaboration" content="Multiple users can edit the same website stored in a shared database.Updates made by one user become visible to others after the page reloads. Reloading ensures everyone sees the latest, conflict-free version of the project." />
        <FeatureCard title="Shared Project Access" content="Teammates can join a project using a unique project link or project ID. Several users can open and work on the same project from different devices. Only authorized users can view or edit the project, ensuring secure collaboration." />
        <FeatureCard title="Project Stored in Database" content="The project’s data is saved in a central database, and every change is stored permanently. When the page reloads, the website is rebuilt from this data, ensuring all users see the latest version." />
      </div>
    </>
  );
}

export default Dashboard;
