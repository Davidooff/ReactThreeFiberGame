import unlocksData, { UnlockEl, UnlocksTree } from "../../../data/unlocks";

class Unlocks {
  unlocksTree: UnlocksTree;

  constructor(unlocksTree?: UnlocksTree) {
    this.unlocksTree = unlocksTree || unlocksData;
  }

  /** Mutatuing element */
  _setUnlockByPath(obj: UnlocksTree, path: number[], value: boolean = true) {
    let current = obj;
    for (let i = 0; i < path.length - 1; i++) {
      if (current.nextUnlocks) {
        current = current.nextUnlocks[path[i]];
      } else {
        throw Error("Path is invalid");
      }
    }
    console.log("Curent after for: " + current);
    console.log(
      "Setting current[" + path[path.length - 1] + "] to => " + value
    );
    if (current.nextUnlocks) {
      current.nextUnlocks[path[path.length - 1]].isUnlocked = value;
    } else {
      throw Error("Path is invalid, last element is undefined");
    }
    console.log(current);
  }

  _getUnlockElByPatch(path: number[]): UnlockEl | UnlocksTree | undefined {
    let current = this.unlocksTree;
    for (let i = 0; i < path.length - 1; i++) {
      if (current.nextUnlocks) {
        current = current.nextUnlocks[path[i]];
      } else {
        throw Error("Path is invalid");
      }
    }

    return current.nextUnlocks && current.nextUnlocks[path[path.length - 1]];
  }

  unlock(unlockElTitle: String) {
    let isUnlockComplite = false;
    if (this.unlocksTree.title === unlockElTitle) {
      this.unlocksTree.isUnlocked = true;
    } else {
      let path: number[] = [0];

      // breack when path is found
      while (true) {
        let unlockByPath = this._getUnlockElByPatch(path);
        if (!unlockByPath) {
          // if path invalid pop el and add + 1 to last element in path and repit until valid path
          // (Switching to nex roud)
          path.pop();
          for (let pathIndex = path.length - 1; pathIndex >= 0; pathIndex++) {
            path[path.length - 1]++;
            if (this._getUnlockElByPatch(path)) {
              break;
            } else {
              path.pop();
              path[path.length - 1]++;
            }
          }
        } else {
          if (unlockByPath.title === unlockElTitle) {
            // correct patch found braek while
            this._setUnlockByPath(this.unlocksTree, path, true);
            isUnlockComplite = true;
            break;
          } else {
            if ("nextUnlocks" in unlockByPath && unlockByPath.isUnlocked) {
              /** If there is more elements inside and path to check it */
              path.push(0);
            } else {
              /**
               * adding + 1 to last element for it will be chacked in the next cicle
               * if there is no element there in next cycle it will skip to next possible roud
               */
              path[path.length - 1]++;
            }
          }
        }
      }
    }

    if (!isUnlockComplite) {
      throw new Error(
        "Element whit this name not found or it's imposible to unlock"
      );
    }
  }

  _toUnlockEl(tree: UnlocksTree): UnlockEl {
    const { nextUnlocks, ...rest } = tree;
    return rest; // rest matches UnlockEl
  }

  getPossibleToUnlock(unlocksTreeEl?: UnlocksTree): UnlockEl[] {
    const current = unlocksTreeEl || this.unlocksTree;

    if (current.isUnlocked) {
      if (current.nextUnlocks) {
        // Use flatMap to avoid nested arrays.
        return current.nextUnlocks.flatMap((el) =>
          this.getPossibleToUnlock(el)
        );
      } else {
        // No next unlocks, return an empty array.
        return [];
      }
    } else {
      // Current element is not unlocked, return it as an UnlockEl.
      return [this._toUnlockEl(current)];
    }
  }
}

export default Unlocks;
