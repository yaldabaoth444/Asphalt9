auto();
const targetBrightness = 0;
const targetMediaVolume = 0;
const autoBrightnessMode = 1;
const isAutoBrightnessMode = device.getBrightnessMode();
const previousBrightness = device.getBrightness();
const previousMusicVolume = device.getMusicVolume();

module.exports = {
    /**
     * Monitor the "Volume Down" button
     */
    setEventListener : () => {
        // Manual exit
        threads.start(function() {
            // Enable button monitoring
            events.observeKey();
            // Monitor volume down key press
            events.onKeyDown("volume_down", function (event) {
                log("The program is about to exit");
                revertPower();
                threads.shutDownAll();
                toastLog("Program exit manually");
                exit();
            });
        });
    },

    /**
     * Check accessibility and screenshot permissions
     */
    checkPermission : () => {
        auto();
        if (!requestScreenCapture(true)) {
            toastLog('Failed to request screenshot, the program ends');
            exit();
        }
        // this.savePower();
    },

    /**
     * Adjust brightness and volume, enter low power consumption mode
     */
    savePower : () => {
        log("save power");
        device.setBrightness(targetBrightness);
        device.setMusicVolume(targetMediaVolume);
    },
    
    /**
     * Restore the screen brightness and device volume before the runtime script
     */
    revertPower : () => {
        log("revert power");
        isAutoBrightnessMode ? device.setBrightnessMode(autoBrightnessMode) : device.setBrightness(previousBrightness);
        device.setMusicVolume(previousMusicVolume); 
    }
}
