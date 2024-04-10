export interface IUser {
  // id: number;
  // name: string;
  // username: string;
  // email: string;
  id: string;
  name: string;
  email: string;
  positions: string[];
  status: boolean;
  avatarUrl: string;
}

export type IUsers = IUser[];

export interface DataType {
  id: string;
  name: string;
  email: string;
  positions: string[];
  status: boolean;
  avatarUrl: string;
}
