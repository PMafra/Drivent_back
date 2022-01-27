import { Router } from "express";

import * as controller from "@/controllers/client/eventDay";

const router = Router();

router.get("/", controller.getEventDayInfos);

export default router;
