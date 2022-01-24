import User from "@/entities/User";

export async function validNewUserFactory(email: string, password: string) {
  const newUser = await User.createNew(email, password);
  return newUser;
}
