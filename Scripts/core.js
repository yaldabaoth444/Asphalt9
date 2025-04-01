// The MIT License
//
// Copyright © 2023 Gizatullin Azamat (monopo@list.ru)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the “Software”), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
// whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
// THE SOFTWARE.

const profile = require('./profile.js');
var _core = {};

_core.profile = this.profile;
_core.timers = storages.remove('timers');
_core.timers = storages.create('timers');
_core.threshold = 0.90;
_core.fixOrientation = profile.fixOrientation;

_core.A9State = function(img) {
    let res = a9State(img);
    //console.log(res.CurrentStage);
	return res
}

_core.ClosePopups = function() {
    toastLog("ClosePopups");
	return closePopups();
}

_core.CheckPixel = function(img, point) {
    return checkPixel(img, point);
};

_core.Click = function(point) {
	clickPixel(point);
}

_core.Press = function(point, duration) {
    press(point.x, point.y, duration)
}

_core.ClickPixelByName = function(pixelName) {
	clickPixelByName(pixelName);
}

_core.ImagesClicker = function(img, folder, region) {
    return imagesClicker(img, folder, region);
}

_core.ImageClicker = function(img, folder, fileName, region, threshold) {
    return imageClicker(img, folder, fileName, region, threshold);
}

_core.ImageFinder = function(img, folder, fileName, region, threshold)
{
    return imageFinder(img, folder, fileName, region, threshold);
};

_core.ImageFinderEx = function(img, template, region)
{
    return imageFinderEx(img, template, region);
};

_core.ImagesFinder = function(img, folder, region)
{
	return imagesFinder(img, folder, region);
};

_core.ImagesFinderEx = function(img, template, region)
{
    return imagesFinderEx(img, template, region);
};

_core.GetFolderImages = function(folder) {
    return getFolderImages(folder);
};

_core.SleepX = function(duration) {
	sleepX(duration);
};

_core.WaitX = function(duration) {
    waitX(duration);
};

_core.SelectTab = function(num) {
	selectTab(num);
};

_core.SelectMP = function(mpCorner, mpNum, league) {
	var pixel = profile["mp"+mpNum+"_league_marker_"+league];
    if (pixel != null)
        click(pixel.x + mpCorner.x, pixel.y + mpCorner.y);
};

_core.SelectDailyEvent = function(eventName) {
    console.log("SelectDailyEvent " + eventName);
    startTimer(eventName);    
    while(elapsedSeconds(eventName) < 45) {
        let imgfRes = imageFinder(null, './Images/DailyEvents/', eventName + ".png", 'b50');
        if (imgfRes.result) {
            clickPixel(imgfRes.position_center);
            sleepX(1500);

            imgfRes = imageFinder(null, './Images/Interface/', "de_enter.png", 'b35');
            if (imgfRes.result) {
                clickPixel(imgfRes.position_center);
                sleepX(2500);
            }
            
            return true;
        } else {    
            swipe(1450, 900, 1100, 900, 500);
            sleepX(500);
        } 
    }
    return false;
}

_core.SelectSpecialEvent = function(eventName, stage) {
    startTimer(eventName);    
    while(elapsedSeconds(eventName) < 45) {

        let imgfRes = imageFinder(null, './Images/SpecialEvents/'+eventName+'/', stage + ".png", 't60', 0.95);
        if (imgfRes.result) {
            //console.log({imgfRes});
            clickPixel(imgfRes.position_center);
            sleepX(2500);

            //imgfRes = imagesFinder(null, './Images/Next/');
            //if (imgfRes.result) {
            //    clickPixel(imgfRes.position_center);
            //    sleepX(2500);
            //}
            click(2000, 950);
            sleepX(500);

            return true;
        } else {    
            //console.log('shift');
            swipe(1400, 900, 1000, 900, 500);
            sleepX(800);
        } 
    }
    return false;
}

_core.SelectCar = function(preffered) {
	let img = captureScreen();
	let rankPos = imagesFinder(img, './Images/Garage/', preffered)
	if (rankPos.result) {
		clickPixel(rankPos.position_center);
        return true;
	}
    if (img != null)
	   img.recycle();
    return false;
}

_core.GetLeague = function(img, mpCorner, mpNum) {

    if (mpCorner == null)
        return "unranked";

	if (LeagueChecker(img, mpNum, mpCorner, "unranked"))
        return "unranked";

    if (LeagueChecker(img, mpNum, mpCorner, "bronze"))
        return "bronze";

    if (LeagueChecker(img, mpNum, mpCorner, "silver"))
        return "silver";

    if (LeagueChecker(img, mpNum, mpCorner, "gold"))
        return "gold";

    if (LeagueChecker(img, mpNum, mpCorner, "platinum"))
        return "platinum";

    if (LeagueChecker(img, mpNum, mpCorner, "legend"))
        return "legend";

    return "unranked";
}

