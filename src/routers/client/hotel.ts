import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.getHotelInfos);

export default router;
