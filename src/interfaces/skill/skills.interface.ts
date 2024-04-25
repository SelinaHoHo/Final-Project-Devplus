interface ISkill {
  id: string;
  name: string;
}

export interface ISkillCreate {
  name: string;
}
export type GetListSkills = {
  name: string;
  take: number;
  page: number;
};

export type ISkills = ISkill[];
export type ISkillPagination = {
  data: ISkill[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};
export default ISkill;
