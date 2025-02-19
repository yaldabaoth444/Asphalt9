const main = require('./race-framework.js');
toastLog("Start");
sleep(5000);

main.core.profile.appId = 'com.gameloft.android.ANMP.GloftA9HM';
let cnt = 7
for(let i = 0; i < cnt; i++) {
	//if (i%3 === 0)
	//	main.GainTicket();
	
	main.doSE("ultima", 3);
	Gap('1m');
}

main.core.profile.appId = 'com.gameloft.android.SAMS.GloftA9SS';
for(let i = 0; i < cnt; i++) {
	//if (i%3 === 0)
	//	main.GainTicket();
	
	main.doSE("ultima", 3);
	Gap('1m');
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