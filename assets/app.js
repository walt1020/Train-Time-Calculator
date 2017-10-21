var sTrainName = '';
var sDestination = '';
var sFrequency = '';
var firstTrain = '';
var firstTrainTime = '';
var currentTime = '';
var nextArrival = '';
var miutesAway = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = ''; 
var nextTrain = '';
var nextTrainFormatted = '';

  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBaPwOKJKjreUpllFiGmFg7bLfkAafQq3Y",
    authDomain: "train-time-calculator.firebaseapp.com",
    databaseURL: "https://train-time-calculator.firebaseio.com",
    projectId: "train-time-calculator",
    storageBucket: "train-time-calculator.appspot.com",
    messagingSenderId: "974404793764"
  };
  
  firebase.initializeApp(config);

  

  var database = firebase.database();

    // Enter form information into database
    database.ref().on("value", function(snapshot) {
      
      // Empty the tbody tag so I can rewrite all the info without duplication
      $("tbody").empty();

      //  Goes through all the database records and gets the values from each one
      snapshot.forEach(function(childsnapshot){

    
        sTrainName = childsnapshot.val()["dbtrainname"];
        sDestination = childsnapshot.val()["dbdestination"].trim();
        sFrequency = childsnapshot.val()["dbfrequency"];
        snextTrain = childsnapshot.val()["dbnextTrainFormatted"];
        sminutesTillTrain = childsnapshot.val()["dbminutesTillTrain"]
        
        // Writes out all the informaton in the database appending each record.
        $("tbody").append("<tr><td>" + sTrainName + "</td>" + "<td>" + sDestination + "</td>" + "<td>" + sFrequency + "</td>" + "<td>" + snextTrain + "</td>" + "<td>" + sminutesTillTrain + "</td></tr>");
        

      })
        
        var displayDestination = snapshot.val().dbdestination;
        
       }, function(errorObject) {
        console.log("Failure, please enter data again " + errorObject.code);
       });

$(document).ready(function() { 

    $("#add-train").on("click", function() {
      event.preventDefault();
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrain = $("#first-train-time").val().trim();
      firstTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
      currentTime = moment();
      frequency = $("#frequency").val().trim();
      diffTime = moment().diff(moment(firstTrainTime), "minutes");
      tRemainder = diffTime % frequency;
      minutesTillTrain = frequency - tRemainder;
      nextTrain = moment().add(minutesTillTrain, "minutes");
      nextTrainFormatted = moment(nextTrain).format("hh:mm");

     

       database.ref().push({
      "dbtrainname": trainName,
      "dbdestination": destination,
      "dbfirsttrain": firstTrain,
      "dbfrequency": frequency,
      "dbnextTrainFormatted": nextTrainFormatted,
      "dbminutesTillTrain": minutesTillTrain
     });

      
       $("input").val("");
       console.log("write times afer click");
       return false;
       

    }); 

    $("#clear-train").on("click", function(){

      $("td").text("");
      database.ref().remove();
    });

  })





    


    