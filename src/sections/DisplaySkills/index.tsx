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

  const drawLines = () => {
    const cleanUp = document.getElementsByClassName("line");
    while (cleanUp.length > 0) {
      cleanUp.item(0)?.remove();
    }

    if (!treeRef.current) {
      throw new Error("Main tree block not found");
    }

    treeRef.current.scrollTop = 0;
    treeRef.current.scrollLeft = 0;

    const treeRefBoundings = treeRef.current.getBoundingClientRect();

    const elements = treeRef.current.getElementsByClassName("skill-group");
    for (let i = 0; i < elements.length; i++) {
      console.log(elements.length);

      const skillGroupEl = elements.item(i);
      if (skillGroupEl) {
        const firstElement = isElement(skillGroupEl.firstChild)
          ? skillGroupEl.firstChild
          : null;
        const seccondElement = skillGroupEl.childNodes[1].childNodes;
        if (!firstElement || !seccondElement || !treeRefBoundings) {
          console.error("First or last child not found!");
          continue; // Use 'continue' to process remaining elements instead of 'return'
        }

        // Obtain bounding boxes
        const firstRect = firstElement.getBoundingClientRect();
        seccondElement.forEach((el) => {
          if (isElement(el)) {
            const seccondRect = el.getBoundingClientRect();

            const lineDiv = createLineByDOM(
              firstRect.right + window.scrollX - treeRefBoundings.left,
              (firstRect.top + firstRect.bottom) / 2 +
                window.scrollY -
                treeRefBoundings.top,
              seccondRect.left + window.scrollX - treeRefBoundings.left,
              (seccondRect.top + seccondRect.bottom) / 2 +
                window.scrollY -
                treeRefBoundings.top
            );

            skillGroupEl.append(lineDiv);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (treeRef.current) {
      setTimeout(() => {
        drawLines();
      }, 10);
      // window.addEventListener("resize", handleResize);

      // return () => {
      //   window.removeEventListener("resize", handleResize);
      // };
    }
  }, []); // Removed 'treeRef' from dependencies as refs do not trigger re-renders

  return (
    <div className="skills-wrapper" ref={treeRef}>
      <div
        className="skills"
        // onScroll={handleResize}
        style={{ position: "relative" }}
      >
        <DisplayTree tree={props.tree} deeps={0} />
      </div>
    </div>
  );
}

export default DisplaySkills;
