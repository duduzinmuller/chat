// server.js
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import messageRoutes from "./src/routes/messageRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import phoneVerificationRoutes from "./src/routes/phoneVerificationRoutes.js";
import emailRouter from "./src/routes/emailVerificationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/phoneverification", phoneVerificationRoutes);
app.use("/api/email", emailRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
