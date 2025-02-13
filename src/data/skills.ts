import wheat from "../assets/skills/wheat.png";
import Game from "../classes/game";
import { Field } from "../classes/game/field";
import plantsData from "./plants";

export const myTree: SkillTree<MySkillData> = {
  skill: {
    cost: 100,
    title: "Wheat",
    isUnlocked: false,
    img: wheat,
    description: "By unlocking this skill you will be able to plant wheat",
    unlock: (game: Game) => {
      game.unlockedPlants.push(plantsData.find((plant) => plant.title === "Wheat")!);
      console.log(game);
    }
  },
  nextSkills: [
    {
      skill: {
        cost: 100,
        title: "Extend field",
        isUnlocked: false,
        img: wheat,
        description: "By unlocking this skill you will be able to extend your field",
        unlock: (game: Game) => {
          game.field = new Field([game.field.fieldSize[0] + 1, game.field.fieldSize[0] + 1]);
        }
      },
      nextSkills: [
        {
          skill: {
            cost: 100,
            title: "Make water cheaper",
            isUnlocked: false,
            img: wheat,
            description: "By unlocking this skill you will be able to water your plants for less money (-2 per water)",
            unlock: (game: Game) => {
              game.waterCost -= 2;
            }
          },
          nextSkills: [
            {
              skill: {
                cost: 100,
                title: "Extend field lvl2",
                isUnlocked: false,
                img: wheat,
                description: "Some text to make it look alive",
                unlock: (game: Game) => {
                  game.field = new Field([game.field.fieldSize[0] + 1, game.field.fieldSize[0] + 1]);
                }
              },
              nextSkills: [
                {
                  cost: 100,
                  title: "SuperPuperChildSkill1",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                  unlock: (game: Game) => {
                    
                  }
                },
                {
                  cost: 100,
                  title: "SuperPuperChildSkill2",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                  unlock: (game: Game) => {
      
                  }
                },
                {
                  cost: 100,
                  title: "SuperPuperChildSkill3",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                  unlock: (game: Game) => {
      
                  }
                },
                {
                  cost: 100,
                  title: "SuperPuperChildSkill4",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                  unlock: (game: Game) => {
      
                  }
                },
              ],
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill2",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
              unlock: (game: Game) => {
      
              }
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill3",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
              unlock: (game: Game) => {
      
              }
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill4",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
              unlock: (game: Game) => {
      
              }
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
            unlock: (game: Game) => {
      
            }
          },
          nextSkills: [
            {
              cost: 100,
              title: "SuperGrandChildSkill1",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
              unlock: (game: Game) => {
      
              }
            },
            {
              cost: 100,
              title: "SuperGrandChildSkill2",
              isUnlocked: false,
              img: wheat,
              description: "Some text to make it look alive",
              unlock: (game: Game) => {
      
              }
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
        unlock: (game: Game) => {
      
        }
      },
      nextSkills: [
        {
          skill: {
            cost: 100,
            title: "ChildSkill2",
            isUnlocked: false,
            img: wheat,
            description: "Some text to make it look alive",
            unlock: (game: Game) => {
      
            }
          },
          nextSkills: [
            {
              skill: {
                cost: 100,
                title: "ChildSkill2",
                isUnlocked: false,
                img: wheat,
                description: "Some text to make it look alive",
                unlock: (game: Game) => {
      
                }
              },
              nextSkills: [
                {
                  cost: 100,
                  title: "SuperGrandChildSkill1",
                  isUnlocked: false,
                  img: wheat,
                  description: "Some text to make it look alive",
                  unlock: (game: Game) => {
      
                  }
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
  unlock: (game: Game) => void;
}

export interface SkillTree<SkillData extends UnlockData> {
  skill: SkillData;
  nextSkills: Array<SkillTree<SkillData> | SkillData>;
}
