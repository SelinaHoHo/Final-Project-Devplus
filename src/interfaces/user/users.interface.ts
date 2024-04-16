interface IUser {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
}

interface IGetUser {
  id: string;
  userName: string;
  email: string;
  isManager: boolean;
}

export type IGetUsers = IGetUser[];
export type IUsers = IUser[];
