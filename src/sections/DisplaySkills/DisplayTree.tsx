import Game from "../../classes/game";
import { MySkillData, SkillTree } from "../../data/skills";
import isSkillTree from "../../utils/isSkillTree";
import CreateSkillEl from "./CreateSkillEl";
import "./displaySkills.css";

interface Props {
  tree: SkillTree<MySkillData> | MySkillData;
  deeps: number;
  gameRef: React.RefObject<Game>; // Changed from game: Game to gameRef
}

function DisplayTree(props: Props) { // Displaying by recursion
  return (
    <>
      {isSkillTree(props.tree) ? (
        <div className="skill-group">
          <CreateSkillEl skill={props.tree.skill} gameRef={props.gameRef} />
          <div className="skill-next">
            {props.tree.nextSkills.map((el) => {
              if (isSkillTree(el)) {
                return (
                  <div className="skill-group">
                    <CreateSkillEl skill={el.skill} gameRef={props.gameRef}/>
                    <div className="skill-next">
                      {el.nextSkills.map((el) => (
                        <DisplayTree 
                          tree={el} 
                          deeps={props.deeps + 1} 
                          gameRef={props.gameRef} 
                        />
                      ))}
                    </div>
                  </div>
                );
              } else {
                return <CreateSkillEl skill={el} gameRef={props.gameRef} />;
              }
            })}
          </div>
        </div>
      ) : (
        <CreateSkillEl skill={props.tree} gameRef={props.gameRef} />
      )}
    </>
  );
}

export default DisplayTree;
