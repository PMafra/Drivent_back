import { Router } from "express";

import * as controller from "@/controllers/client/room";

const router = Router();

router.get("/", controller.getRoomInfos);
router.post("/:userId", controller.updateTicketRoom);

export default router;
