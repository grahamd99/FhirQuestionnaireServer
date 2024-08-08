// app.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve Static Assets
app.use(express.static("public"));
// Virtual Path Prefix '/static'
app.use('/static', express.static('public'))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


// FHIR Questionnaire resource instance
// Create a path to the file in the subdirectory
const filePath = path.join(__dirname, './public/examples', 'prescreenQuestionnaire1.json');

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
