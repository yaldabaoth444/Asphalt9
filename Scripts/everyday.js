const main = require('./race-framework.js');
toastLog("Start");
sleep(5000);
device.setBrightness(0);

for(let i=0; i<3000; i++) {
	toastLog("for " + (i + 1));

	main.doDE("hunt", 5);
	//main.doSE("showroom", 6);
	
	//main.doDE("hunt2", 1);
/*	
	for(let i = 1; i <= 6; i++) {
		main.doDowngrade3(1);
		main.doMP3(1);
	}

	for(let i = 1; i <= 4; i++) {
		main.doDowngrade1(3);
		main.doMP1(5);
	}
*/	
	//main.doMP3(3);
	main.doMP1(10);
	main.doMP2(10);
	//main.doDE("hunt", 2);

}

toastLog("End");
exit();
