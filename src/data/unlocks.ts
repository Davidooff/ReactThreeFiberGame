import plantsData, { Plant } from "./plants";

export interface UnlockEl {
  title: string;
  description: string;
  cost: number;
  isUnlocked: boolean;
}

export interface PlantUnlockEl extends UnlockEl {
  unlockPlant: Plant;
}

export interface FieldExtendEl extends UnlockEl {
  extend: [number, number]; // Adding [x+extend[0]][y+extend[1]]
}

export type UnlockType = PlantUnlockEl | FieldExtendEl;

export interface UnlocksTree {
  unlock: UnlockType;
  nextUnlocks?: Array<UnlocksTree | UnlockType>;
}

const unlocksData: UnlocksTree = {
  unlock: {
    title: "BIG START",
    description: "That's the place where everything is starts",
    cost: 10,
    isUnlocked: false,
    unlockPlant: plantsData[0],
  },
  nextUnlocks: [
    {
      title: "SOMTHING FAMILIAR",
      description: "Let's continue",
      cost: 20,
      isUnlocked: false,
      unlockPlant: plantsData[1],
    },
  ],
};

export default unlocksData;
