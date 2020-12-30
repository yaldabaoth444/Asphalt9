const DEVICE = require('device.js');
const robot = require('robot.js');
const PLAY = require('play.js').mp;

toast("The program will start running after 7 seconds, please quickly switch to the main interface of the game");
sleep(3000);
toast("There may be advertisements at the beginning of the game. Please turn it off manually until you ensure that the program is normally selected.");
sleep(4000);

DEVICE.checkPermission();
DEVICE.setEventListener();
DEVICE.savePower();

var counterMP = 0;


for (;;counterMP++) {

    if (1){
        PLAY.beforeRun();
  
        if(PLAY.chooseCar()){
            sleep(12000);
            PLAY.run(counterMP);
        }
        // No oil
        else{
            robot.back();
            counterMP--;
            sleep(500);
            PLAY.goingHome();  
            continue;
        }
    }
}

toastLog("end script");   
exit();
