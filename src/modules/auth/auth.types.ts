export type JwtPayload = {
  id: string;
};

export type JwtTokens = {
  access_token: string;
  refresh_token: string;
};

export enum JwtNames {
  ACCESS_TOKEN = 'UP_access_token',
  REFRESH_TOKEN = 'UP_refresh_token',
}
