// app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
var createError = require('http-errors');


const app = express();
const port = 3000;

// Serve Static Assets
app.use(express.static("public"));
// Virtual Path Prefix '/static'
app.use('/static', express.static('public'))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var authenticated = false;

var homeRouter               = require('./routes/home');
var indexRouter              = require('./routes/index');
var questionnaireRouter      = require('./routes/questionnaire');

// FHIR Questionnaire resource instance
// Create a path to the file in the subdirectory
const filePath = path.join(__dirname, './public/examples', 'prescreenQuestionnaire1.json');
//const filePath = path.join(__dirname, './public/examples', 'SDOHCC.json');

// Read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  // Assign the content to a const variable
  //const questionnaire = data;
  global.questionnaire = JSON.parse(data);

  // Log the file content to verify
  //console.log(questionnaire);
});


app.use('/', homeRouter);
app.use('/questionnaire', questionnaireRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Endpoint to render the questionnaire
app.get('/questionnaire', (req, res) => {
    res.render('questionnaire', { questionnaire: questionnaire });
});


// Endpoint to submit a questionnaire response
app.post('/questionnaire-response', (req, res) => {
    const items = Object.keys(req.body).map(key => {
        return {
            linkId: key,
            answer: [{
                valueBoolean: req.body[key] === 'on' ? true : undefined,
                valueString: req.body[key] !== 'on' ? req.body[key] : undefined
            }]
        };
    });

    const questionnaireResponse = {
        resourceType: "QuestionnaireResponse",
        questionnaire: `Questionnaire/${questionnaire.id}`,
        status: "completed",
        subject: {
            reference: "Patient/example"
        },
        item: items
    };

    res.json(questionnaireResponse);
});

app.listen(port, () => {
    console.log(`FHIR Questionnaire app listening at http://localhost:${port}`);
});

//module.exports = app;