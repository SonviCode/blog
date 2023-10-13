import { User } from "./userTypes";

export type Comment = {
  id: number;
  content: string;
  date: Date;
  user: User;
  article_id: number;
};
