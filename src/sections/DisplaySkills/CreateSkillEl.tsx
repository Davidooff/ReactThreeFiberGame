import { useState } from "react";
import Game from "../../classes/game";
import { MySkillData } from "../../data/skills";
import skillIssuePic from "./skillIssue.png"
import { usePopUpContext } from "../../context/popUpContext";

interface CreateSkillElProps {
  skill: MySkillData;
  gameRef: React.RefObject<Game>; // Changed from game: Game to gameRef
}

function CreateSkillEl(props: CreateSkillElProps) {
  const { skill } = props;
  const [, setForceUpdate] = useState({});
  const { setNewPopUp } = usePopUpContext();

  const unlockSkill = () => {
    try {
      if (!props.gameRef.current) {
        throw new Error("Game reference is not available");
      }
      props.gameRef.current.unlockSkill(props.skill.title);
      setForceUpdate({}); // Force re-render when skill is successfully unlocked
    } catch (error: any) {
      console.log(error.message);
      
      setNewPopUp({
        image: skillIssuePic,
        title: "Nah. U now, u can't do that?",
        description: error.message,
      });
    }
  };

  return (
    <div
      className={
        "skill-el " + "skill-el-" + (skill.isUnlocked ? "unlocked" : "locked")
      }
      onClick={unlockSkill}
    >
      <img src={skill.img} />
      <div>
        <h5>{skill.name}</h5>
        <p>{skill.description}</p>
      </div>
    </div>
  );
}

export default CreateSkillEl;
