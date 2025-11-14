import sushanth from "./assets/avatars/sushanth.png";
import sumedh from "./assets/avatars/sumedh.png";
import shreekrishna from "./assets/avatars/shreekrishna.png";
import "./About.css";

function About() {
  return (
    <div className="aboutPage">
      <div className="siteDesc">
        <h2>About Our Site</h2>
        <p>
          Our web application is a collaborative platform designed to help teams
          efficiently manage projects, share ideas, and exchange information in
          one unified space. The website consists of eight interactive pages
          that facilitate smooth communication, document sharing, and real-time
          collaboration among group members. It aims to bridge the gap between
          brainstorming, coordination, and execution by providing an intuitive
          and user-friendly interface.
        </p>
      </div>

      <div className="aboutUs">
        <div className="profileCard">
          <img src={sumedh} alt="Sumedh's Avatar" className="avatar" />
          <p>Sumedh Girish</p>
          <p>PES1UG24CS480</p>
        </div>

        <div className="profileCard">
          <img
            src={shreekrishna}
            alt="Shree Krishna's Avatar"
            className="avatar"
          />
          <p>Shree Krishna</p>
          <p>PES1UG24CS440</p>
        </div>

        <div className="profileCard">
          <img src={sushanth} alt="Damascus' Avatar" className="avatar" />
          <p>Sushanth S Rao</p>
          <p>PES1UG24CS485</p>
        </div>
      </div>
    </div>
  );
}

export default About;

