// interface IProject {
//   name: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   language: string[];
//   technical: string[];
//   managerId: string;
//   employeeId: [
//     {
//       id: string;
//       roles: string[];
//     },
//   ];
// }

interface ICreateProjectReq {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  language: string[];
  technical: string[];
  managerId?: string;
  employeeId: [
    {
      id: string;
      roles: string[];
    },
  ];
}

interface IErrorResponse {
  message: string;
}

export type { ICreateProjectReq, IErrorResponse };

export type IProjects = IProject[];

export interface IProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  progress: number;
}

export type GetListProject = {
  name: string;
  take: number;
  page: number;
};
