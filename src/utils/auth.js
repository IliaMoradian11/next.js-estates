import { compare, hash } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 11);
  return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
