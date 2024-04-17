interface IProjectDe {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  language: string[];
  technical: string[];
  managerId: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  employeeId: [
    {
      id: string;
      name: string;
      email: string;
      image: string;
      roles: string[];
    },
  ];
}

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

export type IProjectDetail = IProjectDe;

export interface IProject {
  data: {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: string;
    progress: number;
    projectMembers: ProjectMembers[];
  }[];
  meta: {
    page: string;
    take: string;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface ProjectMembers {
  id: string;
  user: {
    isManager: boolean;
    manager: string;
    managerId: string;
    profile: {
      avatarUrl: string;
      dayOfBirth: string;
      email: string;
      fullName: string;
      gender: string;
      phoneNumber: number;
      status: string;
    };
  };
}

export interface ColumnIProject {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  progress: number;
  projectMembers: ProjectMembers[];
}

export type GetListProject = {
  name: string;
  take: number;
  page: number;
};

export interface UpdateStatus {
  id: string;
  status: string;
}
