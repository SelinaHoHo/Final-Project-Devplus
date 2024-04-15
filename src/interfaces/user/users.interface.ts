export interface IUser {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  positions: Position[];
  status: string;
  avatarUrl: string;
  // isManager: boolean;
  //
  user: {
    isManager: boolean;
    managerId: string;
    fullName: string;
  };
}
export interface Position {
  id: string;
  name: string;
  description: string;
}

interface IGetUser {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
  profile: IUser;
}

export type IGetUsers = IGetUser[];

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
  }
}

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
