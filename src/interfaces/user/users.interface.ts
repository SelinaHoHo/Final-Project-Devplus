export interface IUser {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  // userName: string;
  isManager: boolean;
  managerId: string | null;
  manager?: {
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
    // positions: Position[];
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
