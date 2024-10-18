var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    console.log("Inside /questionnaire!");
    res.render("questionnaire", { foo: 'bar' })

});


module.exports = router;