const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('./models/User')
require("./services/passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Connected to mongoose successfully")
});

app.use(
  cookieSession({ 
    name: "session", 
    keys: ["sss"], 
    maxAge: 24 * 60 * 60 * 100,
    secure: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running!");
});
