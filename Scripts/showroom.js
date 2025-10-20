const main = require('./race-framework.js');
toastLog("Start");

//sleep(2000);

var options = ["x6", "x15", "1st x15", "2nd x15", "3rd x15"]
var choice = dialogs.select("select showroom race option", options);

sleep(1000);

switch(choice) {
  case 0: doRaceEx("showroom", 6, 0); break;
  case 1: doRaceEx("showroom", 15, 0); break;
  case 2: doRaceEx("showroom", 15, 1); break;
  case 3: doRaceEx("showroom", 15, 2); break;
  case 4: doRaceEx("showroom", 15, 3); break;
  default:
    // code block
}



toastLog("End");
exit();


function doRaceEx(profile, cnt, car) {
	for(let i = 1; i <= cnt; i++) {
		main.doRace(profile);
		toastLog('done showroom #' + i); 
		
		//sleep(5000);
		//click(2000, 1000); //next
		sleep(1500);

		if (car > 0 && i < cnt) {
			switch (car) {
				case 1: click(400, 500); break;
				case 2: click(1100, 500); break;
				case 3: click(400, 850); break;
			}
			sleep(1500);
		}
	}
}