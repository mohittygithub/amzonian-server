const express = require("express");
const cors = require("cors");
const dontenv = require("dotenv");
dontenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("app up"));
