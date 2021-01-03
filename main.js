const DEVICE = require('device.js');
const PLAY = require('play.js').mp;
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

var counterMP = 0;
const option1 = require('./profile.js').mp1;
const option2 = require('./profile.js').mp2;

for (;;counterMP++) {

    //mp2
    if (1){
        //nowTime = new Date().getTime();
        PLAY.goingHome();
        for ( let i = 0; i < 15; i++ ) {
             
            PLAY.beforeRun(option2);
      
            if(PLAY.chooseCar(option2)){
                sleep(12000);
                PLAY.run(counterMP);
            }
            // No oil
            else{
                base.back();
                sleep(500);
                break;
            }
        }    
    }
    if (0){
        //nowTime = new Date().getTime();
        PLAY.goingHome();
        for ( let i = 0; i < 25; i++ ) {
        
            PLAY.beforeRun(option1);
      
            if(PLAY.chooseCar(option1)){
                sleep(12000);
                PLAY.run(counterMP);
            }
            // No oil
            else{
                base.back();
                sleep(500);
                break;
            }
        }    
    }
}

toastLog("end script");   
exit();
