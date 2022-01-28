import Activity from "../../entities/Activity";

export async function getEventDayActivities(eventDayId: number) {
  return await Activity.getEventDayActivities(eventDayId);
}
