import { useEffect, useRef } from "react";
import { MySkillData, SkillTree } from "../../data/skills";
import "./displaySkills.css";
import DisplayTree from "./DisplayTree";
import createLineByDOM from "../../utils/createLineByDOM";

interface Props {
  tree: SkillTree<MySkillData> | MySkillData;
}

// Refined isElement function acting as a type guard
const isElement = (node: ChildNode | null): node is Element =>
  node !== null && node.nodeType === 1;

function DisplaySkills(props: Props) {
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (treeRef.current) {
      const elements = document.getElementsByClassName("skill-group");
      for (let i = 0; i < elements.length; i++) {
        console.log(elements.length);

        const skillGroupEl = elements.item(i);
        if (skillGroupEl) {
          const firstElement = isElement(skillGroupEl.firstChild)
            ? skillGroupEl.firstChild
            : null;
          const seccondElement = skillGroupEl.childNodes[1].childNodes;
          if (!firstElement || !seccondElement) {
            console.error("First or last child not found!");
            continue; // Use 'continue' to process remaining elements instead of 'return'
          }

          // Obtain bounding boxes
          const firstRect = firstElement.getBoundingClientRect();
          seccondElement.forEach((el) => {
            if (isElement(el)) {
              const seccondRect = el.getBoundingClientRect();

              const lineDiv = createLineByDOM(
                firstRect.right,
                (firstRect.top + firstRect.bottom) / 2,
                seccondRect.left,
                (seccondRect.top + seccondRect.bottom) / 2
              );

              skillGroupEl.append(lineDiv);
            }
          });
        }
      }
    }
  }, []); // Removed 'treeRef' from dependencies as refs do not trigger re-renders

  return (
    <div ref={treeRef}>
      <DisplayTree tree={props.tree} deeps={0} />
    </div>
  );
}

export default DisplaySkills;
