
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import noticeRouter from "./routes/noticeRoutes.js";
import recordRouter from "./routes/recordRouter.js";
import noteRouter from "./routes/noteRouter.js";
import adminRoutes from "./routes/adminRoutes.js";
import AuthRoute from "./routes/AuthRoute.js";
import "./config/passport.js";  
import doubtRoutes from "./routes/doubtRoutes.js";





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // body parser

app.use("/api/users", userRoutes);
app.use("/api/notices", noticeRouter);
app.use("/api/student-record", recordRouter);

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/uploads", express.static("uploads"));
app.use("/api/notes", noteRouter);
app.use(express.json({ limit: "10mb" }));
app.use("/api/admin", adminRoutes);

app.use("/api/auth", AuthRoute);
app.use("/api/doubts", doubtRoutes);




