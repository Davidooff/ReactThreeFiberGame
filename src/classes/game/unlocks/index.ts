import unlocksData, { UnlocksTree, UnlockType } from "../../../data/unlocks";

interface PossibleUnlock {
  unlock: UnlockType;
  path: number[];
}

class Unlocks {
  unlocksTree: UnlocksTree;

  constructor(unlocksTree?: UnlocksTree) {
    this.unlocksTree = unlocksTree || unlocksData;
  }

  /** Mutatuing element */
  _setUnlockByPath(obj: UnlocksTree, path: number[], value: boolean = true) {
    let current: UnlocksTree | UnlockType = obj;
    for (let i = 0; i < path.length - 1; i++) {
      if (
        "nextUnlocks" in current &&
        current.nextUnlocks &&
        current.nextUnlocks.length > path[i]
      ) {
        current = current.nextUnlocks[path[i]];
      } else {
        throw Error("Path is invalid");
      }
    }
    if (
      "nextUnlocks" in current &&
      current.nextUnlocks &&
      current.nextUnlocks.length > path[path.length - 1]
    ) {
      let el = current.nextUnlocks[path[path.length - 1]];
      if ("unlock" in el) {
        el.unlock.isUnlocked = value;
      } else {
        el.isUnlocked = value;
      }

      current.nextUnlocks[path[path.length - 1]] = el;
    } else {
      throw Error("Path is invalid, last element is undefined");
    }
  }

  getPossibleToUnlock(): PossibleUnlock[] {
    let result: PossibleUnlock[] = [];
    let path: number[] = [0];
    while (true) {
      let current: UnlockType | UnlocksTree | undefined = this.unlocksTree;
      for (let i = 0; i < path.length; i++) {
        if ("nextUnlocks" in current && current.nextUnlocks) {
          current = current.nextUnlocks[i];
        }
      }

      if (current === undefined) {
        path.pop();
        path[path.length - 1]++;
      } else if ("nextUnlocks" in current) {
        if (current.unlock.isUnlocked) {
          path.push(0);
        } else {
          result.push({ unlock: current.unlock, path });
          path[path.length - 1]++;
        }
      } else if ("isUnlocked" in current) {
        if (!current.isUnlocked) {
          result.push({ unlock: current, path });
          path[path.length - 1]++;
        }
      }
    }
  }
}

export default Unlocks;
