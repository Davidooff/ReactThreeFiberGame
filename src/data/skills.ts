import wheat from "../assets/skills/wheat.png";

export const myTree: SkillTree<MySkillData> = {
  skill: {
    name: "RootSkill",
    isUnlocked: false,
    img: wheat,
    description: "Some text to make it look alive",
  },
  nextSkills: [
    {
      skill: {
        name: "ChildSkill1",
        isUnlocked: false,
        img: wheat,
        description: "Some text to make it look alive",
      },
      nextSkills: [
        {
          skill: {
            name: "GrandChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
          },
          nextSkills: [
            {
              skill: {
                name: "SuperGrandChildSkill1",
                isUnlocked: false,
                img: wheat,
                description: "Some text to make it look alive",
              },
              nextSkills: [
                {
                  name: "SuperPuperChildSkill1",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
                {
                  name: "SuperPuperChildSkill2",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
                {
                  name: "SuperPuperChildSkill3",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
                {
                  name: "SuperPuperChildSkill4",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
              ],
            },
            {
              name: "SuperGrandChildSkill2",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
            {
              name: "SuperGrandChildSkill3",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
            {
              name: "SuperGrandChildSkill4",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
          ],
        },
        {
          skill: {
            name: "GrandChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
          },
          nextSkills: [
            {
              name: "SuperGrandChildSkill1",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
            {
              name: "SuperGrandChildSkill2",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
          ],
        },
      ],
    },
    {
      skill: {
        name: "ChildSkill2",
        isUnlocked: false,
        img: wheat,
        description: "Some text to make it look alive",
      },
      nextSkills: [
        {
          skill: {
            name: "ChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
          },
          nextSkills: [
            {
              skill: {
                name: "ChildSkill2",
                isUnlocked: false,
                img: wheat,
                description: "Some text to make it look alive",
              },
              nextSkills: [
                {
                  name: "SuperGrandChildSkill1",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export interface MySkillData extends UnlockData {
  name: string;
  img: string;
  description: string;
}

export interface UnlockData {
  [key: string]: any;
  isUnlocked: boolean;
}

export interface SkillTree<SkillData extends UnlockData> {
  skill: SkillData;
  nextSkills: Array<SkillTree<SkillData> | SkillData>;
}
