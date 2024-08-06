// app.js

const express = require('express');
const bodyParser = require('body-parser');
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
const questionnaire = {
    resourceType: "Questionnaire",
    id: "health-questionnaire",
    status: "active",
    subjectType: ["Patient"],
    item: [
        {
            linkId: "1",
            text: "Do you have a pacemaker or any other implanted medical device ?",
            type: "boolean"
        },
        {
            linkId: "2",
            text: "Do you need additional support to attend screening ?",
            type: "string"
        },
        {
            linkId: "3",
            text: "Are you pregnant or breastfeeding ?",
            type: "boolean"
        },
        {
            linkId: "4",
            text: "Are you under the care of a breast consultant ?",
            type: "boolean"
        },
        {
            linkId: "5",
            text: "Have you had a mammogram in the last 6 months ?",
            type: "boolean"
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
