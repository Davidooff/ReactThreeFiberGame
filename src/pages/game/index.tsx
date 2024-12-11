import Game from "../../classes/game";
import { useEffect, useMemo, useRef, useState } from "react";
import { PlantedCell } from "../../classes/game/field/PlantedCell";
import { EmptyCell } from "../../classes/game/field/EmptyCell";
import DisplayField from "../../sections/DisplayField";
import CodePanel from "../../sections/DisplayField/CodePanel";
import "./game.css";
import DisplaySkills from "../../sections/DisplaySkills";

function GamePage() {
  const gameRef = useRef<Game>();
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>([""]);
  const [fieldData, setFieldData] = useState<Array<EmptyCell | PlantedCell>[]>(
    []
  );

  /** Once setting up game */
  useEffect(() => {
    gameRef.current = new Game();
    setFieldData(gameRef.current.field.field);
  }, []);

  /** Setting interval while isExecuting === true */
  useEffect(() => {
    let intervalId: number = 0;
    if (isExecuting) {
      intervalId = setInterval(() => {
        if (gameRef.current) {
          gameRef.current.execute(code.join("\n"));
          setFieldData([...gameRef.current.field.field]);
        }
      }, 1000);
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
        fieldData,
        playerPosition: gameRef.current.field.playerPosition,
      }),
    [fieldData]
  );

  return (
    <>
      {/* <div id="Game">
        {fieldSection}
        <CodePanel
          code={code}
          setCode={setCode}
          isExecuting={isExecuting}
          setIsExecuting={setIsExecuting}
        />
      </div> */}
      {gameRef.current && (
        <DisplaySkills tree={gameRef.current.unlocks.skillTree} />
      )}
    </>
  );
}
export default GamePage;
