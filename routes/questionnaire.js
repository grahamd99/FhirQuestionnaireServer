var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    console.log("Inside /questionnaire!");
    res.render("questionnaire", { foo: 'bar' })

/*
    if ( 1==1 ) {

        console.log("Inside /questionnaire!");

                res.render("questionnaire", {
                })

            .catch(function (error) {
                // handle error
                console.log(error);
                res.sendStatus(500);
                return;
            })
            .then(function () {
                // always executed
                                return;
            });
    } else {
        res.redirect('/');
    }
*/


});


module.exports = router;