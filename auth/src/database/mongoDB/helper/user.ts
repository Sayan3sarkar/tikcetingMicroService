import { UserDoc } from "../../../types/userType";
import { User } from "../models/user";

async function getUserByEmail(email: string): Promise<UserDoc | null> {
  return await User.findOne({ email });
}

async function signUpUser(email: string, password: string) {
  const user = User.build({
    email,
    password,
  });

  await user.save();
  return user;
}

export { getUserByEmail, signUpUser };
