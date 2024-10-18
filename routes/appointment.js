var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

    console.log("Inside /appointment!");
    res.render("appointment", { foo: 'bar'})

/*
    if ( 1==1 ) {

    console.log("Inside /appointment!");

    res.render("appointment", { foo: 'bar'})

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
        //res.redirect('/login');
    }
*/

});

module.exports = router;