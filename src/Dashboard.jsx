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
        <NavLink to="/profile" className="redirect_link">
          Profile
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
          <p className="herodesc">Schedule. Map. Repeat.</p>
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
        <FeatureCard title="Test Title" content="Test Content" />
        <FeatureCard title="Test Title" content="Test Content" />
        <FeatureCard title="Test Title" content="Test Content" />
      </div>
    </>
  );
}

export default Dashboard;
