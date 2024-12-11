import { MySkillData, SkillTree } from "../data/skills";

export default function isSkillTree(
  node: SkillTree<MySkillData> | MySkillData
): node is SkillTree<MySkillData> {
  return (node as SkillTree<MySkillData>).skill !== undefined;
}
