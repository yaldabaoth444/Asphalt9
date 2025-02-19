//const core = require('./core.js');
//const main = require('./race-framework.js');
requestScreenCapture();
sleep(2500);


var img = captureScreen();
var h = getCarHash(img);
console.log(h);

exit();

function getCarHash(img) {

    let final = images.clip(img, 267, 160, 84, 94);
    let hash = $crypto.digest(images.toBase64(final), "MD5", { input: 'base64' });
    images.save(final, "./Images/Test/Out/" +hash+".png", "png", 100);
    return hash;
}



