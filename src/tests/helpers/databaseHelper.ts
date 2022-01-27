import Address from "@/entities/Address";
import Enrollment from "@/entities/Enrollment";
import Session from "@/entities/Session";
import User from "@/entities/User";
import Ticket from "@/entities/Ticket";
import { getRepository } from "typeorm";

export async function clear() {
  await getRepository(Ticket).delete({});
  await getRepository(User).delete({});
  await getRepository(Address).delete({});
  await getRepository(Enrollment).delete({});
  await getRepository(Session).delete({});
}
