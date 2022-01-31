import Activity from "../../entities/Activity";
import SubscriptionInterface from "@/interfaces/SubscriptionInterface";

export async function getEventDayActivities(eventDayId: number) {
  return await Activity.getEventDayActivities(eventDayId);
}

export async function postSubscribeActivity(subscript: SubscriptionInterface) {
  return await Activity.postSubscribe(subscript);
}
