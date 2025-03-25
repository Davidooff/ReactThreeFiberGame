import Game from "../../classes/game";
import { useEffect, useMemo, useRef, useState } from "react";
import DisplayField from "../../sections/DisplayField";
import CodePanel from "../../sections/DisplayField/CodePanel";
import "./game.css";
import DisplaySkills from "../../sections/DisplaySkills";
import { useParams } from "react-router";
import { ExpStateUpdate } from "../../classes/game/exp";
import ExpLvl from "./ExpLvl";
// import PopUp, { PopUpData } from "../../sections/PopUp";
import { usePopUpContext } from "../../context/popUpContext";
import Maze from "../../classes/maze";
import DisplayMaze from "../../sections/DisplayMaze";

function GamePage() {
  const { isNewGame } = useParams();
  const gameRef = useRef<Game>();
  const mazeRef = useRef<Maze>();
  // const mazeRef = useRef<Maze>(new Maze([10, 10], 20)); //its for testing 
  const [isSkillDisplay, setIsSkillDisplay] = useState(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>([""]);
  const [fieldReRender, setFieldReRender] = useState<{}>({});
  const [expState, setExpState] = useState<ExpStateUpdate>({ exp: 0, lvl: 0, exp_this_lvl: 0 });
  const { setNewPopUp } = usePopUpContext();

  /** Once setting up game */
  useEffect(() => {
    const save = localStorage.getItem("save");
    console.log(isNewGame);

    if (save && isNewGame !== "new") {
      try {
        gameRef.current = new Game(setNewPopUp, setExpState, JSON.parse(save));
      } catch {
        gameRef.current = new Game(setNewPopUp, setExpState);
      }
    } else {
      gameRef.current = new Game(setNewPopUp, setExpState);
    }

    mazeRef.current = new Maze([10, 10], 20)

    const handleBeforeUnload = () => {
      // Serialize and save data
      localStorage.setItem("save", JSON.stringify(gameRef.current?.getSave()));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    setFieldReRender({});
    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  /** Rerendering field each time when skill tab are closed in case of field extending  */
  useEffect(() => {
    if (!isSkillDisplay)
      setFieldReRender({});
  }, [isSkillDisplay])

  /** Setting interval while isExecuting === true */
  useEffect(() => {
    let intervalId: number = 0;
    if (isExecuting) {
      if (mazeRef.current){
        intervalId = setInterval(() => {
          mazeRef.current?.execute(code.join("\n"));
          
          if (mazeRef.current?.isDone()) {
            console.log("Don Don")
            mazeRef.current = undefined;
            clearInterval(intervalId);
          }
          setFieldReRender({});
        }, 1000);
      }else {
        intervalId = setInterval(() => {
          if (gameRef.current) {
            gameRef.current.execute(code.join("\n"));
            gameRef.current.field.processTik();
            // Trigger a re-render by updating fieldReRender
            console.log("re-render", gameRef.current.field.field);
            setFieldReRender({});
          }
        }, 1000);
      }
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    return () => clearInterval(intervalId);
  }, [isExecuting]);

  const fieldSection = useMemo(
    () =>
      gameRef.current &&
      DisplayField({
        fieldData: gameRef.current.field.field,
        playerPosition: gameRef.current.field.playerPosition,
      }),
    [fieldReRender]
  );

  const mazeSection = useMemo(
    () =>
      mazeRef.current &&
      DisplayMaze({
        walls: mazeRef.current.walls,
        playerPosition: mazeRef.current.player,
      }),
    [fieldReRender]
  );

  const ExpLvlSection = useMemo(() => <ExpLvl expState={expState} updateExpState={setExpState} />, [expState]);
  // const PopUpMemo = useMemo(() => <PopUp newPopUpData={newPopUp} setNewPopUp={setNewPopUp} timeToWait={5000}/>, [newPopUp]);
  const CodePannelMemo = useMemo(() => <CodePanel code={code} setCode={setCode} isExecuting={isExecuting} setIsExecuting={setIsExecuting} />, [code, isExecuting]);

  return (
    <>
      {gameRef.current && !isSkillDisplay && (
        <div id="Game" style={{ position: "absolute", top: 0, left: 0 }}>
          {mazeRef.current && mazeSection}
          {!mazeRef.current && fieldSection}
          {CodePannelMemo}
        </div>
      )}
      {gameRef.current && isSkillDisplay && (
        <DisplaySkills tree={gameRef.current.unlocks.skillTree} gameRef={gameRef as React.MutableRefObject<Game>} />
      )}
      <button
        onClick={() => setIsSkillDisplay(!isSkillDisplay)}
        style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}
      >
        Skills
      </button>
      {ExpLvlSection}
      {/* {PopUpMemo} */}
    </>
  );
}

export default GamePage;
