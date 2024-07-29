export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserUpdatingData extends Omit<IUser, 'email'> {
  password: string;
}
