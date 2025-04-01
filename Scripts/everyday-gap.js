const main = require('./race-framework.js');
toastLog("Start");
sleep(5000);
device.setBrightness(0);

for(let i=0; i<3000; i++) {
	toastLog("for " + (i + 1));

	main.doDE("hunt", 2);
	main.doDE("free", 10);
	//main.doSE("ultima", 8);
	//main.doSE("showroom", 11);

/*
	for(let i = 1; i <= 10; i++) {
		main.doDowngrade3(1);
		main.doMP3(1);
	}
	
	for(let i = 1; i <= 5; i++) {
		main.doMP2(2);
		main.doDowngrade2(1);
	}
	
	for(let i = 1; i <= 7; i++) {
		main.doDowngrade1(2);
		main.doMP1(3);
	}
*/
	//main.doDowngrade1(8);
	//main.doMP1(12);

	//main.doDowngrade2(3);
	//main.doMP2(5);

	//main.doMP3(12);

	Gap('20m');
}

toastLog("End");
exit();

function Gap(duration) {
	toastLog("Kill");
	main.Kill();

	toastLog("sleep");
	main.WaitX(duration);

	toastLog("Start");
	main.Start();

	main.WaitX('1m');	
}