_core.DetectMPTopLeftCorner = function(mpNum, img)
{
    return detectMPTopLeftCorner(mpNum, img);
}

_core.GarageSelectLeague = function(mpNum, league) {
	let nextLeague = "silver";
	switch(league) {
		case "silver": nextLeague = "gold"; break;
		case "gold": nextLeague = "platinum"; break;
		case "platinum": nextLeague = "legend"; break;
		case "legend": nextLeague = "bronze"; break;
		default: nextLeague = "silver"; break;
	}
    let pixelName = "mp"+mpNum+"_league_selector_"+nextLeague;
    console.log(pixelName);
	clickPixelByName(pixelName);
}

_core.GarageSelectCar = function(currentLeague, preset, direction, forceMode) {
    //console.log("GarageSelectCar " + currentLeague);
    let dir = direction || "left";
    let isMP = currentLeague != null;
    let skipedCars = [];
    let img = null;
    try 
    {
        let cars = null;
        if (currentLeague != null) {
            cars = getLeagueCars(currentLeague, preset);
        } else {
            cars = preset;
        }

        let startTime = new Date().getTime();
        let nowTime = new Date().getTime();
        while((nowTime - startTime) < (3 * 60* 1000)) {
            nowTime = new Date().getTime();

            img = captureScreen();
            let carHash = getCarHash(img);
            isBlackListed = profile.car_black_list != null && profile.car_black_list.includes(carHash)
            let canGo = carCanGo(img);
            let included = skipedCars.includes(carHash);
            let alreadySeen = !isMP || (isMP && included);
            //console.log('carHash: ' + carHash + ' ' + isBlackListed);
            if (!isBlackListed && (canGo || (forceMode && checkPixel(img, profile.car_skip) && alreadySeen)))
            {    
                let currCarStar = getCarStar(img);
                let currCarClass = getCarClass(img);
                //console.log(currCarClass + currCarStar);
                for (let i = 0; i < cars.length; i++) {
                    let car = cars[i];
                    if (currCarClass == car[0])
                    {
                        if (currCarStar >= parseInt(car[1], 10))
                        {
                            return true;
                        }
                    }
                }
            }
            if (!included)
                skipedCars.push(carHash);
            //prev car
            clickPixelByName("car_shift_" + dir);
            sleep(profile.car_switch_speed);
        }        
        return false;
    }
    finally
    {
        //if (_img != null)
        //    _img.recycle();

        if (img != null)
            img.recycle();
    }
}

_core.SignClicker = function(signSet, routeRegion) {
    return signClicker(signSet, routeRegion);
}

_core.PressNitro = function() {
    pressNitro();
}

_core.PressBrake = function(duration) {
    pressBrake(duration);
}

_core.StartTimer = function(timerName) {
    startTimer(timerName);
}

_core.ElapsedSeconds = function(timerName) {
    return elapsedSeconds(timerName);
}

_core.Elapsed = function(timerName) {
    return elapsed(timerName);
}

_core.ParseNavigation = function(nav) {
    return parseNavigation(nav);
}

_core.GetTrackPercentMatrix = function(img) {
    return getTrackPercentMatrix(img);
}

_core.SelectRouteNum = function(pos) {
    return selectRouteNum(pos);
}

_core.GetCarStar = function(img) {
    return getCarStar(img);
}

_core.GetCarClass = function(img) {
    return getCarClass(img);
}

_core.Kill = function() {
    return KillA9();
}

_core.Start = function() {
    return StartA9();
}

_core.Restart = function() {
    KillA9();
    StartA9();
}
_core.SwitchAppTo = function(appName) {
    switchAppTo(appName)
}
_core.HideStatusBarTrix = function() {
    hideStatusBarTrix();
}
_core.Enable = function(fn) {
    enable(fn);
}

_core.Disable = function(fn) {
    disable(fn);
}

module.exports = _core;

