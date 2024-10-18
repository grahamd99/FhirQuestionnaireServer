var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    console.log("Inside /appointment!");

    try {

        const appointment = global.appointment; 

        // Render the EJS template and pass the appointment data
        res.render('appointment', { appointment });
    } catch (error) {
        console.error("Error fetching FHIR appointment:", error);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;