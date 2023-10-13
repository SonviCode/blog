import { Category } from "./categoryTypes";
import { User } from "./userTypes";

export type Article = {
  id: number;
  title: string;
  user_id: number;
  date: Date;
  content: string;
  description: string;
  imagePresentation: string;
  category: Category;
};