import { signIn } from "../../services/client/auth";
import { generateUser } from "../helpers/userHelper";
import { validNewUserFactory } from "./user.factory";

export async function validNewTokenFactory() {
  const user = generateUser();
  await validNewUserFactory(user.email, user.password);
  const details = await signIn(user.email, user.password);
  const token = details.token;
  return token;
}