//================================================
function a9State(img) {
	let state = {};
    state.CurrentStage = "unknow";    
    state.TabSelected = 0;

	if (checkPixel(img, profile.race_marker)) {
		state.CurrentStage = "race";
        return state;
		//state.HasTouchdriveOn = checkPixel(img, profile.race_td_on);
		//SignsDetector(img);
	} else {
        //detect home icon
        state.HasHome = checkPixel(img, profile.home);
		//detect setup icon
        state.HasSetup = checkPixel(img, profile.setup) || state.HasHome;
		//detect back button
        state.HasBack = checkPixel(img, profile.back);// || (state.HasHeader && !state.HasHome && !state.HasSetup);
        //detect A tokens
		state.HasATokens = imageFinder(img, './Images/Interface/', "a_tokens.png", "t10").result  || state.HasHome;
		//detect Credit tokens
        state.HasCTokens = imageFinder(img, './Images/Interface/', "c_tokens.png", "t10").result  || state.HasHome;
        
        state.HasHeader = (state.HasATokens && state.HasCTokens && (state.HasBack || state.HasSetup)) || state.HasHome;

        //detect race loading screen
	    //state.HasRaceLoading = !state.HasHeader && (checkPixel(img, profile.race_loading) || checkPixel(img, profile.race_loading_lte));
        if (state.HasBack && state.HasATokens && state.HasCTokens && !state.HasSetup)
        {
            if (checkPixel(img, profile.daily_events_lobby)) {
                state.CurrentStage = "daily_events_lobby";
                //return state;
            } 

            if (imageFinder(img, './Images/Interface/', "car_selection.png", "tl40").result) {
                state.CurrentStage = "garage";
                return state;
            }

            if (checkPixel(img, profile.car_lobby_marker1) && checkPixel(img, profile.car_lobby_marker2)) {
                state.CurrentStage = "car_lobby";
                return state;
            } 

            if ((imageFinder(img, './Images/Interface/', "get_ready.png", "br30").result || imageFinder(img, './Images/Interface/', "play.png", "br30").result) 
                && imageFinder(img, './Images/Interface/', "rewards.png", "b30").result) {
                state.CurrentStage = "mp_lobby";
                //return state;
            } 
        } 
        //tabSelected
        if (!state.HasBack && state.HasATokens && state.HasCTokens && state.HasSetup)
        {
            state.CurrentStage = "home_page";
            //detect selected tab
            for (let i = 1; i <= 5; i++)
            {
                if (checkPixel(img, profile["tab"+i]))
                {
                    state.TabSelected = i;
                    //return state;
                }
            }
        }   

        //detect next buttons (ex. after race)
        let nextRes = imagesFinder(img, './Images/Next/', 'b50', 0.85);
        if (nextRes.result) {
            //console.log({nextRes});
            state.CurrentStage = "next";
            state.NextPos = nextRes.position_center;
            state.ImageName = nextRes.image_name;
            //return state;
        }

        //popups detect
        let dlgRes = imagesFinder(img, './Images/Dialog/');
        if (dlgRes.result) {
            //state.HasDialog = true;
            state.CurrentStage = "dialog";
            return state;
        }
	}
	return state;	
};

function imageFinder(img, folder, fileName, region, threshold)
{
    //let _threshold = threshold != null ? threshold : _core.threshold;
	let res = { result: false, position: null, position_center: null, image_name: null };

    if (!folder)
        return res;

    let path = files.join(folder, fileName);
    if (!files.isFile(path))
        return res;

    let imgad = null;
    if (img != null)
        imgad = images.copy(img);
    else
        imgad = captureScreen();

    try {
        let template = images.read(path)
        let _region = region || getLocation(fileName);
        let _threshold = threshold || getTolerance(fileName) || _core.threshold
        let pos = null;
        if (_region) {
        	if (typeof _region === 'string') {
    		  _region = calcRegion(imgad, _region)
              //console.log(fileName);
              //console.log({_region});
    		}
            pos = images.findImageInRegion(imgad, template, _region.x, _region.y, _region.width, _region.height, _threshold);
        }
        else
            pos = images.findImage(imgad, template, {threshold: _threshold});    

        width = template.getWidth();
        height = template.getHeight();
        template.recycle();
        
        if(pos){
            if (_core.fixOrientation && device.width < imgad.width)
                pos = fixOrientationBug(pos, device.height, device.width);
        	res.result = true;
        	res.position = pos;
            res.position_center = {
                x: Math.round(pos.x + width/2), 
                y: Math.round(pos.y + height/2)
            };
            res.image_name = fileName;
        } 
        return res;
    }
    finally {
        if (imgad != null)
            imgad.recycle();
    }
}

