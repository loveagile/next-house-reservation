import bcryptjs from "bcryptjs";

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(password, hashedPassword);
};
