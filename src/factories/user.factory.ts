import User from "@/entities/User";

export async function validNewUserFactory() {
  const email = "teste@teste.com";
  const password = "Drivent123";
  const newUser = await User.createNew(email, password);
  return newUser;
}
