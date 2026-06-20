import { hash } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 11);
  return hashedPassword;
}
