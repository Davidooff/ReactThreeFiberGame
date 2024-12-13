import wheat from "../assets/skills/wheat.png";

export const myTree: SkillTree<MySkillData> = {
  skill: {
    cost: 100,
    title: "RootSkill",
    isUnlocked: false,
    img: wheat,
    description: "Some text to make it look alive",
  },
  nextSkills: [
    {
      skill: {
        cost: 100,
        title: "ChildSkill1",
        isUnlocked: false,
        img: wheat,
        description: "Some text to make it look alive",
      },
      nextSkills: [
        {
          skill: {
            cost: 100,
            title: "GrandChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
          },
          nextSkills: [
            {
              skill: {
                cost: 100,
                title: "SuperGrandChildSkill1",
                isUnlocked: false,
                img: wheat,
                description: "Some text to make it look alive",
              },
              nextSkills: [
                {
                  cost: 100,
                  title: "SuperPuperChildSkill1",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
                {
                  cost: 100,
                  title: "SuperPuperChildSkill2",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
                {
                  cost: 100,
                  title: "SuperPuperChildSkill3",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
                {
                  cost: 100,
                  title: "SuperPuperChildSkill4",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                },
              ],
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill2",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill3",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill4",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
          ],
        },
        {
          skill: {
            cost: 100,
            title: "GrandChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
          },
          nextSkills: [
            {
              cost: 100,
              title: "SuperGrandChildSkill1",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill2",
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
        cost: 100,
        title: "ChildSkill2",
        isUnlocked: false,
        img: wheat,
        description: "Some text to make it look alive",
      },
      nextSkills: [
        {
          skill: {
            cost: 100,
            title: "ChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
          },
          nextSkills: [
            {
              skill: {
                cost: 100,
                title: "ChildSkill2",
                isUnlocked: false,
                img: wheat,
                description: "Some text to make it look alive",
              },
              nextSkills: [
                {
                  cost: 100,
                  title: "SuperGrandChildSkill1",
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
  cost: number;
  title: string;
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
