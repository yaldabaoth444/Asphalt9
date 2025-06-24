const main = require('./race-framework.js');
toastLog("Start");
sleep(5000);
device.setBrightness(0);

for(let i=0; i<3000; i++) {
	toastLog("for " + (i + 1));

	//main.doDE("hunt", 5);
	//main.doSE("sonic", 11);
	main.doSE("nevera", 12);
	//main.doSE("showroom", 11);

/*
	for(let i = 1; i <= 8; i++) {
		main.doDowngrade3(1);
		main.doMP3(2);
	}
	
	for(let i = 1; i <= 5; i++) {
		main.doMP2(2);
		main.doDowngrade2(1);
	}
	
	for(let i = 1; i <= 10; i++) {
		main.doDowngrade1(1);
		main.doMP1(2);
	}
*/
	//main.doDowngrade1(3);
	//main.doMP1(15);

	//main.doDowngrade2(3);
	//main.doMP2(8);

	//main.doMP3(10);

	Gap('75m');
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
