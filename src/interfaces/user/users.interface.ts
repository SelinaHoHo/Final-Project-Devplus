interface IUser {
  id: string;
  fullName: string;
  email: string;
  isManager: boolean;
}

interface IGetUser {
  id: string;
  fullName: string;
  email: string;
  user: {
    id: string;
  };
  isManager: boolean;
}

export type IGetUsers = IGetUser[];
export type IUsers = IUser[];
