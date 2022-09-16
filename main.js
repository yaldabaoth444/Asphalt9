const DEVICE = require('device.js');
const PLAY = require('play.js').mp;
const HUNT = require('play.js').ch;
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
const mpOp1 = require('./profile.js').mp1;
const mpOp2 = require('./profile.js').mp2;
const chOp = require('./profile.js').ch1;

var huntCounts = 1;
var huntEveryMinutes = huntCounts * 2 * 10;

var mp1Counts = 1000;

var mp2Counts = 3;
var mp2EveryMinutes = 60*6;

for (;;) {
    //ch
    if (huntCounts > 0){
        nowTime = new Date().getTime();
        if ((nowTime - chTime) > (huntEveryMinutes*60000))
        {
            log("car hunt block begin");
            
            //nowTime = new Date().getTime();
            HUNT.goingHome();
            for ( let i = 0; i < huntCounts; i++ ) {
                 
                HUNT.beforeRun(chOp);
                if(HUNT.chooseCar(chOp)){
                    sleep(5000);
                    HUNT.run(counter, chOp);
                } else
                    break;
            }
            HUNT.goingHome();
            log("car hunt block finish");
            chTime = new Date().getTime(); //update time at finish
        }    
    }
    //mp2
    if (mp2Counts > 0){

        log("multiplayer 2 block begin");
        PLAY.goingHome();

        for ( let i = 0; i < mp2Counts; i++ ) {
        
            // check for hunt time 
            if (huntEveryMinutes > 0 && huntCounts > 0){     
                nowTime = new Date().getTime();
                toast(Math.ceil(huntEveryMinutes - ((nowTime - chTime)/60000)) + "min left to hunt");
                if ((nowTime - chTime) > huntEveryMinutes * 60000)
                    break;
            }

            PLAY.beforeRun(mpOp2);
      
            if(PLAY.chooseCar(mpOp2)){
                sleep(25000);
                PLAY.run(counter, mpOp2);
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
    }
    //mp1
    if (mp1Counts > 0){

        log("multiplayer 1 block begin");
        PLAY.goingHome();

        for ( let i = 0; i < mp1Counts; i++ ) {
            nowTime = new Date().getTime();
            // check for hunt time
            if (huntEveryMinutes > 0 && huntCounts > 0){
                toast(Math.ceil(huntEveryMinutes - ((nowTime - chTime)/60000)) + "min left to hunt");
                if ((nowTime - chTime) > huntEveryMinutes * 60000)
                    break;
            }
            // check for mp2 time
            if (mp2EveryMinutes > 0 && mp2Counts > 0){
                toast(Math.ceil(mp2EveryMinutes - ((nowTime - mp2Time)/60000)) + "min left to MP2");    
                if ((nowTime - mp2Time) > mp2EveryMinutes * 60000)
                    break;
            }
            PLAY.beforeRun(mpOp1);
            if(PLAY.chooseCar(mpOp1)){
                sleep(25000);
                PLAY.run(counter, mpOp1);
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
    sleep(5000);
}

toastLog("end script");   
exit();;