sleep(3000);
// Save to storage
requestScreenCapture();
var time = new Date().getTime();
var img = captureScreen("/storage/emulated/0/DCIM/Screenshots/screencapture"+time+".png");