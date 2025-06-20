const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
var createError = require("http-errors");

const app = express();
const port = 3000;

// Serve Static Assets
app.use(express.static("public"));
// Virtual Path Prefix '/static'
app.use("/static", express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var authenticated = false;

var homeRouter = require("./routes/home");
var indexRouter = require("./routes/index");
var questionnaireRouter = require("./routes/questionnaire");
var postQuestionnaireRouter = require("./routes/postquestionnaire");
var appointmentRouter = require("./routes/appointment");

// FHIR resource instances
// Create a path to the file in the subdirectory
const questionnaireFilePath = path.join(
  __dirname,
  "./public/examples",
  "prescreenQuestionnaire1.json"
);
const appointmentFilePath = path.join(
  __dirname,
  "./public/examples",
  "Appointment breast screening initial.json"
);
const questionnaireLungFilePath = path.join(
  __dirname,
  "./public/examples",
  "prescreenLungQuestionnaire1.json"
);

// Read the Questionnaire file asynchronously
fs.readFile(questionnaireLungFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  // Assign the content to a const variable
  global.questionnaire = JSON.parse(data);

  // Log the file content to verify
  //console.log(questionnaire);
});

// Read the Appointment file asynchronously
fs.readFile(appointmentFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  // Assign the content to a const variable
  global.appointment = JSON.parse(data);

  // Log the file content to verify
  //console.log(appointment);
});

app.use("/", homeRouter);
app.use("/questionnaire", questionnaireRouter);
app.use("/postquestionnaire", postQuestionnaireRouter);
app.use("/appointment", appointmentRouter);

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

app.listen(port, () => {
  console.log(`FHIR Questionnaire app listening at http://localhost:${port}`);
});

//module.exports = app;
