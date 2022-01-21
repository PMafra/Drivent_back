import Room from "../../entities/Room";

export async function getRoomInfos() {
  return await Room.getRoomInfos();
}
