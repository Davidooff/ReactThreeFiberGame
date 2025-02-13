import "./codePanel.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useCallback } from "react";

interface Props {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
  isExecuting: boolean;
  setIsExecuting: React.Dispatch<React.SetStateAction<boolean>>;
}

function CodePanel(props: Props) {
  const changeCode = (val: string, id: number) => {
    props.code[id] = val;
    props.setCode([...props.code]);
  };

  const closeCode = (id: number) => {
    props.setCode([...props.code.slice(0, id), ...props.code.slice(id + 1)]);
  };

  const addCodePanel = useCallback(() => {
    props.setCode([...props.code, ""]);
  }, [props.code]);

  return (
    <div className="code-panel">
      <div className="code-panel_control">
        <button onClick={addCodePanel}>Add window</button>
        <button onClick={() => props.setIsExecuting(!props.isExecuting)}>
          {" "}
          {props.isExecuting ? "Stop" : "Start"}{" "}
        </button>
      </div>
      <div>
        {props.code.map((el, i) => {
          return (
            <div className="code-el-wrapper" key={i}>
              <CodeMirror
                className="code-el"
                id={"Panel" + i}
                value={el}
                extensions={[javascript()]}
                onChange={(change) => changeCode(change, i)}
                theme={vscodeDark}
              />
              <div className="close-el" onClick={() => closeCode(i)}>
                ❌
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CodePanel;
