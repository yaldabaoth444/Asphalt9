var options = [
	/*0*/ "google",  
	/*1*/ "samsung",
	/*2*/ "huawei",
	]
var choice = dialogs.select("select action", options);

file = open('./profile.js', 'r');
var text = file.read();
file.close();

var newText = text;
if (choice == 0) { 
	newText = text.replace("appId: 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI',", "appId: 'com.gameloft.android.ANMP.GloftA9HM',");
	newText = newText.replace("appId: 'com.gameloft.android.SAMS.GloftA9SS',", "appId: 'com.gameloft.android.ANMP.GloftA9HM',");
	toastLog("set appId: google");
}
if (choice == 1) {
	newText = text.replace("appId: 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI',", "appId: 'com.gameloft.android.SAMS.GloftA9SS',");
	newText = newText.replace("appId: 'com.gameloft.android.ANMP.GloftA9HM',", "appId: 'com.gameloft.android.SAMS.GloftA9SS',");
	toastLog("set appId: samsung");
}
if (choice == 2) {
	newText = text.replace("appId: 'com.gameloft.android.SAMS.GloftA9SS',", "appId: 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI',");
	newText = newText.replace("appId: 'com.gameloft.android.ANMP.GloftA9HM',", "appId: 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI',");
	toastLog("set appId: huawei");
}

file = open('./profile.js', 'w');
file.write(newText);
file.flush();
file.close();

exit();