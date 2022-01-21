import { signIn } from "../services/client/auth";
import { validNewUserFactory } from "./user.factory";

export async function validNewTokenFactory() {
  await validNewUserFactory();
  const details = await signIn( "teste@teste.com", "123456" );
  const token = details.token;
  return token;
}
