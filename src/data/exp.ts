import wheat from "../assets/skills/wheat.png";

export interface ExpDataItem {
  image: string;
  name: string;
  description: string;
  exp: number;
}

export type ExpData = Array<ExpDataItem>

export var expDefaultData : ExpData = [
  {
    image: wheat,
    name: "ChildSkill1",
    description: "Some text to make it look alive",
    exp: 100
  },
  {
    image: wheat,
    name: "ChildSkill2",
    description: "Some text to make it look alive",
    exp: 200
  },
  {
    image: wheat,
    name: "ChildSkill3",
    description: "Some text to make it look alive",
    exp: 300
  }
]