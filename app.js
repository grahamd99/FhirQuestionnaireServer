// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// FHIR Questionnaire resource instance
const questionnaire = {
    resourceType: "Questionnaire",
    id: "health-questionnaire",
    status: "active",
    subjectType: ["Patient"],
    item: [
        {
            linkId: "1",
            text: "Do you have any allergies?",
            type: "boolean"
        },
        {
            linkId: "2",
            text: "What medications are you currently taking?",
            type: "string"
        },
        {
            linkId: "3",
            text: "Do you have any chronic illnesses?",
            type: "string"
        }
    ]
};

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
