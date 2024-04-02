import {authentication} from "../middleware/auth.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import groupRouter from "./group.js";
import messageRouter from "./message.js";

const router = (app) => {
    app.use("/auth", authRouter);
    app.use("/user", authentication, userRouter);
    app.use("/group", authentication, groupRouter);
    app.use("/message", authentication, messageRouter);
};

export default router;
