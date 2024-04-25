export interface IUser {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  languageMember: string;
  // userName: string;
  isManager: boolean;
  managerId: string | null;
  manager: {
    userName: string;
    profile: {
      avatarUrl: string;
      fullName: string;
    };
  };
  profile: {
    id: string;
    fullName: string;
    phoneNumber: string | null;
    email: string;
    dayOfBirth: string;
    avatarUrl: string;
    gender: string;
    status: string;
    description: string;
    positions: { id: string; name: string; description: string }[];
    technicalMember: { id: string }[];
  };
}
export interface Position {
  id: string;
  name: string;
  description: string;
}
export interface IGetUser {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
  profile: {
    id: string;
    fullName: string;
    phoneNumber: string | null;
    email: string;
    dayOfBirth: string;
    avatarUrl: string;
    gender: string;
    status: string;
    description: string;
    positions: { id: string; name: string; description: string }[];
    technicalMember: { id: string }[];
    // positions: Position[];
  };
}
export type IGetUsers = IGetUser[];
export interface DataType {
  key: React.Key;
  employeeId: string;
  projectId: string;
  roles: string[];
}
export type ProjectType = {
  name: string;
  description: string;
  date: string[];
  language: string[];
  technical: string[];
  managerId: string;
  employeeId: {
    id: string;
    roles: string[];
  };
};
export type IUsers = {
  data: IUser[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
};
export type UserType = {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
  profile: {
    id: string;
    fullName: string;
    phoneNumber: string | null;
    email: string;
    dayOfBirth: string;
    avatarUrl: string;
    gender: string;
    status: string;
    description: string;
    positions: { id: string; name: string; description: string }[];
    technicalMember: { id: string }[];
    // positions: Position[];
  };
};
export type SkillType = {
  id: string;
  name: string;
};
export type GetListUsers = {
  name: string;
  take: number;
  page: number;
};

export interface DeleteUser {
  id: string;
}

export type IUserDetail = {
  id: string;
  email: string;
  created_at: string;
  isManager: boolean;
  positionMember: {
    id: string;
    postion: { id: string; name: string; description: string };
  }[];
  languageMember: {
    id: string;
    language: { id: string; name: string; description: string };
  }[];
  technicalMember: {
    id: string;
    technical: { id: string; name: string; description: string };
  }[];
  managerId: string | null;
  manager?: {
    userName: string;
    profile: {
      avatarUrl: string;
      fullName: string;
    };
  };
  projectHistory: { createDate: string }[];
  profile: {
    id: string;
    fullName: string;
    email: string;
    address: string;
    dayOfBirth: string;
    avatarUrl: string;
    status: string;
    description: string;
    positions: { id: string; name: string; description: string }[];
    technicalMember: { id: string }[];
  };
  projectMembers: {
    item: string;
    project: {
      name: string;
      endDate: string;
      startDate: string;
      languageProject: { language: { name: string } }[];
      technicalProject: { technical: { name: string } }[];
      description: string;
    };
    roles: { length: string; role: string; position: { name: string } }[];
  }[];
};

export interface IGetCV {
  id: string;
}
export interface IAssignEmployee {
  employeeId: string;
  projectId: string;
  roles: string[];
}
