const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");


dotenv.config();

app.use(express.static('public'));

mongoose
  .connect(process.env.MONGO_URL, {
  })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
    console.error(err);
});

app.use(express.json()); // to accept json files

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8800, () => {
    console.log("Bankend Sever is running!");
});
