export type ToDoType = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
};

export enum FilterEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export type SignInData = {
  email: string;
  password:string;
}

export interface IUser {
  id?: number | null,
  username?: string | null,
  email?: string | null,
}

export type SignUpData = {
  email: string;
  password: string;
  repeatPassword?: string;
};