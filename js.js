var firebaseConfig = {
  apiKey: "AIzaSyAlrVf4F7JZQULpHDpNM5jlKyQjoZi5zzw",
  authDomain: "project-1-66f61.firebaseapp.com",
  databaseURL: "https://project-1-66f61.firebaseio.com",
  projectId: "project-1-66f61",
  storageBucket: "",
  messagingSenderId: "119880972700",
  appId: "1:119880972700:web:beb7c5dcd990a02786f059"
};
firebase.initializeApp(firebaseConfig);
//   firebase.initializeApp(config);

var database = firebase.database();


var currentDate = moment().format('MMMM Do YYYY');
$("#current-date").text(currentDate);
var currentTime = moment().format("hh:mm a");
$("#current-time").text(currentTime);


$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var name = $("#train-name-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var freq = $("#freq-input").val().trim();

  var newTrain = {
    name: name,
    dest: dest,
    freq: freq,
  };

  database.ref().push(newTrain);

  console.log("User added: " + name + " headed to " + dest + " every " + freq + " minutes.");

  // Clear inputs
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  // console.log(childSnapshot.val());

  var tName = childSnapshot.val().name;
  var tRole = childSnapshot.val().dest;
  var tFreq = childSnapshot.val().freq;

// convert current time and freq to same moment then do math!
 
  var nextTrain = moment().add(tFreq, "minutes");

  var newRow = $("<tr>").prepend(
    $("<td>").text(tName),
    $("<td>").text(tRole),
    $("<td>").text(tFreq),
    $("<td>").text(moment(nextTrain).format("hh:mm a")),
    $("<td>").text((tFreq) + "min")
  );

  $("#train-table > tbody").append(newRow);
});