# nextBusConsole
A Node.js console app that determines when the next bus will leave given the route, bus stop, and direction.

This app takes exactly 3 parameters.  Any more or less will result in a message informing the user what parameters they should be using.  The first parameter is a string which identifies the route name.  The API stores the route number in that string as well, so I used the includes method to check for matches.  I also have a boolean that checks if a match has been found yet, so if a partial route name with multiple matches is typed, only the first result will be returned.  If no matches are found, the user will be informed that their route doesn't exist or isn't running today.

If the route is matched, it will be checked and compared with the direction to ensure that the route runs that direction.  If the direction does not match, the user will be informed.  

If the direction is matched, the stop will be checked.  If the stop does not match, the user will be informed that the stop isn't on this route.  If the stop matches, a list of departures will be gathered.

If the DepartureText of the first element of the departure list reads "Due", the user will be informed that the next departure is due now, and they will also be informed of the time for the following departure.  If the first element reads anything other than "Due", only the first element's depearture text will be displayed.  If there are no elements, the user will be informed that no departures remain for the day.  

Here is a quick demo:

[demo](nextBusConsole.gif)