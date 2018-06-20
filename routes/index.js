var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var fs = require("fs");

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
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
  // retrieve dtabase
  var rate, num;
  var database = firebase.database();
  retriveDB();

  function retriveDB() {
    database.ref("elderly/").on("value", function(snapshot) {
      num = snapshot.numChildren();
      for (var i = 1; i <= num; i++) {
        database.ref("elderly/" + i + "/").on("value", function(snapshot) {
          console.log(snapshot.val());
          rate = snapshot.val().heartRate;
          var dataString = rate + "\r\n";
          //console.log(dataString);
          if (i == 1) {
            fs.writeFile("heartrate.txt", dataString, function(err) {
              if (err) console.log(err);
              else console.log("Write operation complete.");
            });
          } else {
            fs.appendFile("heartrate.txt", dataString, function(err) {
              if (err) console.log(err);
              else console.log("Append operation complete.");
            });
          }
        });
      }
    });
  }

  setTimeout("retriveDB()", 1000);
});

module.exports = router;
