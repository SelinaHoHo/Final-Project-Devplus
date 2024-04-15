export interface IUser {
  id: string;
  fullName: string;
  gender: string;
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

export type IUsers = {
  data: IUser[];
  meta: {
    itemCount: number;
    pageCount: number;
  };
};

export type GetListUsers = {
  name: string;
  take: number;
  page: number;
};
