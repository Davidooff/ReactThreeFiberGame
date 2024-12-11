export const myTree: SkillTree<MySkillData> = {
  skill: { name: "RootSkill", isUnlocked: false },
  nextSkills: [
    {
      skill: { name: "ChildSkill1", isUnlocked: false },
      nextSkills: [
        {
          skill: { name: "GrandChildSkill2", isUnlocked: false },
          nextSkills: [
            {
              skill: { name: "SuperGrandChildSkill1", isUnlocked: false },
              nextSkills: [
                { name: "SuperPuperChildSkill1", isUnlocked: false },
                { name: "SuperPuperChildSkill2", isUnlocked: false },
                { name: "SuperPuperChildSkill3", isUnlocked: false },
                { name: "SuperPuperChildSkill4", isUnlocked: false },
              ],
            },
            { name: "SuperGrandChildSkill2", isUnlocked: false },
            { name: "SuperGrandChildSkill3", isUnlocked: false },
            { name: "SuperGrandChildSkill4", isUnlocked: false },
          ],
        },
        {
          skill: { name: "GrandChildSkill2", isUnlocked: false },
          nextSkills: [
            { name: "SuperGrandChildSkill1", isUnlocked: false },
            { name: "SuperGrandChildSkill2", isUnlocked: false },
          ],
        },
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