function imageFinderEx(img, template, region)
{
    let res = { result: false, position: null, position_center: null, image_name: null };

    if (!template)
        return res;

    // let imgad = null;
    // if (img != null)
    //     imgad = images.copy(img);
    // else
    //     imgad = captureScreen();

//    try {
        let tImg = template.img;
        let _region = region || getLocation(template.fileName);
        let _threshold = getTolerance(template.fileName) || _core.threshold
        let pos = null;
        if (_region) {
            if (typeof _region === 'string') {
              _region = calcRegion(img, _region)
              //console.log({_region})
            }
            //pos = images.findImage(img, tImg, {threshold: _core.threshold, region: _region});
            pos = images.findImageInRegion(img, tImg, _region.x, _region.y, _region.width, _region.height, _threshold);
            //console.log({pos})
            if (!insideRegion(_region, pos))
                return res;
        }
        else
            pos = images.findImage(img, tImg, {threshold: _threshold});    

        width = tImg.getWidth();
        height = tImg.getHeight();
        
        if(pos){
            if (_core.fixOrientation && device.width < img.width)
                pos = fixOrientationBug(pos, device.height, device.width);
            res.result = true;
            res.position = pos;
            res.position_center = {
                x: Math.round(pos.x + width/2), 
                y: Math.round(pos.y + height/2)
            };
            res.image_name = template.fileName;
        } 
        return res;
    // }
    // finally {
    //     if (imgad != null)
    //         imgad.recycle();
    // }
}

function imagesFinder(img, folder, region, threshold)
{
	let res = { result: false, position: null, position_center: null, image_name: null };

    if (!folder)
        return res;

    let list = getFolderImages(folder);
    let len = list.length;
    if(len > 0){
        let imgad = null;
        if (img != null)
            imgad = images.copy(img);
        else
            imgad = captureScreen();

        try {
            for(let i = 0; i < len; i++){
                let fileName = list[i];
                //if (fileName.toLowerCase().endsWith(".png") || fileName.toLowerCase().endsWith(".jpg"))
                //{
                	res = imageFinder(img, folder, fileName, region, threshold);
                    if(res.result){
                        return res
                    }  
                //}
            }
        }
        finally {
            if (imgad != null)
                imgad.recycle();
        }
    }
    return res
};

function imagesFinderEx(img, templates, region)
{
    let res = { result: false, position: null, position_center: null, image_name: null };

    if (!templates || templates.length == 0)
        return res;

    for(let i = 0; i < templates.length; i++){
        //console.log(i +': '+ templates[i].fileName);
        res = imageFinderEx(img, templates[i], region);
        if(res.result){
            return res
        }  
    }
    
    return res
};

function getFolderImages(folder) 
{
    return files.listDir(folder, function(name){
        return (name.endsWith(".png") || name.endsWith(".jpg")) && files.isFile(files.join(folder, name));
    });
}

function getLocation(filename)
{
    const regex = /@[tb]?[rl]?\d+/gi;
    const regex2 = /@[tbrl]{1,2}\d{1,2}/gi;
    var matches = filename.match(regex);
    if (matches){
      matches = matches[0].match(regex2);
      if (matches)
        return matches[0].substring(1);
    }
    return null;
}

function getTolerance(filename)
{
    const regex = /~\d{2}/gi;
    var matches = filename.match(regex);
    if (matches){
        return parseFloat("0." + matches[0].substring(1));
    }
    return null;
}

function insideRegion(region, pos) {
    if (region == null || pos == null)
        return false;

    if (pos.x >= region.x && pos.x <= region.x + region.width)
        if (pos.y >= region.y && pos.y <= region.y + region.height)
            return true;
    return false;    
}
/*
function calcRegion(location) {
	let res = { x: 0, y: 0, width: profile.screen_width - 1, height: profile.screen_height - 1 };

	let locPercent = parseInt(location.match(/\d+/));
	let xp = profile.screen_width * locPercent / 100;
	let yp = profile.screen_height * locPercent / 100;

	if (location.indexOf("t") !== -1) {
		res.height = yp;
	}

	if (location.indexOf("b") !== -1) {
		res.y = profile.screen_height - yp;
		res.height = yp - 1;
	}

	if (location.indexOf("l") !== -1){
		res.width = xp;
	}

	if (location.indexOf("r") !== -1){
		res.x = profile.screen_width - xp;
		res.width = xp - 1;
	}
	//console.log(res);
	return res;
}*/

function calcRegion(img, location) {
    let res = { x: 0, y: 0, width: img.width - 1, height: img.height - 1 };

    let locPercent = parseInt(location.match(/\d+/));
    let xp = img.width * locPercent / 100;
    let yp = img.height * locPercent / 100;

    if (location.indexOf("t") !== -1) {
        res.height = yp;
    }

    if (location.indexOf("b") !== -1) {
        res.y = img.height - yp;
        res.height = yp - 1;
    }

    if (location.indexOf("l") !== -1){
        res.width = xp;
    }

    if (location.indexOf("r") !== -1){
        res.x = img.width - xp;
        res.width = xp - 1;
    }
    //console.log(res);
    return res;
}

