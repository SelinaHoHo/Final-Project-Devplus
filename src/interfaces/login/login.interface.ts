interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
}

interface IErrorResponse {
  message: string;
}

export type { IErrorResponse, ILoginRequest, ILoginResponse };
