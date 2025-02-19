// The MIT License
//
// Copyright © 2023 Gizatullin Azamat (monopo@list.ru)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the “Software”), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
// whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
// THE SOFTWARE.

const core = require('./core.js');
requestScreenCapture();
sleep(2500);

//let params = [];
let detected = [];

var img = captureScreen();
let state = core.A9State(img);
detected.push(state.CurrentStage);

if (state.HasDialog)
	detected.push("HasDialog");

if (state.HasHome)
	detected.push("HasHome");

if (state.HasSetup)
	detected.push("HasSetup");

if (state.HasSetup)
	detected.push("HasSetup");

if (state.HasBack)
	detected.push("HasBack");

if (state.HasATokens)
	detected.push("HasATokens");

if (state.HasCTokens)
	detected.push("HasCTokens");

if (state.HasHeader)
	detected.push("HasHeader");
        
if (state.TabSelected)
	detected.push("Tab-" + state.TabSelected);     
	   
detected.push("Car-" + core.GetCarClass(img) + core.GetCarStar(img));

//find pixels
Object.keys(core.profile).forEach(function(key) {
    var obj = core.profile[key];
	if (obj && obj.hasOwnProperty("x") && obj.hasOwnProperty("y") && obj.hasOwnProperty("color")) {
		if (core.CheckPixel(img, obj)) 
			detected.push(key);
	}
});


toastLog(detected.join(", "), true);

/*


for (var i = 0; i < params.length; i++) {
	let paramName = params[i];
	let param = core.profile[paramName];
	
	let res = core.CheckPixel(img, param);
	if (res == true)
		console.log(paramName +":"+ res);

	if (core.CheckPixel(img, param))
		detected.push(paramName);
}
*/




/*
let params = ["back", "setup", 
		      "tab1", "tab2", "tab3", "tab4", "tab5", "tab6", 
		      "explore_events", "de_tickets", 
		      "mp_play", "race_marker", 
		      "daily_events_lobby", "car_lobby_td_on", "car_lobby_ts_bar",
			  "car_star_1", "car_star_2", "car_star_3", "car_star_4", "car_star_5", "car_star_6"
				//"", "", "", "", "", "", ""
				//"", "", "", "", "", "", ""
				//"", "", "", "", "", "", ""
		      ];

//let res = core.ImageFinder(img, './Images/Interface/', "claim_goals.png", 'r30');
//if (res.result)
//	detected.push("@[" + res.position_center.x + "," + res.position_center.y + "]");

//let dlgRes = core.ImagesFinder(img, './Images/Dialog/');
//if (dlgRes.result)
//	detected.push("@Dialog[" + dlgRes.position_center.x + "," + dlgRes.position_center.y + "]");

// let res = core.ImagesFinder(img, './Images/Next/', 'br50');
// if (res.result)
// 	detected.push("@Next[" + res.position_center.x + "," + res.position_center.y + "]");

//let stokenRes = core.ImageFinder(img, './Images/Interface/', "season_token.png")
//if (stokenRes.result)
//	detected.push("@S_Token");

//let carselRes = core.ImageFinder(img, './Images/Interface/', "car_selection.png", "tl40")
//if (carselRes.result)
//	detected.push("#car_selection[" + carselRes.position_center.x + "," + carselRes.position_center.y + "]");

for (var key in core.profile) {
    // skip loop if the property is from prototype
    if (!core.profile.hasOwnProperty(key)) continue;

    //console.log(key);

    var obj = core.profile[key];
    //console.log({obj});
    let hasX = false;
    let hasY = false;
    let hasColor = false;
    for (var prop in obj) {
    	//if (!obj.hasOwnProperty(prop)) continue;
        //alert(prop + " = " + obj[prop]);
        //console.log(prop);

    	if (prop === "x") hasX = true;
    	if (prop === "y") hasY = true;
    	if (prop === "color") hasColor = true;
    }
    if (hasX && hasY && hasColor) {
    	params.push(""+key);
    	//console.log(key);
	}
    
}
*/