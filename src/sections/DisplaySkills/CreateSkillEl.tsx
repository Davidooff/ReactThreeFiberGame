import { MySkillData } from "../../data/skills";

interface CreateSkillElProps {
  skill: MySkillData;
}

function CreateSkillEl(props: CreateSkillElProps) {
  const { skill } = props;
  return (
    <div
      className={
        "skill-el " + "skill-el-" + (skill.isUnlocked ? "unlocked" : "locked")
      }
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
