// @flow

export type Job = {
  payload: Object,
};

export type Req = {
  body: Object,
  query: Object,
  params: Object,
  logIn: any,
  get: any,
  hostname: any,
  path: any,
  url: string,
  isAuthenticated: any,
  logout: any,
  headers: Object,
  protocol: string,
  originalUrl: string,
  session: Object,
  assert: (
    string,
    string
  ) => {
    isInt: Function,
  },
  flash: (
    "success" | "info" | "error" | "warning",
    Array<string> | string
  ) => Req,
};

export type Res = {
  send: (any) => Res,
  status: (number) => Res,
  sendStatus: (number) => Res,
  render: (string, ?Object) => Res,
  locals: Object,
  redirect: (string | number, ?string) => Res,
  header: any,
  json: (any) => Res,
};
