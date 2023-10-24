import { User } from "./userTypes";

export type Comment = {
  id: number;
  content: string;
  date: Date;
  user_id: number;
  article_id: number;
};
