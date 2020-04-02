const axios = require("axios");

const route = process.argv[2];
let routeNumber;
let goodRoute = false;
const stop = process.argv[3];
let stopValue;
let goodStop = false;
const direction = process.argv[4];
let directionNumber;
let goodDirection = false;
const directionArray = [0, "south", "east", "west", "north"];
for (i=0; i<directionArray.length; i++){
    if (directionArray[i] === direction.toLowerCase()){
        directionNumber = i
    }
}
async function getRoutes() {
    let response = await axios.get('https://svc.metrotransit.org/NexTrip/Routes?format=json')
    return response.data
}
async function getDirections(routeNumber) {
    let response = await axios.get('https://svc.metrotransit.org/NexTrip/Directions/' + routeNumber + '?format=json')
    return response.data
}
async function getStops(routeNumber, directionNumber) {
    let response = await axios.get('https://svc.metrotransit.org/NexTrip/Stops/' + routeNumber + '/' + directionNumber + '?format=json')
    return response.data
}
async function getDeparture(routeNumber, directionNumber, stopValue) {
    let response = await axios.get('https://svc.metrotransit.org/NexTrip/' + routeNumber + '/' + directionNumber + '/' + stopValue + '?format=json')
    return response.data
}
async function loop() {
    if (process.argv.length > 5){
        console.log("Too many Arguements.  Please enter only a route, stop, and direction")
        return
    }
    else if(process.argv.length < 5){
        console.log("Too few Arguements.  Please enter a route, stop, and direction")
        return
    }
    const routeList = await getRoutes();
    for (i=0; i<routeList.length; i++){
        if (routeList[i].Description.includes(route) && !goodRoute){
            routeNumber = routeList[i].Route;
            goodRoute = true;
        }
    }
    if (!goodRoute){
        console.log("This route does not exist, or it does not run today.");
        return
    }
    const directionList = await getDirections(routeNumber);
    for (i=0; i<directionList.length; i++){
        if (directionList[i].Value === JSON.stringify(directionNumber)){
            goodDirection = true
        }
    }
    if (!goodDirection){
        console.log("This route does not go that direction.  Please ensure that you entered north, south, east, or west.");
        return
    }
    const stopList = await getStops(routeNumber, directionNumber);
    for (i=0; i<stopList.length; i++){
        if (stopList[i].Text.includes(stop) && !goodStop){
            stopValue = stopList[i].Value;
            goodStop = true;
        }
    }
    if (!goodStop){
        console.log("This route does not have that stop");
        return
    }
    const departureList = await getDeparture(routeNumber, directionNumber, stopValue);
    if (departureList.length === 0){
        console.log("I'm sorry!  There are no more departures today.")
        return
    }
    for (i = 0; i < departureList.length; i++){
        if (departureList[i].DepartureText == "Due"){
            console.log("Your departure is due now!  Next Departure: " + departureList[i+1].DepartureText);
            return
        }
        else{
            console.log("Next Departure: " + departureList[i].DepartureText);
            return
        }
    }
}
loop();