function pressNitro()
{
    //console.log("pressNitro");
    click(profile.golden_point.x, profile.golden_point.y);
}
//------
function pressBrake(duration) 
{
    //console.log("pressBrake " + duration);
    if (duration > 0) {
        press(profile.screen_width * 1 / 5, profile.screen_height / 2, duration);
    } else {
        press(profile.screen_width * 1 / 5, profile.screen_height / 2, 40);
    }
}

function sleepX(duration) {
	let extender = profile.sleep_extender || 0;
    if (typeof duration === 'string' || duration instanceof String) {
        let ms = toMS(duration);
        sleep(ms + extender);
    } else {
        sleep(duration + extender);
    }
}

function waitX(duration) {
    let _duration = 0;
    let extender = profile.sleep_extender || 0;
    if (typeof duration === 'string' || duration instanceof String) {
        let ms = toMS(duration);
        _duration = ms + extender;
    } else {
        _duration = duration + extender;
    }
    //let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    let uniqueId = "waitX"+duration;
    startTimer(uniqueId);    
    while(elapsed(uniqueId) < _duration) {
        let left = _duration - elapsed(uniqueId);
        
        if (left > 5000)
            toast(msToTime(left));

        if (left > 1000 * 60) {
            sleep(1000 * 60);
        } else {
            sleep(1000 * 10);
        }
    }
}

function checkPixel(img, point) {
    let threshold = 0;
    if (point && point.diff)
        threshold = point.diff
	return images.detectsColor(img, point.color, point.x, point.y, threshold);
};

function clickPixel(point) {
	click(point.x, point.y);
}

function clickPixelByName(pixelName) {
    let point = profile[pixelName];
    if (point != null)
        clickPixel(point);
}

function imagesClicker(img, folder, region) {
    let res = imagesFinder(img, folder, region)
    if (res.result) {
        clickPixel(res.position_center);
    }
    return res.result;
}

function imageClicker(img, folder, fileName, region, threshold) {
    let res = imageFinder(img, folder, fileName, region, threshold)
    if (res.result) {
        clickPixel(res.position_center);
    }
    return res.result;
}

function closePopups()
{
	console.log("closePopups");

	//catch daily goals claims
	let claimRes = imageFinder(null, './Images/Interface/', "claim_goals.png", 'r30');
    if (claimRes.result) {
        let startTime = new Date().getTime();
        let nowTime = new Date().getTime();
    	let hasClaim = true;
        let swipeCounter = 0;
        while(hasClaim && (nowTime - startTime) < 45*1000) {
        	nowTime = new Date().getTime();

        	claimRes = imageFinder(null, './Images/Interface/', "claim_goals.png", 'r30');
        	if (claimRes.result) {
        		clickPixel(claimRes.position_center);
				sleepX(1500);
                swipeCounter = 0;
            } else {    
				swipe(1700, 600, 1700, 750, 300);
                swipeCounter++;		
        	} 

            if (swipeCounter > 5)
                hasClaim = false;
        }
    }

	let adRes = imagesFinder(null, './Images/AdClosers/')
	if (adRes.result) {
		clickPixel(adRes.position_center);
        //console.log("ad close [" + adRes.position_center.x + "," + adRes.position_center.y + "]");
		return true;
	}

	let dlgRes = imagesFinder(null, './Images/Dialog/')
	if (dlgRes.result) {
        //console.log("dialog close [" + adRes.position_center.x + "," + adRes.position_center.y + "]");
		clickPixel(dlgRes.position_center);
		return true;
	}

    let sbRes = imageFinder(null, './Images/Interface/', "status_bar.png", 't10');
    if (sbRes.result) {
        hideStatusBarTrix();
        sleepX(2500);
    }

    back();
    return false;
}

function selectTab(num) {
	//console.log("selectTab " + num);
	let point = profile["tab"+num];
	if (point != null)
		click(point.x, point.y + 50);
}

function carCanGo(img) {
    if (checkPixel(img, profile.car_can_go) && !(checkPixel(img, profile.car_skip) || checkPixel(img, profile.need_upgrade)))     {
        //console.log("carCanGo yes");
        return true;
    } else {
        //console.log("carCanGo no");
        return false;
    }
    
}

