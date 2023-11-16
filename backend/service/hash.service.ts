import { UserInterface } from "../models/user.model";
import bcrypt from "bcrypt";

export const hashPassword = async (body: UserInterface): Promise<void> => {
  try {
    const hash = await bcrypt.hash(body.password!, 10);
    body.password = hash;
  } catch (error) {
    return console.log({ error });
  }
};
