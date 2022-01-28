import { Request, Response } from "express";
import httpStatus from "http-status";
import * as activityService from "../../services/client/activity";

export async function getEventDayActivities(req: Request, res: Response) {
  const { eventDayId } = req.params;
  const dayId = Number(eventDayId);

  const activities = await activityService.getEventDayActivities(dayId);

  if (!activities) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  return res.send(activities).status(httpStatus.OK);
}
