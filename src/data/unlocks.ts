import plantsData, { Plant } from "./plants";

export interface UnlockEl {
  title: string;
  description: string;
  cost: number;
  isUnlocked: boolean;
  unlock: Plant;
}

export interface UnlocksTree extends UnlockEl {
  nextUnlocks?: UnlocksTree[] | UnlockEl[];
}

const unlocksData: UnlocksTree = {
  title: "BIG START",
  description: "That's the place where everything is starts",
  cost: 10,
  isUnlocked: false,
  unlock: plantsData[0],
  nextUnlocks: [
    {
      title: "SOMTHING FAMILIAR",
      description: "Let's continue",
      cost: 20,
      isUnlocked: false,
      unlock: plantsData[1],
    },
  ],
};

export default unlocksData;
