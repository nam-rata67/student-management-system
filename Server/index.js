import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";

// ✅ IMPORTANT (Google auth load)
import "./config/passport.js";

import userRoutes from "./routes/userRoutes.js";
import noticeRouter from "./routes/noticeRoutes.js";
import recordRouter from "./routes/recordRouter.js";
import noteRouter from "./routes/noteRouter.js";
import adminRoutes from "./routes/adminRoutes.js";
import AuthRoute from "./routes/AuthRoute.js";
import doubtRoutes from "./routes/doubtRoutes.js";

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: "https://student-management-system-2-umvq.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

// ✅ Passport init
app.use(passport.initialize());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/notices", noticeRouter);
app.use("/api/student-record", recordRouter);
app.use("/api/notes", noteRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", AuthRoute);
app.use("/api/doubts", doubtRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

// DB CONNECT
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
