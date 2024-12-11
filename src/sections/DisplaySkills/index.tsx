import { MySkillData, SkillTree } from "../../data/skills";

interface Props {
  tree: SkillTree<MySkillData> | MySkillData;
  deeps: number;
}

function isSkillTree(
  node: SkillTree<MySkillData> | MySkillData
): node is SkillTree<MySkillData> {
  return (node as SkillTree<MySkillData>).skill !== undefined;
}

function DisplaySkills(props: Props) {
  console.log(props);

  return (
    <>
      {isSkillTree(props.tree) ? (
        <div className="skill-group">
          <CreateSkillEl
            skill={props.tree.skill}
            deeps={props.deeps}
            xPosition={0}
          />
          <div className="skill-next">
            {props.tree.nextSkills.map((el, index) => {
              if (isSkillTree(el)) {
                return (
                  <div className="skill-group">
                    <CreateSkillEl
                      skill={el.skill}
                      deeps={props.deeps}
                      xPosition={index}
                    />
                    <div className="skill-next">
                      {el.nextSkills.map((el) => (
                        <DisplaySkills tree={el} deeps={props.deeps + 1} />
                      ))}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="skill-next">
                    <CreateSkillEl
                      skill={el}
                      deeps={props.deeps}
                      xPosition={index}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <CreateSkillEl skill={props.tree} deeps={props.deeps} xPosition={0} />
      )}
      {/* {() => {
        if (isSkillTree(props.tree)) {
          
        }
      }} */}
    </>
  );
}

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

export default DisplaySkills;
