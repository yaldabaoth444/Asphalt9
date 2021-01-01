"auto";
const robot = require('./robot.js');
const profile = require('./profile.js');
const levelName = profile.mp.levelName;
const status = profile.mp.status;
const carPick = profile.mp.carPick;
//const carrerCars = profile.carrer.cars;

var startTime = new Date().getTime();
var timer = new Date().getTime();

var lastLevel = 0;
var lastCar   = 0;

module.exports = {
    //==========================================================================
    // Multiplayer
    mp: {
        goingHome(){
            var Flag = false;
            while (!Flag){
                var mpStatus = mpCheckState();
                if (mpStatus != -1) {
                    timer = new Date().getTime();
                }
                else {
                    var now = new Date().getTime();
                    if ((now - timer) > 300000) {
                        toastLog("blocked!restart!");
                        timer = new Date().getTime();
                        exit();
                    }
                }
                
                switch(mpStatus){
                    case "home": {
                        Flag = true;
                        break;
                    }
                    
                    case "index": {
                        Flag = true;
                        break;
                    }
                    
                    case "start": {
                        robot.back();
                        sleep(2000);
                        break;
                    }
                    
                    case "race": {
                        sleep(5000);
                        break;
                    }
                    
                    case "next": {
                        sleep(2000);
                        //robot.click(profile.mp.continue1.x, profile.mp.continue1.y);
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        break;
                    } 
                    
                    case "dialog": {
	              	    robot.back();
	                    sleep(2000);                           
                 		break;            
                    }           
                }
            }
        },
        //----------------------------------------------------------------------
        beforeRun() {
            var tries = 0;
            var last = "";
            var Flag = false;
             while (!Flag){
                var mpStatus = mpCheckState();
                if (mpStatus != "unknow") {
                    timer = new Date().getTime();
                } else {
                    var now = new Date().getTime();
                    if ((now - timer) > 300000) {
                        toastLog("blocked!restart!");
                        timer = new Date().getTime();
                        exit();
                    }
                }
                if (profile.traceOn) {
                    toast(mpStatus);
                }
                // count sequence of mpStatus
                if (last == mpStatus) {
                     tries++;
                } else {
                     tries = 1;
                     last = mpStatus;
                }
                
                if (tries > 250) {
                    toastLog("go back by tries overflow for " + mpStatus);
                    robot.back();
	                sleep(2000);
                    tries = 1;
                }
                
                switch(mpStatus){
                    case "home": {
                        if (tries > 2 && last == "home") {
                            robot.click(profile.mp.game1of2.x, profile.mp.game1of2.y);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "index": {
                        if (tries > 2 && last == "index") {
                            selectPage(4);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "start": {
                        if (tries > 2 && last == "start") {
                            sleep(2000);
                            Flag = true;
                        }
                        break;
                    }
                    
                    case "race": {
                        sleep(2000);
                        break;
                    }
                    
                    case "next": {
                        if (tries > 2 && last == "next") {
                            sleep(2000);
                            robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        }
                        break;
                    }
                    
                    case "dialog": {
                        if (tries > 2 && last == "dialog") {
                            robot.back();
	                        sleep(2000);
                        }                           
                 		break;            
                    } 
                }
                sleep(500);
             }
        },
        //----------------------------------------------------------------------
        chooseCar() {
            if (1)
        	{
                lastLevel = getCurrentLeagueLevel();
	       	}
            robot.click(profile.mp.start.x, profile.mp.start.y);
            sleep(4000);
            var FOUND = false;
   
            for (let i = lastLevel; i < 5 && !FOUND; i++){
                if (status[i]){
                    if (hasFuel(levelName[i])){
                        FOUND = true;
                        lastLevel = i;
                    }
                }
            }
            
            if (FOUND){
                // Find a car with gas
                sleep(4000);
                
                // Check if car available fuel
                var img = captureScreen();
                if (isSimilar(img, profile.garage.ready, 10))
                {
                    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                    return true;
                }
            }
            lastLevel = 0;  
            lastCar   = 0;    
            toastLog("\nNo fuel.");
            return false;
        },
        //----------------------------------------------------------------------
        run(counter_mp) {
            var left = 0;
            var runTime = new Date().getTime();
            var exit = 0;
            
            // Check if you have reached the checkout interface
            while (true) {
                var nowTime = new Date().getTime();
                if ((nowTime - runTime) > 400000) {
                    toastLog("blocked!restart!");
                    exit();
                }
                
                var mpStatus = mpCheckState();
                // exit conditions
                if (!(mpStatus == "unknow" || mpStatus == "race")) {
                    // waiting 3 times of no race condition
                    exit++;
                    if (exit > 2)
                    {
                        toastLog("mp-run exit with state = " + mpStatus);
                        break;
                    }
                }
                // If you have not finished running, you can still click on nitrogen
                else {
                    // reset accidental exit 
                    exit = 0;
                    PressNitro();
                }
                sleep(950);
            }
            toastLog(++counter_mp + " multiplayer matches have been completed, average time " +parseInt((nowTime - startTime)/1000/counter_mp)+" second."
                                  + "\nThe next game is about to start.");
        },
        //----------------------------------------------------------------------
        test() {
            //toastLog("mp-test " + profile.traceOn);
            toastLog("mpCheckState " + mpCheckState());// + "\ngetCurrentLeagueLevel " + getCurrentLeagueLevel());
        }
    }
}

function mpCheckState() {
    var state = "unknow";

    var img = captureScreen();
    
    var isToken = isEquals(img, profile.common.token);
    var isCredit = isEquals(img, profile.common.credit);
    
    // Back button
    var isBack = isSimilar(img, profile.common.back, 5) && isSimilar(img, profile.common.backward, 5);
    
    // Multiplayer start button
    var start = images.pixel(img, profile.mp.start.x, profile.mp.start.y);
    var isStart = isEquals(img, profile.mp.start) || 
        (colors.red(start) < colors.green(start) && 
         colors.blue(start) < colors.green(start) && 
         colors.green(start) > 250 && 
         isButtonEdge(img, profile.mp.reward) && 
         isButtonEdge(img, profile.mp.rate) && 
         isButtonEdge(img, profile.mp.stage));
    
    var isGames = isNetworkGames(img);
   
    var isPage3 = isPage(img, 3);
    var isPage4 = isPage(img, 4);
   
    var racePause = isSimilar(img, profile.common.racePause, 3);
    var raceTD = isSimilar(img, profile.common.raceTD, 3);
    var raceTime = isSimilar(img, profile.common.raceTime, 20);
    var isRace = racePause && raceTD && raceTime; 
    
    // Continue button
    var isNext = isButtonEdge(img, profile.mp.continue1) 
              || isButtonEdge(img, profile.mp.continue2) 
              || isButtonEdge(img, profile.mp.continue3)
              || isButtonEdge(img, profile.mp.continue4)
              || isButtonEdge(img, profile.mp.continue5)
              || isButtonEdge(img, profile.mp.continue6);
    
    // Various dialogs
    var errorleft = isSimilar(img, profile.mp.errorleft, 3);
    var errorright = isSimilar(img, profile.mp.errorright, 3);
    // club invite
    var clubleft = isButtonEdge(img, profile.mp.clubleft);
    var clubright = isButtonEdge(img, profile.mp.clubright);
    // league downgrade
    var downgradeLeft = isSimilar(img, profile.mp.leaguedownleft, 5);
    var downgradeRight = isSimilar(img, profile.mp.leaguedownright, 5);
    
    var isDialog = (errorleft && errorright) || (clubleft && clubright) || (downgradeLeft && downgradeRight);

    //PrintPixel(img, profile.mp.continue6);
    //PrintPixel(img, profile.mp.leaguedownleft);
    //PrintPixel(img, profile.mp.leaguedownright);
    //toastLog(downgradeLeft);
    //toastLog(downgradeRight);
    
    if (profile.traceOn) 
    {
        var txt = "";
        if (isToken)
			txt += "Token ";

		if (isCredit)
			txt += "Credit ";
        
        if (isBack)
            txt += "Back ";
        
        if (isGames)
            txt += "Game" + profile.networkGamesCount + " ";
       
        if (isPage3)
            txt += "Page3 ";
        
        if (isPage4)
            txt += "Page4 ";
            
        if (isRace)
            txt += "Race ";    
        
        if (isDialog)
            txt += "Dialog ";
                            
        toastLog(txt);
    }
    
    if (isDialog)
        state = "dialog";
        
    else if (isToken && isCredit && !isBack && !isStart && isGames && isPage4)
        state = "home";

    else if (isToken && isCredit && !isBack && !isPage4 && !isStart)
        state = "index";
    
    else if (isToken && isCredit && isBack && isStart)
        state = "start";
    
    else if (!isToken && !isCredit && !isBack && isRace)
        state = "race";
        
    else if (isNext && !isCredit && !isToken)
        state = "next";
    
        
    
    //else if (isClaim)
    //    state = 7;
    
    return state;
}

function hasFuel(level) {
    log('checkFuel(' + level + ')');
    
    //selectLeague(level);
    var cars = getLeagueCars(level);
    log(cars.length);
    
    // Looking for a car with gas
    for (let i = lastCar; i < cars.length; i++) {
        let n = cars[i];
		selectLeague(level);
        sleep(1000);
        log('car = ' + n);   
		swipes = parseInt( ( n - 1) / 2 );
        // slide left required number of times
		for(let j = 0; j < swipes; j++) {
		    let dur = 700;
		    let slp = 1000;
		    sleep(slp);
		    toast("<---");
		    robot.swipe(profile.garage.firstCar.x + profile.garage.distance.x, profile.garage.firstCar.y, profile.garage.firstCar.x, profile.garage.firstCar.y, dur);
		    sleep(slp);
		}
						  
        var carPoint = {
            x: profile.garage.firstCar.x,
            y: profile.garage.firstCar.y + profile.garage.distance.y * ((n - 1) % 2)
        }
        
        var img = captureScreen();
        var carcheckState = images.pixel(img, carPoint.x, carPoint.y);

        

        if (colors.equals(carcheckState, profile.garage.firstCar.colorFull)) {
            lastCar = i;
            robot.click( carPoint.x + profile.garage.distance.x / 2 , parseInt(carPoint.y - profile.garage.distance.y / 2 ));
            toastLog(level+"-car-("+n+")-has-fuel");
            return true;
        }
        else {
            lastCar = 0;
            //toastLog(colors.toString(carcheckState));
            toastLog(level+"-car-("+n+")-has-NO-fuel");
        }
    }        
    return false;
}

//from mp start screen
function getCurrentLeagueLevel()
{
	var league = images.pixel(captureScreen(), profile.garage.league.x, profile.garage.league.y);
	
	if (colors.isSimilar(league, profile.garage.league.colorBronze, 5, "diff"))
	{
		return 4;
	}
	if (colors.isSimilar(league, profile.garage.league.colorSilver, 5, "diff"))
	{
		return 3;
	}
	if (colors.isSimilar(league, profile.garage.league.colorGold, 5, "diff"))
	{
		return 2;
	}
    if (colors.isSimilar(league, profile.garage.league.colorPlatinum, 5, "diff"))
	{
		return 1;
	}
    if (colors.isSimilar(league, profile.garage.league.colorLegend, 5, "diff"))
	{
		return 0;
	}
	return 0;
}

function selectLeague(level)
{
    // Assign a value to cars[]
    if (level == 'legend'){
        robot.click(profile.garage.legend.x, profile.garage.legend.y);
    } else if (level == 'platinum'){
        robot.click(profile.garage.platinum.x, profile.garage.platinum.y);
    } else if (level == 'gold'){
        robot.click(profile.garage.gold.x, profile.garage.gold.y);
    } else if (level == 'silver'){
        robot.click(profile.garage.silver.x, profile.garage.silver.y);
    } else if (level == 'bronze'){
        robot.click(profile.garage.bronze.x, profile.garage.bronze.y);
    } 
}

function getLeagueCars(level)
{
    if (level == 'legend'){
        return carPick.legend;
    } else if (level == 'platinum'){
        return carPick.platinum;
    } else if (level == 'gold'){
        return carPick.gold;
    } else if (level == 'silver'){
        return carPick.silver;
    } else if (level == 'bronze'){
        return carPick.bronze;
    } 
}

function selectPage(num)
{
    var x = profile.common.pages.x + (num -1)*profile.common.pages.delta - 30; //427 + (num -1)*362 - 30;
    var y = profile.common.pages.y - 20; //1000;
    robot.click(x, y);
}

function isPage(img, num)
{
    var x = profile.common.pages.x + (num -1)*profile.common.pages.delta;//427 + (num -1)*362; 
    var bw = images.pixel(img, x, profile.common.pages.y); //1021
    var isBW = colors.equals(bw, profile.common.pages.light); //colors.equals(bw, "#ffffff");
    var bb = images.pixel(img, x - 10, profile.common.pages.y); //1011
    var isBB = colors.isSimilar(bb, profile.common.pages.dark, 3, "diff"); //colors.isSimilar(bb, "#15151d", 3, "diff");
    if (isBW && isBB)
    {
        return true;
    }
    return false;  
}
 
function isNetworkGames(img)
{
    if (profile.networkGamesCount == 2)
    {
        var isGame1 = isSimilar(img, profile.mp.game1of2, 5);
        var isGame2 = isSimilar(img, profile.mp.game2of2, 5);
        return isGame1 && isGame2;
    }
    
    return false;
}

function isSimilar(img, point, threshold)
{
    var pixel = images.pixel(img, point.x, point.y);
    return colors.isSimilar(pixel, point.color, threshold, "diff");
}

function isEquals(img, point)
{
    var pixel = images.pixel(img, point.x, point.y);
    return colors.equals(pixel, point.color);
}

function isButtonEdge(img, point)
{
    var pixel = images.pixel(img, point.x, point.y);
    var pixelOut = images.pixel(img, point.x-10, point.y-10);
    return colors.equals(pixel, point.color) && !colors.equals(pixelOut, point.color);
}

function PrintPixel(img, point)
{
    var txt = "x: " +  point.x + " y: " +  point.y;
    var color =  images.pixel(img, point.x, point.y);
    txt = txt + "\ncolor: " + colors.toString(color)
    toastLog(txt);
}

function PressNitro()
{
    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
}