function getCarStar(img)
{
    //console.log("getCarStar");
    let currStar = 0;

    if (checkPixel(img, profile.car_star_6))
        currStar = 6;
    else if (checkPixel(img, profile.car_star_5))
        currStar = 5;
    else if (checkPixel(img, profile.car_star_4))
        currStar = 4;
    else if (checkPixel(img, profile.car_star_3))
        currStar = 3;
    else if (checkPixel(img, profile.car_star_2))
        currStar = 2;
    else if (checkPixel(img, profile.car_star_1))
        currStar = 1;
    return currStar;
}

function getCarClass(img)
{
    let imgad = null;
    if (img != null)
        imgad = images.copy(img);
    else
        imgad = captureScreen();

    let currClass = null;

    let nextRes = imagesFinder(img, './Images/Garage/Classes/', 'tr25', 0.9);
    if (nextRes.result) {
        currClass = files.getNameWithoutExtension(nextRes.image_name);
        console.log("getCarClass: " + currClass);
    }

    if (imgad != null)
        imgad.recycle();

    return currClass;
}

function getLeagueCars(currentLeague, cars)
{
    if (currentLeague == 'legend'){
        return cars.legend;
    } else if (currentLeague == 'platinum'){
        return cars.platinum;
    } else if (currentLeague == 'gold'){
        return cars.gold;
    } else if (currentLeague == 'silver'){
        return cars.silver;
    } else if (currentLeague == 'bronze'){
        return cars.bronze;
    } else {
        return cars.bronze;
    }
}

function LeagueChecker(img, mpNum, pos, league)
{
    var pixel = profile["mp"+mpNum+"_league_marker_"+league];
    if (pixel == null)
        return false;
    
    let pxFind = { 
        x: (pixel.x + pos.x), 
        y: (pixel.y + pos.y), 
        color: pixel.color, 
        diff: pixel.diff
    };
    return checkPixel(img, pxFind);
}

function detectMPTopLeftCorner(mpNum, img)
{
    if (img == null)
        return null;

    var y = profile.mpScanLineY;
    var whiteLine = false;
    var blockCount = 0;
    for (let x = 0; x < profile.screen_width - 1; x++)
    {
        let pxFind = { x: x, y: y, color: "#ffffff", diff: 65 };
        var isWhitePixel = checkPixel(img, pxFind);

        if (!whiteLine && isWhitePixel)
        {
            blockCount++;
            whiteLine = true;
            console.log("block:" + blockCount + " x,y:" + x +"," + y);
            if (mpNum == blockCount)
                return { x: x, y: y };
        }

        if (whiteLine && !isWhitePixel)
            whiteLine = false;
    }

    return null;
}

function signClicker(filter, region)
{
    let sFilter = filter;
    if (profile.avoid_sign_set)
        sFilter = sFilter +', '+ profile.avoid_sign_set;

    if (!sFilter)
        return false;

    let folder = './Images/TrafficSigns/';

    let list = sFilter.split(',');
    let len = list.length;
    if (len > 0) {
        let img = captureScreen();

        if (!routeSignsPresent(img))
            return false;

        for(let i = 0; i < len; i++) {
            let fileName = list[i].trim()+'.png';
            let signRes = imageFinder(img, folder, fileName, region);
            if(signRes.result) {
                console.log(fileName);
                if (fileName.startsWith("!")) {
                    AvoidSignClick(signRes.position_center.x);     
                } else
                    clickPixel(signRes.position_center);
                return true;
            }
        }
        if (img != null)
            img.recycle();
    }
    return false
}

function float2int (value) {
    return value | 0;
}

function startTimer(timerName) {
    _core.timers.remove(timerName);
    _core.timers.put(timerName, new Date().getTime());
}

function elapsedSeconds(timerName) {
    return float2int((elapsed(timerName) / 1000));
}

function elapsed(timerName) {
    if (_core.timers.get(timerName) == null) {
        _core.timers.remove(timerName);
        _core.timers.put(timerName, new Date().getTime());
        return 0;
    }

    return (new Date().getTime() - _core.timers.get(timerName));
}

function getTrackPercentOcr(img) {
    let clip = images.clip(img, 400, 98, 68, 46);
    let gray = images.grayscale(clip);
    let scale = images.scale(gray, 3, 3, 'LANCZOS4');
    let trshd = images.threshold(scale, 150, 255, 'TOZERO');
    let final = images.interval(trshd, "#dddddd", 50)

    let result = ocr.detect(final);
    if (result) {
        let r = result.filter(o => o.confidence >= 0.6);
        if (r && r.length > 0) {
            let rObj = r[0];
            if (rObj && rObj.label) {
                text = rObj.label;  
                if (text != "") {
                    let num = parseInt(text.trim(), 10);
                    if (num)
                        return num;
                }
            }
        }
    }
    return -1;
}

