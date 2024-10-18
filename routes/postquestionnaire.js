var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
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

module.exports = router;