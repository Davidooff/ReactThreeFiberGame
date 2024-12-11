export default function createLineByDOM(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.left = x1 + "px";
  line.style.width = x2 - x1 + "px";
  line.style.zIndex = x1 + x2 + "";

  const toAppend = [
    document.createElement("div"),
    document.createElement("div"),
  ];

  toAppend.forEach((el) => line.appendChild(el));

  if (y1 > y2) {
    line.style.top = y2 + "px";
    line.style.height = y1 - y2 + "px";
    line.className = "line line-to-top";
  } else if (y1 < y2) {
    line.style.top = y1 + "px";
    line.style.height = y2 - y1 + "px";
    line.className = "line line-to-bottom";
  } else if (y1 === y2) {
    line.style.top = y1 + "px";
    line.style.height = "1px";
    line.className = "line line-straight";
  }

  return line;
}
