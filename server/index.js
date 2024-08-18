const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRouter = require("./routes/AuthRouter");

/* 
1. main entry point of backend service app.
*/

const path = require('path');
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongoDB !!!");
  })
  .catch((err) => {
    console.log(err);
  });

__dirname = path.resolve();
   
app.use("/api/auth", authRouter); 


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || `Internal Server Error`;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
}); 

app.listen(PORT, () => console.log(`server running on port ${PORT}`));