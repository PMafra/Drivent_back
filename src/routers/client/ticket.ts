import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

const router = Router();

router.get("/", controller.getTicketInfos);
router.post("/", controller.postTicketInfos);

router.post("/payment", controller.confirmPayment);

export default router;