function parseNavigation(nav)
{
    let res = [];
    if (nav != null)
    {
        for (let i = 0; i < nav.length; i++) {
            let navParams = nav[i].split('|');
            let prcParams = navParams[0].split('%').filter(i => i);
            let prcNum = parseInt(prcParams[0], 10);
            let prcDelta = 0;
            if (prcParams.length > 1) 
                prcDelta = parseInt(prcParams[1], 10);

            let actType = navParams[1];
            let cmd = { fire: false, type: actType, percent: prcNum, delta: prcDelta };

            if (actType == "drift" ||
                actType == "drift-flash" ||
                actType == "drift-perfect-nitro" ||
                actType == "drift-normal-nitro")
            {
                cmd.dur = parseInt(navParams[2], 10);
            }

            if (actType == "flash" ||
                actType == "360" ||
                actType == "360-flash")
            {
                if (navParams.length > 2) 
                    cmd.dur = parseInt(navParams[2], 10);
            }

            if (actType == "signs")
            {
                let newSigns = "";
                if (navParams.length >= 3)
                    newSigns = navParams[2];
                cmd.path = newSigns;
            }

            if (actType == "choose")
            {
                cmd.pos = navParams[2];
            }

            res.push(cmd);
        }
    }
    return res;
}

function getTrackPercentMatrix(img) {

    var n1 = ScanNumber(img, profile.prc_num_1, profile.prcDarkColor, profile.prcDarkThreshold, profile.prcLightColor, profile.prcLightThreshold, 0);
    var shift = -10;
    switch(n1) {
        case "0": shift = -29; break;

        case "1": shift = -14; break;

        case "3":
        case "5": shift = -23; break;
        
        case "4": shift = -24; break;
        
        case "6":
        case "8": shift = -26; break;

        case "9": shift = -25; break;

        case "2":
        case "7": shift = -23; break;

        default: break;
    }
    var n10 = ScanNumber(img, profile.prc_num_1, profile.prcDarkColor, profile.prcDarkThreshold, profile.prcLightColor, profile.prcLightThreshold, shift);
    let num = parseInt((n10 + n1).trim(), 10);
    if (num)
        return num;
    return -1;
}

function ScanNumber(img, sdata, darkColor, darkThreshold, lightColor, lightThreshold, shift) {
    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < sdata.length; i++) {
        let item = sdata[i];

        var light = images.detectsColor(img, lightColor, item.x+shift, item.y, lightThreshold);
        var dark = images.detectsColor(img, darkColor, item.x+shift, item.y, darkThreshold);

        if (light)
            nums = nums.filter((el) => !item.blank.includes(el));

        if (dark)
            nums = nums.filter((el) => !item.dirty.includes(el));

        if (nums.Length == 0)
            return "";
    }

    return nums.join(", ");
}

function selectRouteNum(sPos) {
    //console.log('selectRouteNum ' + sPos);
    let rr = _core.profile.race_route_region;
    //let dx8 = rr[2]/8;
    let y = rr[1] + rr[3]/2;
    let cnt = parseInt(sPos[1], 10);
    let num = parseInt(sPos[0], 10);
    let x = getSignXPos(num, cnt);

    // switch (cnt) {
    //     case 4:
    //         x = rr[0] + (((num * 2) - 1) * dx8);
    //         break;

    //     case 3:
    //         x = rr[0] + ((num * 2) * dx8);
    //         break; 

    //     case 2:
    //         x = rr[0] + (((num * 2) + 1) * dx8);
    //         break;        
    // }
    //console.log("route sign press " + sPos + " (" + x + "," + y +")");
    press(x, y, 50);
}

function AvoidSignClick(x) {
    console.log("AvoidSignClick " + x);
    let rr = _core.profile.race_route_region;
    let dx8 = rr[2]/8;
    let y = rr[1] + rr[3]/2;

    let s12 = getSignXPos(1, 2);
    let s22 = getSignXPos(2, 2);
    
    if (near(s12, x)) {
        press(s22, y, 50);
        console.log("s12 >> s22");
        return;
    }

    if (near(s22, x)) {
        press(s12, y, 50);
        console.log("s22 >> s12");
        return;
    }

    let s13 = getSignXPos(1, 3);
    let s23 = getSignXPos(2, 3);
    let s33 = getSignXPos(3, 3);
    if (near(s13, x)) {
        press(s23, y, 50);
        console.log("s13 >> s23");
        return;
    }

    if (near(s33, x)) {
        press(s23, y, 50);
        console.log("s33 >> s23");
        return;
    }

    if (near(s23, x)) {
        press(s13, y, 50);
        console.log("s23 >> s13");
        return;
    }

    let s14 = getSignXPos(1, 4);
    let s44 = getSignXPos(4, 4);
    if (near(s14, x)) {
        press(s12, y, 50);
        console.log("s14 >> s12");
        return;
    }

    if (near(s44, x)) {
        press(s22, y, 50);
        console.log("s44 >> s22");
        return;
    }
}

