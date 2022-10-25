const DEVICE = require('device.js');
//const robot = require('robot.js');
const base = require('play.js').base;
const PLAY = require('play.js').mp;
//const HUNT = require('play.js').ch;
//const HUNT2 = require('play.js').chse;


DEVICE.checkPermission();
DEVICE.setEventListener();
sleep(3000);
PLAY.test();
exit();