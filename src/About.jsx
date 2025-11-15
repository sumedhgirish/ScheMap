import sushanth from "./assets/avatars/sushanth.png";
import sumedh from "./assets/avatars/sumedh.png";
import shreekrishna from "./assets/avatars/shreekrishna.png";
import "./About.css";

function About() {
  const team = [
    { name: "Shree Krishna", id: "PES1UG24CS440", img: shreekrishna },
    { name: "Sumedh Girish", id: "PES1UG24CS480", img: sumedh },
    { name: "Sushanth S Rao", id: "PES1UG24CS485", img: sushanth },
  ];

  return (
    <div className="aboutPage">
      <div className="teamSection">
        <h1 className="teamTitle">Meet the Team</h1>
        <p className="teamSubtitle">
          Three developers united by a shared vision — building a seamless
          platform for collaboration.
        </p>

        <div className="teamGrid">
          {team.map((member) => (
            <div className="teamCard" key={member.id}>
              <div className="avatarWrapper">
                <img
                  src={member.img}
                  alt={member.name}
                  className="teamAvatar"
                />
              </div>
              <h3>{member.name}</h3>
              <p className="teamId">{member.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
