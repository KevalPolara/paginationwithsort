const express = require("express");
const connectdb = require("./utils/db/mongose");
const app = express();
const cors = require("cors");

connectdb();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/userdata");

app.use("/v1", userRoute);

app.listen(3000, () => {
  console.log("Server Started Port Number 3000");
});
