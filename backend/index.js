import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json())

app.use('/backend/user',userRoute)
app.use('/backend/admin', adminRoute)

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500
  const message = err.message || "Internal Server Error";

  return res.status(statuscode).json({
    success:false,
    message,
    statuscode
  })
})