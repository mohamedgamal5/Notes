var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var logger = require("morgan");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const dbconnection = require("./config/database");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var foldersRouter = require("./routes/folders");
var notessRouter = require("./routes/notes");
var passport = require("passport");
var app = express();
dbconnection();
// mongoose
//   .connect("mongodb://localhost/Notes", {})
//   .then(() => console.log("MongoDB connection established."))
//   .catch((error) => console.error("MongoDB connection failed:", error.message));
require("./config/passport");

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "layout",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      multiply: function (val1, val2) {
        return val1 * val2;
      },
      addOne: function (val1) {
        return val1 + 1;
      },
      Date: function (val) {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return val.toLocaleDateString("en-US", options);
      },
    },
  })
);
// view engine setup
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({ secret: "Notes_?@!", saveUninitialized: true, resave: true })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/folders", foldersRouter);
app.use("/notes", notessRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
