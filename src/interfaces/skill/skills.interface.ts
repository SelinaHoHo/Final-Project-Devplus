interface ISkill {
  id: string;
  name: string;
}

export interface ISkillCreate {
  name: string;
}

export type ISkills = ISkill[];
export default ISkill;
