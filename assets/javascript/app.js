// 1. Link to Firebase
var transportData = new Firebase("https://vast-worlds.firebaseio.com/");

// 2. Button for adding transport
$("#addTransportBtn").on("click", function(){

	// Grabs user input
	var portName = $("#transportNameInput").val().trim();
	var portDest = $("#destInput").val().trim();
	var portTime = moment($("#timeInput").val().trim(), "H HH").format("X");
	var portFreq = $("#freqInput").val().trim();

	// Creates local "temporary" object for holding transport data
	var newPort = {
		name:  portName,
		destination: portDest,
		time: portTime,
		frequency: portFreq
	}

	// Uploads transport data to the database
	transportData.push(newPort);

	// Logs everything to console
	console.log(newPort.name);
	console.log(newPort.destination); 
	console.log(newPort.time);
	console.log(newPort.frequency)

	// Alert
	alert("Transport successfully added");

	// Clears all of the text-boxes
	$("#transportNameInput").val("");
	$("#destInput").val("");
	$("#timeInput").val("");
	$("#freqInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding transport to the database and a row in the html when a user adds an entry
transportData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var portName = childSnapshot.val().name;
	var portDest = childSnapshot.val().destination;
	var portTime = childSnapshot.val().time;
	var portFreq = childSnapshot.val().frequency;

	// Transport Info
	console.log(portName);
	console.log(portDest);
	console.log(portTime);
	console.log(portFreq);

	// Calculate frequency in minutes
	// var transportFreq = moment.unix(portTime).format("MM/DD/YY");

	// To calculate the next arrival 
	var nextArrival = moment().diff(moment.unix(portTime, 'X'), "months");
	console.log(nextArrival);

	// Calculate the total minutes away
	var minAway = nextArrival * portFreq;
	console.log(minAway);

	// Add each train's data into the table 
	$("#transportTable > tbody").append("<tr><td>" + portName + "</td><td>" + portDest + "</td><td>" + portFreq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td><td>");

});