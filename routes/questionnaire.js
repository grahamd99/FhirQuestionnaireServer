var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    if ( 1==1 ) {

        console.log("Inside /questionnaire!");

                res.render("questionnaire", {
                })

            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    } else {
        //res.redirect('/login');
    }
});

module.exports = router;