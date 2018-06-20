var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var fs = require('fs');

//set firebase
var config = {
    apiKey: "AIzaSyATOeCpLhJOwj2vuxNxdxpks_Y6j-80T2Y",
    authDomain: "avascript-final-miband2.firebaseapp.com",
    databaseURL: "https://avascript-final-miband2.firebaseio.com",
    projectId: "avascript-final-miband2",
    storageBucket: "avascript-final-miband2.appspot.com",
    messagingSenderId: "60786103386"
};
firebase.initializeApp(config);

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
    // retrieve dtabase
    var rate;
    var database = firebase.database();
    retriveDB();

    function retriveDB() {
        database.ref("elderly/1/").on("value", function (snapshot) {
            console.log(snapshot.val());
            //console.log(snapshot.val().heartRate);
            rate = snapshot.val().heartRate;
            fs.writeFile('heartrate.txt', rate, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('Write operation complete.');
            });
        });
    }

    setTimeout('retriveDB()', 1000);
    //console.log("test");
    //console.log(rate);
});

module.exports = router;
