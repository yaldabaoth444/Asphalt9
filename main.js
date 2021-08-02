const DEVICE = require('device.js');
const PLAY = require('play.js').mp;
const HUNT = require('play.js').chse;
const base = require('play.js').base;

toast("The program will start running after 7 seconds, please quickly switch to the main interface of the game");
sleep(3000);
toast("There may be advertisements at the beginning of the game. Please turn it off manually until you ensure that the program is normally selected.");
sleep(4000);

DEVICE.checkPermission();
DEVICE.setEventListener();
DEVICE.savePower();

var startTime = new Date().getTime();

var nowTime = new Date().getTime();
var mpTime = new Date().getTime();
var mp2Time = new Date().getTime();
var chTime = new Date().getTime();

var counter = { MP: 0, CH: 0 };
const option1 = require('./profile.js').mp1;
const option2 = require('./profile.js').mp2;

var huntCounts = 1;
var huntEveryMinutes = huntCounts * 2 * 10;

var mp2Counts = 10;
var mp2EveryMinutes = 20;

for (;;) {
    //ch
    if (1){
        // every 40 minutes (2*2*10)
        nowTime = new Date().getTime();
        if ((nowTime - chTime) > (huntEveryMinutes*60000))
        {
            log("car hunt block begin");
            //nowTime = new Date().getTime();
            HUNT.goingHome();
            for ( let i = 0; i < huntCounts; i++ ) {
                 
                HUNT.beforeRun(option2);
                if(HUNT.chooseCar()){
                    sleep(5000);
                    HUNT.run(counter);
                } else
                    break;
            }
            HUNT.goingHome();
            log("car hunt block finish");
            chTime = new Date().getTime(); //update time at finish
        }    
    }
    //mp2
    if (0){
        //nowTime = new Date().getTime();
        //if ((nowTime - mp2Time) > (mp2EveryMinutes * 60000))
        //{ 
            log("multiplayer 2 block begin");
            PLAY.goingHome();
            for ( let i = 0; i < mp2Counts; i++ ) {
                 
                // check for hunt time 
                //nowTime = new Date().getTime();
                //toast(Math.ceil(huntEveryMinutes - ((nowTime - chTime)/60000)) + "min left to hunt");
                //if ((nowTime - chTime) > huntEveryMinutes * 60000)
                //    break;
             
                PLAY.beforeRun(option2);
          
                if(PLAY.chooseCar(option2)){
                    sleep(25000);
                    PLAY.run(counter);
                } else {
                    // No oil
                    base.back();
                    sleep(500);
                    break;
                }
            }
            PLAY.goingHome();
            log("multiplayer 2 block finish");
            mp2Time = new Date().getTime(); //update time at finish    
        //}
    }
    if (1){
        log("multiplayer 1 block begin");
        
        PLAY.goingHome();
        for ( let i = 0; i < 1000; i++ ) {
        
            // check for hunt time
            nowTime = new Date().getTime();
            toast(Math.ceil(huntEveryMinutes - ((nowTime - chTime)/60000)) + "min left to hunt");
            if ((nowTime - chTime) > huntEveryMinutes * 60000)
                break;
            //toast(Math.ceil(mp2EveryMinutes - ((nowTime - mp2Time)/60000)) + "min left to MP2");    
            //if ((nowTime - mp2Time) > mp2EveryMinutes * 60000)
            //    break;
                    
            PLAY.beforeRun(option1);
      
            if(PLAY.chooseCar(option1)){
                sleep(25000);
                PLAY.run(counter);
            } else {
                // No oil
                base.back();
                sleep(500);
                break;
            }
        }
        PLAY.goingHome();
        log("multiplayer 1 block finish");    
    }
    log("timeout for 1 min");
    sleep(60000);
}

toastLog("end script");   
exit();