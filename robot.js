/**
 * Android 5 robot
 * @constructor
 */
function LollipopRobot() {
    rootAutomator = new RootAutomator();
    this.click = function (x, y) {
        // return rootAutomator.tap(x, y);
        return Tap(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        // return rootAutomator.swipe(x1, y1, x2, y2, duration);
        return Swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return Back();
    }

    this.home = function () {
        return Home();
    }
}

/**
 * Android 7 robot
 * @constructor
 */
function NougatRobot() {
    this.click = function (x, y) {
        return click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        return swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return back();
    }

    this.home = function () {
        return home();
    }
}

/**
 * Robot factory
 * @constructor
 */
function Robot() {
    if (device.sdkInt < 24) {
        const hasRoot = files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su");
        if (!hasRoot) {
            toast("Android version below Android 7 requires root, the program ends");
            exit();
        }
        this.robot = new LollipopRobot();
    } else {
        this.robot = new NougatRobot();
    }
    this.click = function (x, y) {
        return this.robot.click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        return this.robot.swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        return this.robot.back();
    };

    this.home = function () {
        return this.robot.home();
    }
}

const robot = new Robot();
module.exports = robot;
