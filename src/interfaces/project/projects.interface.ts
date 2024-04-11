interface IProject {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  technical: string[];
  userId: string;
}

interface ICreateProjectReq {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  technical: string[];
  userId?: string;
}

interface IErrorResponse {
  message: string;
}

export type { ICreateProjectReq, IErrorResponse };

export type IProjects = IProject[];