function routeSignsPresent(img) {
    let pxFind = { 
        x: 0, 
        y: 280, 
        color: '#ffffff', 
        diff: 1
    };

    for (let cnt = 2; cnt <= 4; cnt++) {
        for (let num = 1; num <= cnt; num++) {
            if (cnt == 4 && (num == 2 || num == 3))
               continue; 
            pxFind.x = getSignXPos(num, cnt);
            let res = checkPixel(img, pxFind);
            if (res) {
                //log("routeSignsPresent " + num + " of " + cnt + " [" + pxFind.x + "," + pxFind.y + "]");
                return true;
            }
        }
    }

    return false;
}

function near(target, x) {
    if (!x)
        return false;

    let delta = 8;
    if (x >= target-delta && x <= target+delta)
        return true;

    return false;
}

function getSignXPos(num, cnt){
    let rr = _core.profile.race_route_region;
    let dx8 = rr[2]/8;
    let x = 0;

    switch (cnt) {
        case 4:
            x =  (rr[0] + (((num * 2) - 1) * dx8));
            break;

        case 3:
            x =  (rr[0] + ((num * 2) * dx8));
            break; 

        case 2:
            x =  (rr[0] + (((num * 2) + 1) * dx8));
            break;        
    }
    return ~~x;
}

function getCarHash(img) {
    let chr = _core.profile.car_hash_region;
    let final = images.clip(img, chr[0], chr[1], chr[2], chr[3]);
    let hash = $crypto.digest(images.toBase64(final), "MD5", { input: 'base64' });
    return hash;
}

//------
function KillA9() 
{
    let appName = getAppName(profile.appId);
    log("Kill " + appName);
    openAppSetting(profile.appId);
    sleep(3500);

    //close
    //click(340, 2080);
    click(180, 2144);
    sleep(1500);

    // ok
    click(739, 2030);
    sleep(2000);
}
//------
function StartA9() 
{
    let appName = getAppName(profile.appId);
    log("Start " + appName);
    launch(profile.appId);
}
//------
function hideStatusBarTrix() {
    swipe(2330, 900, 1700, 900, 900);
    sleep(300);
    click(2275, 762);
    sleep(1500);
    click(2275, 762);
    sleep(1500);
}

const toMS = ts => {
    let raw = ts.split(` `);
    const hms = `0h 0m 0s`.split(` `)
      .map(v => raw.find(t => t.slice(-1) === v.slice(-1)) || v);

    return hms.join(``)
      .match(/\d+/g)
      .reduce((acc, cur, idx) => 
        acc + cur * (Math.pow(60, (2 - idx))) * 1000, 0);
}

function msToTime(duration) {
  const portions = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + 'h');
    duration = duration - (hours * msInHour);
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'm');
    duration = duration - (minutes * msInMinute);
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + 's');
  }

  return portions.join(' ');
}

function enable(fn) {
    var parts = fn.split("/");
    var name = parts.pop();
    files.rename(fn+"!", name);
}

function disable(fn) {
    var parts = fn.split("/");
    var name = parts.pop();
    files.rename(fn, name+"!");
}

function switchAppTo(appName) {
    switch(appName.toLowerCase()) {
        case "google":
            profile.appId = 'com.gameloft.android.ANMP.GloftA9HM';
            break;
        case "samsung":
            profile.appId = 'com.gameloft.android.SAMS.GloftA9SS';
            break;
        case "huawei":
            profile.appId = 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI';
            break;
    }
}

function fixOrientationBug(pos, width, height) {
    //console.log('wrong XY: '+ pos.x + ', ' + pos.y);
    let k = width/height;
    let newWidth = height/k;
    let pad = (width-newWidth)/2;
    let newX = (pos.x-pad)*k;
    let newY = pos.y*k;
    let newPos = { x: newX, y: newY };
    //console.log('right XY: '+ newPos.x + ', ' + newPos.y);
    return newPos;
}

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};