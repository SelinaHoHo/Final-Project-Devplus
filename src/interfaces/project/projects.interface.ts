interface IProjectDe {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  language: string[];
  technical: string[];
  user: {
    id: string;
    email: string;
    profile: {
      fullName: string;
      avatarUrl: string;
    };
  };
  projectMembers: ProjectMembers[];
  languageProject: languageProject[];
  technicalProject: technicalProject[];
  projectHistory: projectHistory[];
}

export interface languageProject {
  id: string;
  level: string;
  experience: string;
  language: {
    name: string;
  };
}

export interface technicalProject {
  id: string;
  level: string;
  experience: string;
  technical: {
    name: string;
  };
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
    isDelete: boolean;
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
    id: string;
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
  roles: [
    {
      id: string;
      position: {
        name: string;
      };
    },
  ];
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

export interface IDeleteProject {
  id: string;
}

export interface IAssignEmployee {
  employeeId: string;
  projectId: string;
  roles: string[];
}

export interface IUnassignEmployee {
  id: string;
}

export interface IUpdateProject {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  language: string[];
  technical: string[];
  managerId?: string;
}
export interface projectHistory {
  id: string;
  createDate: Date;
  updateDate: Date;
  description: string;
  type: string;
  name: string;
}
export interface IOnlyProject {
  totalProjet: number;
  projectInYear: {
    number: number;
  };
  projectStatus: {
    pending: number;
    progress: number;
    complete: number;
  };
}
