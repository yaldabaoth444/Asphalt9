"auto";
const robot = require('./robot.js');
const profile = require('./profile.js');

var startTime = new Date().getTime();
var timer = new Date().getTime();

var lastLevel = 0;
var routeRegion = [850, 150, 650, 160];

module.exports = {
    base : {
        click(x,y) {
            robot.click(x,y);
        },
        swipe(x1, y1, x2, y2, d){
            robot.swipe(x1, y1, x2, y2, d);
        }, 
        back() {
            robot.back();
        },
        pressNitro() {
            PressNitro();
        },
        restart()
        {
            Restart("Asphalt 9");
        },
        AdCloser()
        {
            return ImageClicker(profile.adCloserFolder);
        },
        AdCloser2()
        {
            return ImageClicker('./Images/AdCloser2/');
        },
        testParseNavigation()
        {
            log(parseNavigation(profile.ch.navigation));
        },
        testCarSpec()
        {
            var _img = captureScreen();
            var img = images.copy(_img);
            var currCarStar = GetCarStar(img);
            var currCarClass = GetCarClass(img);
            toastLog('Car: ' + currCarClass + currCarStar);
        }
    },
    //==========================================================================
    // Multiplayer
    mp: {
        goingHome(){
            log("goingHome");
            var Flag = false;
            var stacked = 0;
            var mpStatus = "";
            while (!Flag){
            
                mpStatus = mpCheckState();
                if (mpStatus != -1) 
                    timer = new Date().getTime();
                
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
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        break;
                    } 
                    
                    case "dialog": {
	              	    robot.back();
	                    sleep(2000);                           
                 		break;            
                    }   
                    
                    case "unknow": {
                        var now = new Date().getTime();
                        if ((now - timer) > 30000) {
                            Screenshot("blocked");
                            toastLog("(mp-gh)blocked!restart!" + mpCheckState(true));
                            timer = new Date().getTime();
                            if (!ImageClicker(profile.adCloserFolder))
                                robot.back();
                            sleep(2000);
                            stacked++;
                            if (stacked > 2)
                            {
                                stacked = 0;
                                Restart("Asphalt 9");
                            }
                        }
                    }        
                }
            }
        },   
        //----------------------------------------------------------------------
        beforeRun(option) {
            log("beforeRun");
            var tries = 0;
            var last = "";
            var Flag = false;
            var mpStatus = "";
            var stacked = 0;
            while (!Flag){

                mpStatus = mpCheckState();
                if (mpStatus != "unknow")
                    timer = new Date().getTime();

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
                log(mpStatus);
                switch(mpStatus){
                    case "home": {
                        if (tries > 2 && last == "home") {
                            if (option.game == 2) {
                                robot.click(profile.mp.game2of2.x, profile.mp.game2of2.y);
                            } 
                            if (option.game == 1) {
                                robot.click(profile.mp.game1of2.x, profile.mp.game1of2.y);
                            }
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "index": {
                        if (tries > 2 && last == "index") {
                            pressMarkerButton(profile.networkPage, profile.common.pagesMarker);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "start": {
                        if (tries > 2 && last == "start") {
                            //sleep(2000);
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
                    
                    case "unknow": {
                        var now = new Date().getTime();
                        if ((now - timer) > 300000) {
                            Screenshot("blocked");
                            toastLog("(mp-br)blocked!restart!" + mpCheckState(true));
                            timer = new Date().getTime();
                            if (!ImageClicker(profile.adCloserFolder))
                                robot.back();
                            sleep(2000);
                            stacked++;
                            if (stacked > 2)
                            {
                                stacked = 0;
                                Restart("Asphalt 9");
                            }
                        }
                    }
                }
                sleep(500);
             }
        },    
        //----------------------------------------------------------------------
        chooseCar(option) {
            log("chooseCar");
            if (1)
        	{
                lastLevel = getCurrentLeagueLevel();
	       	}
            robot.click(profile.mp.start.x, profile.mp.start.y);
            sleep(4000);

            if (option.carPickMode == "none")
            {
                // Check if car available fuel
                if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                {
                    log("chooseCar>> READY");
                    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                    return true;
                }
                return false;
            }
            
            if (option.carPickMode == "ordinary-abc")
            {
                var FOUND = false;

                for (let i = lastLevel; i < 5 && !FOUND; i++){
                    if (option.status[i]){
                        if (hasFuelABC(option.levelName[i], option.carPick)){
                            FOUND = true;
                        }
                    }
                }

                log("chooseCar>> FOUND = " + FOUND);            
                if (FOUND){
                    // Find a car with gas
                    sleep(4000);
                    
                    // Check if car available fuel
                    if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                    {
                        log("chooseCar>> READY");
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        return true;
                    }
                }
                toastLog("No fuel.");
                return false;   
            }

            return false;
        },
        //----------------------------------------------------------------------
        run(cnt, option) {
            log("run"); 
            var left = 0;
            var tries = 0;
            var runTime = new Date().getTime();
            var routeTime =  new Date().getTime();
            var nitroTime =  new Date().getTime();

            var nitroTick = 200;
            if (option.nitroTick != null)
                nitroTick = option.nitroTick;

            // Check if you have reached the checkout interface
            while (true) {
                var nowTime = new Date().getTime();
                if ((nowTime - runTime) > 250000) {
                    Screenshot("blocked");
                    toastLog("(mp-run)blocked!restart!" + mpCheckState(true));
                    if (!ImageClicker(profile.adCloserFolder))
                        robot.back();
	                sleep(2000);
                    break;
                }
                
                var mpStatus = mpCheckState();
                // exit conditions
                if (!(mpStatus == "unknow" || mpStatus == "race")) {
                    // waiting 3 times of no race condition
                    tries++;
                    if (tries > 2)
                    {
                        toastLog("mp-run exit with state = " + mpStatus);
                        break;
                    }
                }
                // If you have not finished running, you can still click on nitrogen
                else {
                    // reset accidental exit 
                    tries = 0;

                    if ((nowTime - nitroTime) > nitroTick)
                    {   
                        nitroTime = new Date().getTime();
                        PressNitro();
                    }
                    if (option.signSet && (nowTime - routeTime) > 3000)
                    {
                        var t = SignClicker(option.signSet, routeRegion);
                        if (t)
                            routeTime =  new Date().getTime();
                    }
                }
                sleep(950);
            }
            toastLog(++cnt.MP + " multiplayer done, t.avg " +parseInt((nowTime - startTime)/1000/cnt.MP)+" second.");
        },
        //----------------------------------------------------------------------
        test(option) {
            //var img = captureScreen();
            //toastLog(PrintPixel(img, profile.mp.game1of2));
            //toastLog(PrintPixel(img, profile.mp.game2of2));
            toastLog("mpCheckState " + mpCheckState(true));
        }
    },
    // CarHunt
    ch:{
        goingHome(){
            var tries = 0;
            var Flag = false;
            timer = new Date().getTime();
            while (!Flag){

                var chStatus = chCheckState();
                if (chStatus != "unknow")
                    timer = new Date().getTime();
                
                switch(chStatus){
                    case "home": {
                        Flag = true;
                        break;
                    }
                    
                    case "index": {
                        Flag = true;
                        break;
                    }
                    
                    case "start":
                    case "events":
                    case "hunt":
                    case "dialog": {
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
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        break;
                    } 
                    
                    case "unknow": {
                        var now = new Date().getTime();
                        if ((now - timer) > 15000) {
                            tries++;
                            Screenshot("ch-blocked");
                            toastLog("(ch-gh)blocked!restart!" + chCheckState(true));
                            timer = new Date().getTime();
                            // exclusive
                            if (tries > 3)
                            {
                                if (!ImageClicker(profile.adCloserFolder))
                                    robot.back();
    	                        sleep(2000);
                            }
                            
                        }                    
                    }
                }
                sleep(1000);
            }
        }, 
        //----------------------------------------------------------------------
        beforeRun(option) {
            var tries = 0;
            var last = "";
            var Flag = false;
            var chStatus = ""; 
            while (!Flag){
                
                chStatus = chCheckState();
                if (chStatus != "unknow")
                    timer = new Date().getTime();

                // count sequence of chStatus
                if (last == chStatus) {
                     tries++;
                } else {
                     tries = 1;
                     last = chStatus;
                }
                
                if (tries > 250) {
                    toastLog("go back by tries overflow for " + chStatus);
                    robot.back();
	                sleep(2000);
                    tries = 1;
                }
                
                switch(chStatus){
                    case "home": {
                        if (tries > 2 && last == "home") {
                            pressMarkerButton(profile.eventPage, profile.common.pagesMarker);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "index": {
                        if (tries > 2 && last == "index") {
                            pressMarkerButton(profile.eventPage, profile.common.pagesMarker);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "events": {
                        if (tries > 2 && last == "events") {
                            pressMarkerButton(option.carHuntPosition, profile.common.eventsMarker);
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
                    
                    case "unknow": {
                        var now = new Date().getTime();
                        if ((now - timer) > 300000) {
                            Screenshot("ch-blocked");
                            toastLog("(ch-br)blocked!restart!" + chCheckState(true));
                            timer = new Date().getTime();
                            if (!ImageClicker(profile.adCloserFolder))
                                robot.back();
    	                    sleep(2000);
                        }
                    }
                }
                sleep(500);
             }
        }, 
        //----------------------------------------------------------------------
        chooseCar(option) {
            robot.click(profile.ch.start.x, profile.ch.start.y);
            sleep(4000);

            if (option.carPickMode == "none")
            {
                // Check if car available fuel
                if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                {
                    log("chooseCar>> READY");
                    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                    return true;
                }
                return false;
            }            
            
            if (option.carPickMode == "up" || option.carPickMode == "down")
            {
                if (option.carPickMode == "up")
                    robot.click(profile.width/2, profile.garage.firstCar.y);
                else
                    robot.click(profile.width/2, profile.garage.firstCar.y + profile.garage.distance.y);
                sleep(2000);
                
                if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                {
                    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                    return true;
                }
    
                toastLog("\nNo fuel.");
                base.back();
                sleep(1500);
                base.back();
                sleep(1500);
            }
            
            if (option.carPickMode == "flat-abc")
            {
                var FOUND = hasFuelFlatABC(option.carPick);

                log("chooseCar>> FOUND = " + FOUND);            
                if (FOUND){
                    // Find a car with gas
                    sleep(4000);
                    
                    // Check if car available fuel
                    if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                    {
                        log("chooseCar>> READY");
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        return true;
                    }
                }
                toastLog("No fuel.");
                return false;   
            }


            return false;
        },  
        //----------------------------------------------------------------------
        run(cnt, option) {
                        
            var runTime = new Date().getTime();
            var tries = 0;
            var brkc = 4;
            var chStatus = "";
            var routeTime =  new Date().getTime();
            var nitroTime =  new Date().getTime();
            var raceStart = false;
            var raceTime =  null;

            //check nav data
            var route = null;
            if (option.navigation != null)
                route = parseNavigation(option.navigation);
            
            var nitroTick = 200;
            if (option.nitroTick != null)
                nitroTick = option.nitroTick;

            var currentRoute = option.signSet;

            // Check if you have reached the checkout interface
            while (true) {
                var nowTime = new Date().getTime();
                if ((nowTime - runTime) > 240000) {
                    Screenshot("ch-blocked");
                    toastLog("(ch-run)blocked!restart!" + chCheckState(true));
                    robot.back();
	                sleep(2000);
                    robot.back();
	                sleep(2000);
                    robot.back();
	                sleep(2000);
                    break;
                }
                
                chStatus = chCheckState();
                // exit conditions
                if (!(chStatus == "unknow" || chStatus == "race")) {
                    // waiting 3 times of no race condition
                    tries++;
                    if (tries > 2)
                    {
                        toastLog("mp-run exit with state = " + chStatus);
                        if (chStatus == "dialog")
                        {
                            robot.back();
	                        sleep(2000);
                            robot.back();
	                        sleep(2000);
                            robot.back();
	                        sleep(2000);
                        }
                        break;
                    }
                }
                // If you have not finished running, you can still click on nitrogen
                else {
                    if (!raceStart && chStatus == "race")
                    {
                        raceStart = true;
                        raceTime =  new Date().getTime();
                    }
                    // reset accidental exit 
                    tries = 0;
                    /*brkc--;
                    if (brkc < 0)
                    {
                        brkc = 2;
                        PressBrake();
                    }*/
                    if (raceStart && route != null)
                    {
                        for (let i = 0; i < route.length; i++) {
                            let item = route[i];
                            if (!item.fire && (nowTime-raceTime) > item.time)
                            {
                                item.fire = true;

                                if (item.type == "drift")
                                    PressBrake(item.dur);

                                if (item.type == "drift-flash")
                                {
                                    PressBrake(item.dur);
                                    sleep(50);
                                    PressNitro();
                                    PressNitro();
                                }

                                if (item.type == "normal-nitro")
                                {
                                    PressNitro();
                                }

                                if (item.type == "perfect-nitro")
                                {
                                    PressNitro();
                                    sleep(750);
                                    PressNitro();
                                }

                                if (item.type == "double-nitro")
                                {
                                    PressNitro();
                                    sleep(300);
                                    PressNitro();
                                }

                                if (item.type == "flash")
                                {
                                    PressNitro();
                                    PressNitro();
                                }

                                if (item.type == "360")
                                {
                                    PressBrake();
                                    PressBrake();
                                }

                                if (item.type == "360-flash")
                                {
                                    PressBrake();
                                    PressBrake();
                                    sleep(50);
                                    PressNitro();
                                    PressNitro();
                                }

                                if (item.type == "route")
                                    currentRoute = item.path
                            }
                        }
                    }

                    if ((nowTime - nitroTime) > nitroTick)
                    {   
                        nitroTime = new Date().getTime();
                        PressNitro();
                    }
                    if (currentRoute && (nowTime - routeTime) > 2000)
                    {
                        var t = SignClicker(currentRoute, routeRegion);
                        if (t)
                        {
                            routeTime =  new Date().getTime();
                        }
                    }    
                }
                sleep(100);
            }
            toastLog(++cnt.CH + " car hunt done, t.avg" +parseInt((nowTime - startTime)/1000/cnt.CH)+" second.");
        },
        //----------------------------------------------------------------------   
        test(option) {
            //toastLog("chCheckState " + chCheckState());
            //var img = captureScreen();
            //toastLog(PrintPixel(img, {x: 2130, y: 81, color: "#39393b"}));
            toastLog("chCheckState " + chCheckState(true) + ' = ' + chCheckState());
        },
        //----------------------------------------------------------------------  
        state()
        {   
            return chCheckState();
        }
    },
    // CarHunt
    chse:{
        goingHome(){
            var tries = 0;
            var Flag = false;
            timer = new Date().getTime();
            while (!Flag){

                var chStatus = chseCheckState();
                if (chStatus != "unknow")
                    timer = new Date().getTime();
                
                switch(chStatus){

                    case "home": 
                    case "index":
                    case "events":{
                        Flag = true;
                        break;
                    }
                    
                    case "start":
                    case "hunt":
                    case "dialog": {
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
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        break;
                    } 
                    
                    case "unknow": {
                        var now = new Date().getTime();
                        if ((now - timer) > 15000) {
                            tries++;
                            Screenshot("ch-blocked");
                            toastLog("(ch-gh)blocked!restart!" + chseCheckState(true));
                            timer = new Date().getTime();
                            // exclusive
                            if (tries > 3)
                            {
                                if (!ImageClicker(profile.adCloserFolder))
                                    robot.back();
                                sleep(2000);
                            }
                            
                        }                    
                    }
                }
                sleep(1000);
            }
        }, 
        //----------------------------------------------------------------------
        beforeRun() {
            var tries = 0;
            var last = "";
            var Flag = false;
            var chStatus = ""; 
            while (!Flag){
                
                chStatus = chseCheckState();
                if (chStatus != "unknow")
                    timer = new Date().getTime();

                // count sequence of chStatus
                if (last == chStatus) {
                     tries++;
                } else {
                     tries = 1;
                     last = chStatus;
                }
                
                if (tries > 250) {
                    toastLog("go back by tries overflow for " + chStatus);
                    robot.back();
                    sleep(2000);
                    tries = 1;
                }
                
                switch(chStatus){
                    case "home": {
                        if (tries > 2 && last == "home") {
                            //robot.click(profile.ch.specialSelector.x, profile.ch.specialSelector.y);
                            var pos = FindImage('./Images/Interface/', 'hunt-small.png');
                            if (pos)
                               robot.click(pos.x, pos.y);
                            else   
                                robot.swipe(300, 500, 300, 250, 800);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "index": {
                        if (tries > 2 && last == "index") {
                            pressMarkerButton(profile.specialPage, profile.common.pagesMarker);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "events": {
                        if (tries > 2 && last == "events") {
                            robot.click(profile.ch.specialStart.x, profile.ch.specialStart.y);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "hunt": {
                        if (tries > 2 && last == "hunt") {
                            robot.click(profile.ch.specialHunt.x, profile.ch.specialHunt.y);
                            sleep(2000);
                        }
                        break;
                    }
                    
                    case "start": {
                        if (tries > 2 && last == "start") {
                            //sleep(2000);
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
                    
                    case "unknow": {
                        var now = new Date().getTime();
                        if ((now - timer) > 300000) {
                            Screenshot("ch-blocked");
                            toastLog("(ch-br)blocked!restart!" + chseCheckState(true));
                            timer = new Date().getTime();
                            if (!ImageClicker(profile.adCloserFolder))
                                robot.back();
                            sleep(2000);
                        }
                    }
                }
                sleep(500);
             }
        }, 
        chooseCar(option) {
            robot.click(profile.ch.specialNext.x, profile.ch.specialNext.y);
            sleep(4000);
            
            if (option.carPickMode == "up" || option.carPickMode == "down")
            {
                if (option.carPickMode == "up")
                    robot.click(profile.width/2, profile.garage.firstCar.y);
                else
                    robot.click(profile.width/2, profile.garage.firstCar.y + profile.garage.distance.y);
                sleep(2000);
                
                if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                {
                    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                    return true;
                }
    
                toastLog("\nNo fuel.");
                base.back();
                sleep(1500);
                base.back();
                sleep(1500);
            }
            
            if (option.carPickMode == "flat-abc")
            {
                var FOUND = hasFuelFlatABC(option.carPick);

                log("chooseCar>> FOUND = " + FOUND);            
                if (FOUND){
                    // Find a car with gas
                    sleep(4000);
                    
                    // Check if car available fuel
                    if (IsFlashingButton(profile.garage.start, 7) || IsFlashingButton(profile.garage.istart, 7))
                    {
                        log("chooseCar>> READY");
                        robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
                        return true;
                    }
                }
                toastLog("No fuel.");
                return false;   
            }
            return false;
        },  
        //----------------------------------------------------------------------
        run(cnt, option) {
                        
            var runTime = new Date().getTime();
            var tries = 0;
            var brkc = 4;
            var chStatus = "";
            var routeTime =  new Date().getTime();
            var nitroTime =  new  Date().getTime();
            var raceStart  = false;
            var raceTime =   null;
 
            //check nav data 
             var route = null;
            if (option.navigation != null)
                route = parseNavigation(option.navigation);
            
            var nitroTick = 200;
            if (option.nitroTick != null)
                nitroTick = option.nitroTick;

            var currentRoute = option.signSet;

            // Check if you have reached the checkout interface
            while (true) {
                var nowTime = new Date().getTime();
                if ((nowTime - runTime) > 240000) {
                    Screenshot("ch-blocked");
                    toastLog("(ch-run)blocked!restart!" + chseCheckState(true));
                    robot.back();
                    sleep(2000);
                    robot.back();
                    sleep(2000);
                    robot.back();
                    sleep(2000);
                    break;
                }
                
                chStatus = chseCheckState();
                // exit conditions
                if (!(chStatus == "unknow" || chStatus == "race")) {
                    // waiting 3 times of no race condition
                    tries++;
                    if (tries > 2)
                    {
                        toastLog("mp-run exit with state = " + chStatus);
                        if (chStatus == "dialog")
                        {
                            robot.back();
                            sleep(2000);
                            robot.back();
                            sleep(2000);
                            robot.back();
                            sleep(2000);
                        }
                        break;
                    }
                }
                // If you have not finished running, you can still click on nitrogen
                else {
                    if (!raceStart && chStatus == "race")
                    {
                        raceStart = true;
                        raceTime =  new Date().getTime();
                    }
                    // reset accidental exit 
                    tries = 0;
                    /*brkc--;
                    if (brkc < 0)
                    {
                        brkc = 2;
                        PressBrake();
                    }*/
                    if (raceStart && route != null)
                    {
                        for (let i = 0; i < route.length; i++) {
                            let item = route[i];
                            if (!item.fire && (nowTime-raceTime) > item.time)
                            {
                                item.fire = true;

                                if (item.type == "drift")
                                    PressBrake(item.dur);

                                if (item.type == "drift-flash")
                                {
                                    PressBrake(item.dur);
                                    sleep(50);
                                    PressNitro();
                                    PressNitro();
                    }

                                if (item.type == "normal-nitro")
                                {
                                    PressNitro();
                                }

                                if (item.type == "perfect-nitro")
                                {
                                    PressNitro();
                                    sleep(750);
                                    PressNitro();
                                }

                                if (item.type == "double-nitro")
                                {
                                    PressNitro();
                                    sleep(300);
                                    PressNitro();
                                }

                                if (item.type == "flash")
                                {
                                    PressNitro();
                    PressNitro();
                                }

                                if (item.type == "360")
                                {
                                    PressBrake();
                                    PressBrake();
                    }

                                if (item.type == "360-flash")
                                {
                                    PressBrake();
                                    PressBrake();
                                    sleep(50);
                                    PressNitro();
                    PressNitro();
                                }

                                if (item.type == "route")
                                    currentRoute = item.path
                            }
                        }
                    }

                    if ((nowTime - nitroTime) > nitroTick)
                    {
                        nitroTime = new Date().getTime();
                        PressNitro();
                    }
                    if (currentRoute && (nowTime - routeTime) > 2000)
                    {
                        var t = SignClicker(currentRoute, routeRegion);
                        if (t)
                        {
                            routeTime =  new Date().getTime();
                    }
                }
                }
                sleep(100);
            }
            toastLog(++cnt.CH + " car hunt done, t.avg" +parseInt((nowTime - startTime)/1000/cnt.CH)+" second.");
        },
        //----------------------------------------------------------------------   
        test(option) {
            toastLog("chCheckState " + chseCheckState());
            //var img = captureScreen();
            //toastLog(PrintPixel(img, {x: 2130, y: 81, color: "#39393b"}));
        },
        state()
        {   
            return chseCheckState();
        }
    }
}
//------
function mpCheckState(debug) 
{

    var state = "unknow";

    var _img = captureScreen();
    var img = images.copy(_img);
    
    var isToken = isEquals(img, profile.common.token);
    var isCredit = isEquals(img, profile.common.credit);
    
    // Back button
    var isBack = isSimilar(img, profile.common.back, 5) && isSimilar(img, profile.common.backward, 5);
    
    // Multiplayer start button
    var start = images.pixel(img, profile.mp.start.x, profile.mp.start.y);
    var isStart =  
         isButtonEdge(img, profile.mp.reward) && 
         isButtonEdge(img, profile.mp.rate) && 
         isButtonEdge(img, profile.mp.stage);
    
    var isGames = isNetworkGames(img);
   
    var isNetworkPage = isMarker(img, profile.networkPage, profile.common.pagesMarker);
   
    var racePause = isSimilar(img, profile.common.racePause, 3);
    var raceTD = isSimilar(img, profile.common.raceTD, 5);
    var raceTime = isSimilar(img, profile.common.raceTime, 20);
    var isRace = racePause && raceTD && raceTime; 
    
    // Continue button
    var isNext = isButtonEdge(img, profile.mp.continue1, true) 
              || isButtonEdge(img, profile.mp.continue2, true) 
              || isButtonEdge(img, profile.mp.continue3, true)
              || isButtonEdge(img, profile.mp.continue4, true)
              || isButtonEdge(img, profile.mp.continue5, true)
              || isButtonEdge(img, profile.mp.continue6, true);
    
    // Various dialogs
    var errorleft = isSimilar(img, profile.mp.errorleft, 3);
    var errorright = isSimilar(img, profile.mp.errorright, 3);
    // club invite
    var clubleft = isButtonEdge(img, profile.mp.clubleft);
    var clubright = isButtonEdge(img, profile.mp.clubright);
    // league downgrade
    var downgradeLeft = isSimilar(img, profile.mp.leaguedownleft, 5);
    var downgradeRight = isSimilar(img, profile.mp.leaguedownright, 5);
    // network error
    var networkErrorLeft = isSimilar(img, profile.mp.networkErrorLeft, 3);
    var networkErrorRight = isSimilar(img, profile.mp.networkErrorRight, 3);

    var isDialog = (errorleft && errorright) || (clubleft && clubright) || (downgradeLeft && downgradeRight) || (networkErrorLeft && networkErrorRight);

    if (debug) 
    {
        var txt = "";
        
        if (isToken) txt += "Token ";
    	if (isCredit) txt += "Credit ";
        if (isBack) txt += "Back ";
        if (isGames) txt += "Game" + profile.networkGamesCount + " ";
        if (isNetworkPage) txt += "Network ";
        if (isStart) txt += "Start ";
        if (isRace) txt += "Race ";    
        if (isDialog) txt += "Dialog ";
        
        return txt;    
    }
    
    if (isDialog)
        state = "dialog";
        
    else if (isToken && isCredit && !isBack && !isStart && /*isGames &&*/ isNetworkPage)
        state = "home";

    else if (isToken && isCredit && !isBack && !isNetworkPage && !isStart)
        state = "index";
    
    else if (isToken && isCredit && isBack && isStart)
        state = "start";
    
    else if (!isToken && !isCredit && !isBack && isRace)
        state = "race";
        
    else if (isNext && !isCredit && !isToken)
        state = "next";

    return state;
}
//------
function chCheckState(debug) 
{

    var state = "unknow";

    var _img = captureScreen();
    var img = images.copy(_img);
    
    var isToken = isEquals(img, profile.common.token);
    var isCredit = isEquals(img, profile.common.credit);
    
    // Back button
    var isBack = isSimilar(img, profile.common.back, 5) && isSimilar(img, profile.common.backward, 5);
    
    var pageSelected = getMarker(img, profile.common.pagesMarker);
    var isEventPage = pageSelected == profile.eventPage;
    
    var eventSelected = getMarker(img, profile.common.eventsMarker);
    //var isEventHome = eventSelected == 1;
    //var isCarHunt = eventSelected == profile.carHuntPosition;
    
    // carhunt start button
    // /var start = images.pixel(img, profile.ch.start.x, profile.ch.start.y);
    var isStart = isEquals(img, profile.ch.start);
     
    var racePause = isSimilar(img, profile.common.racePause, 3);
    var raceTD = isSimilar(img, profile.common.raceTD, 3);
    var raceTime = isSimilar(img, profile.common.raceTime, 20);
    var isRace = racePause && raceTD && raceTime; 
    
    // Continue button
    var isNext = isButtonEdge(img, profile.mp.continue1, true) 
              || isButtonEdge(img, profile.mp.continue2, true) 
              || isButtonEdge(img, profile.mp.continue3, true)
              || isButtonEdge(img, profile.mp.continue4, true)
              || isButtonEdge(img, profile.mp.continue5, true)
              || isButtonEdge(img, profile.mp.continue6, true);
              
    // Various dialogs
    var errorleft = isSimilar(img, profile.mp.errorleft, 3);
    var errorright = isSimilar(img, profile.mp.errorright, 3);
    
    var noTicketLeft = isSimilar(img, profile.ch.noTicketLeft, 3);
    var noTicketRight = isSimilar(img, profile.ch.noTicketRight, 3);
    
    var isDialog = (errorleft && errorright) || (noTicketLeft && noTicketRight) ;

    if (debug) 
    {
        var txt = "";
        if (isBack) txt += "Back ";
        if (isToken) txt += "Token ";
		if (isCredit) txt += "Credit ";
           
        txt += "Page" + pageSelected + " ";
        txt += "Event" + eventSelected + " ";
        
        if (isStart) txt += "Start ";
        if (isRace) txt += "Race ";    
        if (isDialog) txt += "Dialog ";
        if (isNext) txt += " Next ";

        return txt;
    }
    
    if (isDialog)
        state = "dialog";
        
    else if (isToken && isCredit && !isBack && isEventPage)
        state = "home";

    else if (isToken && isCredit && !isBack && !isEventPage)
        state = "index";
    
    else if (isToken && isCredit && isBack && (eventSelected != 0) && !isStart)
        state = "events";
    
    //else if (isToken && isCredit && isBack && (pageSelected == 0) && isCarHunt && !isStart)
    //    state = "hunt";

    else if (isToken && isCredit && isBack && (pageSelected == 0) && (eventSelected == 0) && isStart)
        state = "start";
                
    else if (!isToken && !isCredit && !isBack && isRace)
        state = "race";
        
    else if (isNext && !isCredit && !isToken)
        state = "next";

    return state;              
}
//------
function chseCheckState(debug) 
{

    var state = "unknow";

    var _img = captureScreen();
    var img = images.copy(_img);
    
    var isToken = isEquals(img, profile.common.token);
    var isCredit = isEquals(img, profile.common.credit);
    
    // Back button
    var isBack = isSimilar(img, profile.common.back, 5) && isSimilar(img, profile.common.backward, 5);
    
    var pageSelected = getMarker(img, profile.common.pagesMarker);
    var isSpecialPage = (pageSelected == profile.specialPage);
    
    var isEventHome = isEquals(img, profile.ch.specialSelector);
    //var isEventSelected = isEquals(img, profile.ch.specialSelected);
    var isCarHunt = isEquals(img, profile.ch.specialHunt);

    // carhunt start button
    var start = images.pixel(img, profile.ch.specialNext.x, profile.ch.specialNext.y);
    var isStart = isEquals(img, profile.ch.specialNext);
     
    var racePause = isSimilar(img, profile.common.racePause, 3);
    var raceTD = isSimilar(img, profile.common.raceTD, 3);
    var raceTime = isSimilar(img, profile.common.raceTime, 20);
    var isRace = racePause && raceTD && raceTime; 
    
    // Continue button
    var isNext = isButtonEdge(img, profile.mp.continue1, true) 
              || isButtonEdge(img, profile.mp.continue2, true) 
              || isButtonEdge(img, profile.mp.continue3, true)
              || isButtonEdge(img, profile.mp.continue4, true)
              || isButtonEdge(img, profile.mp.continue5, true)
              || isButtonEdge(img, profile.mp.continue6, true);
              
    // Various dialogs
    var errorleft = isSimilar(img, profile.mp.errorleft, 3);
    var errorright = isSimilar(img, profile.mp.errorright, 3);
    
    var noTicketLeft = isSimilar(img, profile.ch.noTicketLeft, 3);
    var noTicketRight = isSimilar(img, profile.ch.noTicketRight, 3);
    
    var isDialog = (errorleft && errorright) || (noTicketLeft && noTicketRight) ;

    if (debug) 
    {
        var txt = "";
        if (isToken)
            txt += "Token ";

        if (isCredit)
            txt += "Credit ";
        
        if (isBack)
            txt += "Back ";
        
        txt += "Page" + pageSelected + " ";
        //txt += "Event" + eventSelected + " ";
        txt += "spec = " + isSpecialPage + " ";
        if (isStart)
            txt += "Start ";
                
        if (isRace)
            txt += "Race ";    
        
        if (isDialog)
            txt += "Dialog ";
                            
        return txt;
    }
    
    if (isDialog)
        state = "dialog";
        
    else if (isToken && isCredit && !isBack && isSpecialPage /*&& !isEventSelected*/)
        state = "home";

    else if (isToken && isCredit && !isBack && !isSpecialPage)
        state = "index";
    
    else if (isToken && isCredit && !isBack && isSpecialPage /*&& isEventSelected*/ && !isCarHunt)
        state = "events";
    
    else if (isToken && isCredit && isBack && isCarHunt)
        state = "hunt";

    else if (isToken && isCredit && isBack && isStart)
        state = "start";
                
    else if (!isToken && !isCredit && !isBack && isRace)
        state = "race";
        
    else if (isNext && !isCredit && !isToken)
        state = "next";

    return state;              
}
//------
function hasFuelABC(level, cars)
{
    log('checkFuel(' + level + ')');
    selectNextLeague(level);
    sleep(1000);
    var cars = getLeagueCars(level, cars);
    var startTime = new Date().getTime();

    //last bottom car
    log('click last bottom car');
    robot.click( 1050, 800);
    sleep(2000);

    nowTime = new Date().getTime();
    while((nowTime - startTime) < (2*60000)) {
        nowTime = new Date().getTime();

        var _img = captureScreen();
        var img = images.copy(_img);

        if (CarCanGo(img))
        {    
            var currCarStar = GetCarStar(img);
            var currCarClass = GetCarClass(img);

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
        //prev car
        robot.click( 818, 538);
        sleep(profile.garage.switchSpeed);
    }        
    return false;
}
function hasFuelFlatABC(cars)
{
    log('checkFuel(Flat-ABC)');
    //selectNextLeague(level);
    //sleep(1000);
    //var cars = getLeagueCars(level, cars);
    var startTime = new Date().getTime();

    //last bottom car
    log('click last bottom car');
    //robot.click( 1000, 800);
    robot.click( 900, 800)
    sleep(2000);

    nowTime = new Date().getTime();
    while((nowTime - startTime) < (2*60000)) {
        nowTime = new Date().getTime();

        var _img = captureScreen();
        var img = images.copy(_img);

        if (CarCanGo(img))
        {    
            var currCarStar = GetCarStar(img);
            var currCarClass = GetCarClass(img);

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
        //prev car
        robot.click( 818, 538);
        sleep(profile.garage.switchSpeed);
    }        
    return false;
}
//------
function CarCanGo(img)
{
    return isSimilar(img, profile.garage.canGo1, 3) && !(isEquals(img, profile.garage.cantGo1) || isEquals(img, profile.garage.cantGo2));;
}
//------
function GetCarStar(img)
{
    var currStar = 0;

    if (isSimilar(img, profile.garage.star6, 3))
        currStar = 6;
    else if (isSimilar(img, profile.garage.star5, 3))
        currStar = 5;
    else if (isSimilar(img, profile.garage.star4, 3))
        currStar = 4;
    else if (isSimilar(img, profile.garage.star3, 3))
        currStar = 3;
    else if (isSimilar(img, profile.garage.star2, 3))
        currStar = 2;
    else if (isSimilar(img, profile.garage.star1, 3))
        currStar = 1;
    return currStar;
}
//------
function GetCarClass(img)
{
    var _img = captureScreen();
    var img = images.copy(_img);
    var currClass = 'D';

    if (isSimilar(img, profile.garage.isClassA, 5))
    {    
        currClass = 'A';
    }
    else if (isSimilar(img, profile.garage.isClassBS, 5))
    {
        if (isSimilar(img, profile.garage.isClassB, 5))
            currClass = 'B';    
        else
            currClass = 'S'; 
    }
    else 
    {
        if (isSimilar(img, profile.garage.isClassD, 5))
            currClass = 'D';    
        else
            currClass = 'C'; 
    }
    return currClass;
}
//------
//from mp start screen
function getCurrentLeagueLevel()
{
	var league = images.pixel(captureScreen(), profile.garage.league.x, profile.garage.league.y);
	
    if (colors.isSimilar(league, profile.garage.league.colorUnranked, 5, "diff"))
	{
		return 4;
	}
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
//------
function selectNextLeague(level)
{
    // Assign a value to cars[]
    if (level == 'legend'){
        log('click legend league');
        robot.click(profile.garage.legend.x, profile.garage.legend.y);
    } else if (level == 'platinum'){
        log('click legend league');
        robot.click(profile.garage.legend.x, profile.garage.legend.y);
    } else if (level == 'gold'){
        log('click platinum league');
        robot.click(profile.garage.platinum.x, profile.garage.platinum.y);
    } else if (level == 'silver'){
        log('click gold league');
        robot.click(profile.garage.gold.x, profile.garage.gold.y);
    } else if (level == 'bronze'){
        log('click silver league');
        robot.click(profile.garage.silver.x, profile.garage.silver.y);
    } else {
        log('click silver league');
        robot.click(profile.garage.silver.x, profile.garage.silver.y);
    }
}
//------
function getLeagueCars(level, cars)
{
    if (level == 'legend'){
        return cars.legend;
    } else if (level == 'platinum'){
        return cars.platinum;
    } else if (level == 'gold'){
        return cars.gold;
    } else if (level == 'silver'){
        return cars.silver;
    } else if (level == 'bronze'){
        return cars.bronze;
    } 
}
//------
function pressMarkerButton(num, data)
{
    var mrkY = data.y + data.pressYOffset; 
    //log('pressMarkerButton ' + num)
    if (num > 0)
    {
        if (num > 8)
        {
            var swipes = num - 8;
            // slide left required number of times
            for(let j = 0; j < swipes; j++) {
                sleep(500);
                toast("<---");
                robot.swipe(1000, mrkY, 1000 - (data.delta + profile.garage.distance.inertia), mrkY, 510);
                sleep(500);
            }

            var x = data.x + (num - 1 - swipes)*data.delta + data.pressXOffset;
            var y = data.y + data.pressYOffset;
            //toastLog("x: " + x + " y: " + y);
            robot.click(x, y);
            sleep(2500);
            robot.click(x, y);
        }
        else
        {
            var x = data.x + (num -1)*data.delta + data.pressXOffset;
            var y = data.y + data.pressYOffset;
            //toastLog("x: " + x + " y: " + y);
            robot.click(x, y);
            sleep(2500);
            robot.click(x, y);
        }
    } else {
        
        for(let j = 0; j < 5; j++) {
            robot.swipe(2000, mrkY, 500, mrkY, 400);
             sleep(500);
        }
        sleep(1500); 
        var x = profile.width - data.x - (-1*num -1)*data.delta + data.pressXOffset;
        var y = data.y + data.pressYOffset;
        toastLog("x: " + x + " y: " + y);
        robot.click(x, y);
        sleep(2500);
        robot.click(x, y);
    }
}
//------
function getMarker(img, data)
{
    for ( let i = 1; i <= 6; i++ )
    { 
        if (isMarker(img, i, data))
        {
            return i;
        }
    }
    return 0;
}
//------
function isMarker(img, num, data)
{
    var x = data.x + (num -1)*data.delta; 
    var p = images.pixel(img, x, data.y);
    //return colors.equals(p, data.color);
    return colors.isSimilar(p, data.color, 6, "diff");
}
//------
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
//------
function isSimilar(img, point, threshold)
{
    var pixel = images.pixel(img, point.x, point.y);
    return colors.isSimilar(pixel, point.color, threshold, "diff");
}
//------
function isEquals(img, point)
{
    var pixel = images.pixel(img, point.x, point.y);
    return colors.equals(pixel, point.color);
}
//------
function isButtonEdge(img, point, debug)
{
    var pixel = images.pixel(img, point.x, point.y);
    var pixelOut = images.pixel(img, point.x-10, point.y-10);
    if (debug){
        PrintPixel(img, point);
    }
    return colors.equals(pixel, point.color) && !colors.equals(pixelOut, point.color);
}
//------
function IsFlashingButton(point, timeoutSec)
{
    var runTime = new Date().getTime();            
    var tries = 0;
    while (true) {
        var nowTime = new Date().getTime();
        if ((nowTime - runTime) > timeoutSec * 1000) {
            break;
        }
        // Check if car available fuel
        var _img = captureScreen();
        var img = images.copy(_img);
        if (isSimilar(img, point, 10))
            tries++;

        if (tries > 2)
            return true;

        sleep(111);
    }
    return false;    
}
//------
function ImageFinder(folder, region)
{
    //var folder = profile.adCloserFolder;
    if (!folder)
        return false;
    var list = files.listDir(folder);
    var len = list.length;
    if(len > 0){
        var _img = captureScreen();
        var imgad = images.copy(_img);
        for(let i = 0; i < len; i++){
            var fileName = list[i];
            if (fileName.toLowerCase().endsWith(".png") || fileName.toLowerCase().endsWith(".jpg"))
            {
                var templatePath = files.join(folder, fileName);
                var template = images.read(templatePath);
                var pos = null;
                if (region)
                    pos = images.findImage(imgad, template, {threshold:0.85, region: region});
                else
                    pos = images.findImage(imgad, template, {threshold:0.85});    
                width = template.getWidth();
                height = template.getHeight();
                template.recycle();
                if(pos){
                    imgad.recycle();
                    return true
                }  
            }
        }
        imgad.recycle();
    }
    return false
}
//------
function SignClicker(filter, region)
{
    //var folder = profile.adCloserFolder;
    if (!filter)
        return false;

    let folder = profile.signsFolder;

    var list = filter.split(',');;
    var len = list.length;
    if(len > 0){
        var _img = captureScreen();
        var imgad = images.copy(_img);
        for(let i = 0; i < len; i++){
            var fileName = files.join(folder, list[i].trim()+'.png');
            //log(fileName);
            var sign = images.read(fileName);
            var pos = null;
            if (region)
                pos = images.findImage(imgad, sign, {threshold:0.8, region: region});
            else
                pos = images.findImage(imgad, sign, {threshold:0.8});    
            width = sign.getWidth();
            height = sign.getHeight();
            sign.recycle();
            if(pos){

                var middle = {
                    x: Math.round(pos.x + width/2), 
                    y: Math.round(pos.y + height/2)
                };
                robot.click(middle.x, middle.y);
                //log('Click button ' + fileName + ' ' + middle.x + ', ' +  middle.y)
                //sleep(2000)
                return true;
            }  

        }
        imgad.recycle();
    }
    return false
}
//------
function ImageClicker(folder, region)
{
    //var folder = profile.adCloserFolder;
    if (!folder)
        return false;
    var list = files.listDir(folder);
    var len = list.length;
    if(len > 0){
        var _img = captureScreen();
        var imgad = images.copy(_img);
        for(let i = 0; i < len; i++){
            var fileName = list[i];
            if (fileName.toLowerCase().endsWith(".png") || fileName.toLowerCase().endsWith(".jpg"))
            {
                var templatePath = files.join(folder, fileName);
                var template = images.read(templatePath);
                var pos = null;
                if (region)
                    pos = images.findImage(imgad, template, {threshold:0.8, region: region});
                else
                    pos = images.findImage(imgad, template, {threshold:0.8});    
                width = template.getWidth();
                height = template.getHeight();
                template.recycle();
                if(pos){

                    var middle = {
                        x: Math.round(pos.x + width/2), 
                        y: Math.round(pos.y + height/2)
                    };
                    robot.click(middle.x, middle.y);
                    log('Click button ' + fileName + ' ' + middle.x + ', ' +  middle.y)
                    //sleep(2000)
                    return true
                }  
            }
        }
        imgad.recycle();
    }
    return false
}
//------
function FindImage(folder, fileName, region)
{
    if (!folder)
        return null;
    var path = files.join(folder, fileName);
    if (!files.isFile(path))
        return null;
    var _img = captureScreen();
    var imgad = images.copy(_img);
    var template = images.read(path);
    var pos = null;
    if (region)
        pos = images.findImage(imgad, template, {threshold:0.8, region: region});
    else
        pos = images.findImage(imgad, template, {threshold:0.8});    
    width = template.getWidth();
    height = template.getHeight();
    template.recycle();
    if(pos){

        var middle = {
            x: Math.round(pos.x + width/2), 
            y: Math.round(pos.y + height/2)
        };
        return middle;
    } 
    return null;
}
//------
function PrintPixel(img, point)
{
    var txt = "x: " +  point.x + " y: " +  point.y;
    var color =  images.pixel(img, point.x, point.y);
    return txt + "\ncolor: " + colors.toString(color);
}
//------
function Screenshot(name)
{
    var fn = name || "screencapture";
    // Save to storage
    var time = new Date().getTime();
    var img = captureScreen("/storage/emulated/0/DCIM/Screenshots/"+fn+"-"+time+".png");
}
//------
function PressNitro()
{
    robot.click(profile.mp.goldenPoint.x, profile.mp.goldenPoint.y);
}
//------
function PressBrake(duration) 
{
    if (duration > 0) {
        robot.press(profile.width * 1 / 5, profile.height / 2, duration);
    } else {
        robot.click(profile.width * 1 / 5, profile.height / 2);
    }
}
//------
function parseNavigation(nav)
{
    var res = [];
    if (nav != null)
    {
        for (let i = 0; i < nav.length; i++) {
            let navParams = nav[i].split('|');
            if (navParams[1] == "drift")
            {
                res.push({
                    fire: false, 
                    type:"drift", 
                    time: parseInt(navParams[0], 10), 
                    dur: parseInt(navParams[2], 10)});
            }
            if (navParams[1] == "drift-flash")
            {
                res.push({
                    fire: false, 
                    type:"drift-flash", 
                    time: parseInt(navParams[0], 10), 
                    dur: parseInt(navParams[2], 10)});
            }
            if (navParams[1] == "normal-nitro")
            {
                res.push({
                    fire: false, 
                    type:"normal-nitro", 
                    time: parseInt(navParams[0], 10)});
            }
            if (navParams[1] == "perfect-nitro")
            {
                res.push({
                    fire: false, 
                    type:"perfect-nitro", 
                    time: parseInt(navParams[0], 10)});
            }
            if (navParams[1] == "double-nitro")
            {
                res.push({
                    fire: false, 
                    type:"double-nitro", 
                    time: parseInt(navParams[0], 10)});
            }                    
            if (navParams[1] == "flash")
            {
                res.push({
                    fire: false, 
                    type:"flash", 
                    time: parseInt(navParams[0], 10)});
            }
            if (navParams[1] == "360")
            {
                res.push({
                    fire: false, 
                    type:"360", 
                    time: parseInt(navParams[0], 10)});
            }
            if (navParams[1] == "360-flash")
            {
                res.push({
                    fire: false, 
                    type:"360-flash", 
                    time: parseInt(navParams[0], 10)});
            }
            if (navParams[1] == "route")
            {
                let newSigns = "";
                if (navParams.length >= 3)
                    newSigns = navParams[2];
                res.push({
                    fire: false, 
                    type:"route", 
                    time: parseInt(navParams[0], 10), 
                    path: newSigns});
            }
        }
    }
    return res;
}
//------
function SignAllowed(arr, item)
{
    if (!arr || !item)
        return false;

    for(let i = 0; i < arr.length; i++){
        if (arr[i].trim()+'.png' == item.trim())
            return true;
    }
    return false;
}
//------
function Restart(appName){
    log("Restart>> " + appName);
    openAppSetting(getPackageName(appName));
    sleep(3500);

    // close
    robot.click(950, 1020);
    sleep(1000);

    // ok
    robot.click(1372, 770);
    sleep(1000);

    launchApp(appName);
    sleep(50000);

    c = 0;
    var res = mpCheckState();
    while(res == "unknow") {
        robot.swipe(2000, 400, 500, 400, 400);
        sleep(1000); 
        if (!ImageClicker('./AdCloser2/'))
            robot.back();
        sleep(5000); 
        res = mpCheckState();   
    }
}