export interface IUser {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  positions: string[];
  status: string;
  avatarUrl: string;
}

interface IGetUser {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
  profile: IUser;
}

export type IGetUsers = IGetUser[];
export type IUsers = IUser[];

export interface DataType {
  key: React.Key;
  employeeId: string;
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

export type UserType = {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
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

