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
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
})
//onclick to dynamically create rows in table


//take data from firebase and add it to the table 
dbase.ref().on("child_added", function(snapshot){
    $("#information").prepend("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().place + "</td><td>" + snapshot.val().often + "</td><td>" + snapshot.val().time + "</td>");
});

//time stuff
var randomDate = "03/19/1995";
var randomFormat = "MM/DD/YYYY";
var convertedDate = moment(randomDate, randomFormat);

var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
console.log(firstTrainTimeConverted);

//Current time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//Difference between times
var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

//Remainder
var remainder = diffTime % frequency;
console.log(remainder);

//Minutes until next train
var minutesAway = frequency - remainder;
console.log("minutesAway", minutesAway);

//Next train
var nextArrival = moment().add(minutesAway, "minutes");
console.log("nextArrival", nextArrival);

// var newRow = $("<tr id='remove'>").append {

// }