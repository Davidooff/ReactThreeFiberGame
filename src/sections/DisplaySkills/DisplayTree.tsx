import { MySkillData, SkillTree } from "../../data/skills";
import isSkillTree from "../../utils/isSkillTree";
import CreateSkillEl from "./CreateSkillEl";
import "./displaySkills.css";

interface Props {
  tree: SkillTree<MySkillData> | MySkillData;
  deeps: number;
}

function DisplayTree(props: Props) {
  return (
    <>
      {isSkillTree(props.tree) ? (
        <div className="skill-group">
          <CreateSkillEl skill={props.tree.skill} />
          <div className="skill-next">
            {props.tree.nextSkills.map((el) => {
              if (isSkillTree(el)) {
                return (
                  <div className="skill-group">
                    <CreateSkillEl skill={el.skill} />
                    <div className="skill-next">
                      {el.nextSkills.map((el) => (
                        <DisplayTree tree={el} deeps={props.deeps + 1} />
                      ))}
                    </div>
                  </div>
                );
              } else {
                return <CreateSkillEl skill={el} />;
              }
            })}
          </div>
        </div>
      ) : (
        <CreateSkillEl skill={props.tree} />
      )}
    </>
  );
}

export default DisplayTree;
