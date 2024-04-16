export interface IUser {
  id: string;
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
// export interface Position {
//   id: string;
//   name: string;
//   description: string;
// }
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
