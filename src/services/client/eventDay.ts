import EventDay from "../../entities/EventDay";

export async function getEventDayInfos() {
  return await EventDay.getEventDayInfos();
}
