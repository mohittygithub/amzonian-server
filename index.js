const express = require("express");
const app = express();

const dontenv = require("dotenv");
dontenv.config();

const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routers/userRouter.js");
const productRouter = require("./routers/productRouter.js");
const orderRouter = require("./routers/orderRouter.js");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// DB Connections
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err.message));

//routes

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// server config

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("app up"));
