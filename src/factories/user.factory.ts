import { createNewUser } from "../services/client/user";

export async function validNewUserFactory() {
  const email = "teste@teste.com";
  const password = "123456";
  const newUser = await createNewUser(email, password);
  return newUser;
}
