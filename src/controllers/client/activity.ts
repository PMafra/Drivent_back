import { Request, Response } from "express";
import httpStatus from "http-status";
import * as activityService from "../../services/client/activity";
import SubscriptionInterface from "@/interfaces/SubscriptionInterface";

export async function getEventDayActivities(req: Request, res: Response) {
  const { eventDayId } = req.params;
  const dayId = Number(eventDayId);

  const activities = await activityService.getEventDayActivities(dayId);

  if (!activities) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  return res.send(activities).status(httpStatus.OK);
}

export async function postSubscribeActivity(req: Request, res: Response) {
  const inscricao = req.body as SubscriptionInterface;
  try {
    await activityService.postSubscribeActivity(inscricao);
    res.sendStatus(200);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(409);
    }
    if (error.message === "Atividade lotada") {
      return res.sendStatus(400);
    }
    if (error.message === "A atividade não existe") {
      return res.sendStatus(404);
    }
    if (error.message === "Usuário ja cadastrado") {
      return res.sendStatus(401);
    }
    return res.sendStatus(500);
  }
}
