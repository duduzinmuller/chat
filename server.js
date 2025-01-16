import "dotenv/config.js";
import express from "express";
import cors from "cors";
import messageRoutes from "./src/routes/messageRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import phoneVerificationRoutes from "./src/routes/phoneVerificationRoutes.js";
import emailRouter from "./src/routes/emailVerificationRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import resetPasswordRouter from "./src/routes/resetPasswordRouter.js";
import contactRouter from "./src/routes/contactRoutes.js";
import updateRoutes from "./src/routes/userUpdateRoutes.js";
import getContactRoutes from "./src/routes/getByContactRoutes.js";
import friendRouter from "./src/routes/friendRoutes.js";
import getContactRouter from "./src/routes/getContactRoutes.js";

const app = express();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/phoneverification", phoneVerificationRoutes);
app.use("/api/email", emailRouter);
app.use("/api/auth", authRoutes);
app.use("/auth", resetPasswordRouter);
app.use("/api", contactRouter);
app.use("/api/update", updateRoutes);
app.use("/api/get", getContactRoutes);
app.use("/api/friends", friendRouter);
app.use("/api/provider", getContactRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
