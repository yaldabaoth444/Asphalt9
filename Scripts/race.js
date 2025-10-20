const main = require('./race-framework.js');
toastLog("Start");

//main.doRace("race");

var prf = "race"

var options = ["x1", "x6", "x10", "x25", "x50"]
var choice = dialogs.select("select race option", options);

sleep(1000);

switch(choice) {
  case 0: go(prf, 1); break;
  case 1: go(prf, 6); break;
  case 2: go(prf, 10); break;
  case 3: go(prf, 25); break;
  case 4: go(prf, 50); break;
  default:
}

toastLog("End");
exit();


function go(_profile, cnt) {
	for(let i = 1; i <= cnt; i++) {
		main.doDirectRace(_profile);
		toastLog('done DirectRace #' + i); 
		sleep(1500);
	}
}