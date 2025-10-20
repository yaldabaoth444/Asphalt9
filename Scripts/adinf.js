const core = require('./core.js');
requestScreenCapture();

toastLog("Start");
sleep(5000);
//device.setBrightness(0);

AdInfinte4();

toastLog("End");
exit();


function AdInfinte4()
{
	StageCounter("empty");
	var templates = [];
	let tFolder = './Images/AdAllInOne/';
    let tList = core.GetFolderImages(tFolder);
    tList.sort();
    if(tList.length > 0){
        for(let i = 0; i < tList.length; i++){
            let fileName = tList[i];
        	let path = files.join(tFolder, fileName);
            let template = images.read(path);
            let item = {"img": template, "fileName": fileName};
            templates.push(item);
        }
    }
    //toastLog('templates cnt:' + templates.length);

	c = 0;
	var imgfRes = null;
	while(true) {
		//toastLog(lastStage +' i:' + c + ' second:' + core.ElapsedSeconds('stage'));
	
		let imgad = captureScreen();
		imgfRes = core.ImagesFinderEx(imgad, templates);
		if (imgad != null)
            imgad.recycle();
	
		if (imgfRes.result) {
			StageCounter("close");
			//console.log("close s:" + core.ElapsedSeconds('stage'));

			core.Click(imgfRes.position_center);
			toastLog("close by "+imgfRes.image_name+" [" + imgfRes.position_center.x + "," + imgfRes.position_center.y + "]");
			//console.log("close by "+imgfRes.image_name+" [" + imgfRes.position_center.x + "," + imgfRes.position_center.y + "]");
			sleep(4000); 

			c = c + 1;
		} else {
			StageCounter("unknow");						
			//console.log("unknow s:" + core.ElapsedSeconds('stage'));

			if (core.ElapsedSeconds('stage') > 40) {
				click(2282, 57);
				sleep(500); 
				StageCounter("empty");
			} else if (core.ElapsedSeconds('stage') > 20) {
        		let sbRes = core.ImageFinder(null, './Images/Interface/', "status_bar.png", 't10');
	        	if (sbRes.result) {
	        		core.HideStatusBarTrix();
					core.SleepX(2500);
	            }
        	}
		}
    }
}

var lastStage = "unknow";
function StageCounter(currentStage)
{
	if (currentStage !== lastStage) {
		core.StartTimer('stage');
		lastStage = currentStage;
	}
}