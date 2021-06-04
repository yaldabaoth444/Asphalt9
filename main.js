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
var mp2Time = new Date().getTime();

var counter = { MP: 0, CH: 0 };
const option1 = require('./profile.js').mp1;
const option2 = require('./profile.js').mp2;

for (;;) {
    //ch
    if (1){
        log("car hunt block begin");
        //nowTime = new Date().getTime();
        HUNT.goingHome();
        for ( let i = 0; i < 4; i++ ) {
             
            HUNT.beforeRun(option2);
            if(HUNT.chooseCar()){
                sleep(5000);
                HUNT.run(counter);
            } else
                break;
        }
        HUNT.goingHome();
        log("car hunt block finish");    
    }
    //mp2
    if (1){
        log("multiplayer 2 block begin");
        //nowTime = new Date().getTime();
        PLAY.goingHome();
        for ( let i = 0; i < 15; i++ ) {
             
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
        log("multiplayer 2 block finish");    
    }
    if (1){
        log("multiplayer 1 block begin");
        //nowTime = new Date().getTime();
        PLAY.goingHome();
        for ( let i = 0; i < 25; i++ ) {
        
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
        log("multiplayer 1 block finish");    
    }
    log("timeout for 1 min");
    sleep(60000);
}

toastLog("end script");   
exit();
