import Hotel from "../../entities/Hotel";

export async function getHotelInfos(userId: number) {
  return await Hotel.getHotelInfos(userId);
}
