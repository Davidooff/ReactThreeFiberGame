export const myTree: SkillTree<MySkillData> = {
  skill: { name: "RootSkill", isUnlocked: false },
  nextSkills: [
    {
      skill: { name: "ChildSkill1", isUnlocked: false },
      nextSkills: [
        { name: "GrandChildSkill1", isUnlocked: false },
        { name: "GrandChildSkill2", isUnlocked: false },
      ],
    },
    { name: "ChildSkill2", isUnlocked: false },
  ],
};

export interface MySkillData extends UnlockData {
  name: string;
}

export interface UnlockData {
  [key: string]: any;
  isUnlocked: boolean;
}

export interface SkillTree<SkillData extends UnlockData> {
  skill: SkillData;
  nextSkills: Array<SkillTree<SkillData> | SkillData>;
}
