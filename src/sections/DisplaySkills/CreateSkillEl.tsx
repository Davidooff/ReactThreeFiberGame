import { MySkillData } from "../../data/skills";

interface CreateSkillElProps {
  skill: MySkillData;
  deeps: number;
  xPosition: number;
}

function CreateSkillEl(props: CreateSkillElProps) {
  const { skill, deeps, xPosition } = props;
  return (
    <div
      className={
        "skill-el " + "skill-el-" + (skill.isUnlocked ? "unlocked" : "locked")
      }
      // style={{ top: xPosition * 20 + "px", left: deeps * 100 + "px" }}
    >
      <h5>{skill.name}</h5>
    </div>
  );
}

export default CreateSkillEl;
