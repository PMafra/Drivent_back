import Hotel from "../../entities/Hotel";

export async function getHotelInfos() {
  return await Hotel.getHotelInfos();
}
