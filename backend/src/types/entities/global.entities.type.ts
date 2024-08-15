export type IUser = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  password?: string;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type UserSessionType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};
