//Get Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDERQWusw7yJxsB4G2BsYX4i-Y8l3WA6pY",
    authDomain: "train-scheduler-f97f3.firebaseapp.com",
    databaseURL: "https://train-scheduler-f97f3.firebaseio.com",
    projectId: "train-scheduler-f97f3",
    storageBucket: "train-scheduler-f97f3.appspot.com",
    messagingSenderId: "593846971384",
    appId: "1:593846971384:web:9a5179bbde1b0d68f7440d"
};

//Initialize Firebase
firebase.initializeApp (firebaseConfig);

var dbase = firebase.database();

//Initialize variables
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "0";

//onclick 
$("#add-train").on("click", function(event){
    event.preventDefault();
    //Grab user input and send to Firebase
    trainName = $("#name-input").val().trim();
    destination = $("#place-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    frequency = $("#often-input").val().trim();
    console.log(trainName, destination, firstTrainTime, frequency);

    //Add train data to Firebase database
    dbase.ref().push({
        name: trainName,
        place: destination,
        time: firstTrainTime,
        often: frequency
    });
    //Clear inputs
    $("#name-input").val("");
    $("#place-input").val("");
    $("#time-input").val("");
    $("#often-input").val("");
})

//Add minutes away
dbase.ref().on("child_added", function(snapshot){
    
    //time stuff
    var firstTrainTimeConverted = moment(snapshot.val().time, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    //Current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //Difference between times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //Remainder
    var remainder = diffTime % snapshot.val().often;
    console.log(remainder);

    //Minutes until next train
    var minutesAway = snapshot.val().often - remainder;
    console.log("minutesAway", minutesAway);

    //Next train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("nextArrival", nextArrival);
    var arrivalTime = moment(nextArrival).format("hh:mm");
    console.log (arrivalTime);

    $("#information").prepend("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().place + "</td><td>" + snapshot.val().often + "</td><td>" + arrivalTime + "</td><td>" + minutesAway + "</td></tr>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});