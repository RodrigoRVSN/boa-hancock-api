export interface ICallback {
  user: {
    id: string;
    username: string;
  };
}

export interface IPayload {
  sub: string;
  username: string;
}
