import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import ticketRouter from "@/routers/client/ticket";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";
import eventDayRouter from "@/routers/client/eventDay";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/tickets", tokenValidationMiddleware, ticketRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/rooms", tokenValidationMiddleware, roomRouter);
router.use("/event-days", tokenValidationMiddleware, eventDayRouter);

export default router;
