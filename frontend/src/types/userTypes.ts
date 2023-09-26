export type User = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  date: Date;
  password?: string;
  role: string;
};

export type UserState = {
  value: User | null;
};
