export interface IUser {
  id: string;
  fullName: string;
  gender: string;
  email: string;
  positions: string[];
  status: string;
  avatarUrl: string;
}

export type IUsers = {
  users: IUser[];
};

export type GetListUsers = {
  name: string;
  take: number;
  page: number;
};

// export interface DataType {
//   id: string;
//   name: string;
//   email: string;
//   positions: string[];
//   status: boolean;
//   avatarUrl: string;
// }
