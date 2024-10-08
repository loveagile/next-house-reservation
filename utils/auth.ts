import bcryptjs from "bcryptjs";

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  console.log(await bcryptjs.hash(password, 10));
  return await bcryptjs.compare(password, hashedPassword);
};
