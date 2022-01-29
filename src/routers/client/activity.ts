import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/:eventDayId", controller.getEventDayActivities);

export default router;
