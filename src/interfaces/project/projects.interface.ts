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
  project_name: string;
  start_date: string;
  target_completion_date: string;
  project_status: string[];
  progress: number;
}
