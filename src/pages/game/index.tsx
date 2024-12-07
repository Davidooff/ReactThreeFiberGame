import { useEffect, useMemo, useRef, useState } from "react";
import Game from "../../classes/game";
import { PlantedCell } from "../../classes/game/field/PlantedCell";
import { EmptyCell } from "../../classes/game/field/EmptyCell";
import DisplayPlayer from "../../sections/DisplayField/DisplayPlayer";
import DisplayCell from "../../sections/DisplayField/DisplayCell";
import DisplayField from "../../sections/DisplayField";

function GamePage() {
  const gameRef = useRef<Game>();
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
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
          gameRef.current.execute();
          setFieldData({ ...gameRef.current.field.field });
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

  return <div>{fieldSection}</div>;
}
export default GamePage;
