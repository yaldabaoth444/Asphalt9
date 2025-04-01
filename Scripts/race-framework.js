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

"auto";
const core = require('./core.js');
requestScreenCapture();

var _rfw = {};

_rfw.core = core;

_rfw.doMP1 = function(cnt) {
	for(let i = 1; i <= cnt; i++) {
		MP(1);
		toastLog('done mp1 #' + i);
		files.append("result.txt", formatDate(new Date()) + " MP1 "+ i +" of " + cnt +"\n");
	}
}

_rfw.doMP2 = function(cnt) {
	for(let i = 1; i <= cnt; i++) {
		MP(2);
		toastLog('done mp2 #' + i);
		files.append("result.txt", formatDate(new Date()) + " MP2 "+ i +" of " + cnt +"\n");
	}
}

_rfw.doMP3 = function(cnt) {
	for(let i = 1; i <= cnt; i++) {
		MP(3);
		toastLog('done mp3 #' + i);
		files.append("result.txt", formatDate(new Date()) + " MP3 "+ i +" of " + cnt +"\n");
	}
}

_rfw.doDowngrade1 = function(cnt) {
	for(let i = 1; i <= cnt; i++) {
		Downgrade(1);
		toastLog('downgrade mp1 #' + i);
		files.append("result.txt", formatDate(new Date()) + " MP1 "+ i +" of " + cnt +"\n");
	}
}

_rfw.doDowngrade2 = function(cnt) {
	for(let i = 1; i <= cnt; i++) {
		Downgrade(2);
		toastLog('downgrade mp2 #' + i);
		files.append("result.txt", formatDate(new Date()) + " MP2 "+ i +" of " + cnt +"\n");
	}
}

_rfw.doDowngrade3 = function(cnt) {
	for(let i = 1; i <= cnt; i++) {
		Downgrade(3);
		toastLog('downgrade mp3 #' + i);
		files.append("result.txt", formatDate(new Date()) + " MP3 "+ i +" of " + cnt +"\n");
	}
}

_rfw.doDE = function(name, cnt) {
	for(let i = 1; i <= cnt; i++) {
		let deRes = DE(name);
		files.append("result.txt", formatDate(new Date()) + " DE " +name +' '+ i +" of " + cnt +' '+ deRes +"\n");
		if (deRes) {
			toastLog('done ' + name + ' #' + i);
		} else {
			toastLog('bad ' + name + ' #' + i);
			break;
		}
		goHome("home_page");
	}
}

_rfw.doRace = function(name) {
	let deRes = Race(name);
	if (deRes) {
		toastLog('done ' + name);
	} else {
		toastLog('bad ' + name);
	}
}

_rfw.doDirectRace = function(name) {
	let deRes = DirectRace(name);
	if (deRes) {
		toastLog('done ' + name);
	} else {
		toastLog('bad ' + name);
	}
}

_rfw.doSE = function(name, cnt) {
	let errCnt = 0;
	for(let i = 1; i <= cnt; i++) {
		let deRes = SE(name);
		files.append("result.txt", formatDate(new Date()) + " SE "+name+' '+ i +" of " + cnt +' '+ deRes +"\n");
		if (deRes) {
			errCnt = 0;
			toastLog('done ' + name + ' #' + i);
		} else {
			errCnt++;
			toastLog('bad ' + name + ' #' + i);
			if (errCnt > 1)
				break;
		}
	}
}
//images.save(img, "./Images/Test/Out/stuck_"+Date.now()+'.png', "png", 100);
_rfw.Kill = function() {
	core.Kill();
}

_rfw.Start = function() {
	core.Start();
}

_rfw.Restart = function() {
	core.Restart();
}

_rfw.SwitchAppTo = function(appName) {
	core.SwitchAppTo(appName);
}

_rfw.Exit = function() {
	exit();
}

_rfw.SleepX = function(duration) {
	core.SleepX(duration);
}

_rfw.WaitX = function(duration) {
	core.WaitX(duration);
}

_rfw.GainTicket = function()
{
	let img = captureScreen();
	try {
		let state = core.A9State(img);

		if (state.CurrentStage != "home_page")
		    goHome("home_page");

		let done = false;
		core.StartTimer('ticket');
		while(!done && core.ElapsedSeconds('ticket') < 60) {

			img = captureScreen();
			state = core.A9State(img);

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (core.ElapsedSeconds('stage') > 2)
					core.ClosePopups();
		    } 
		    else if (state.CurrentStage == "next") {
		        core.Click(state.NextPos);
		    }
		    //select tab 2
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected != 2) {
		        core.SelectTab(2);
		    }
		    //select de
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected == 2) {
		        core.ClickPixelByName("explore_events");
				core.SleepX(2500);

		        core.ImageClicker(null, './Images/Interface/', 'tickets.png');
				done = true;
				core.SleepX(500);
		    }

			core.SleepX(1500);
		}

		done = false;
		let ads = 0;
        let noAds = 0;
        while(!done && noAds < 10) {

        	img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			let stageSeconds = StageSeconds();
			log("GainTicket " + state.CurrentStage +' '+ stageSeconds);

			if (state.CurrentStage == "dialog") {
				log("dialog");
				core.SleepX(2000);
				img = captureScreen();
				if (core.ImagesClicker(img, './Images/WatchAdButtons/'))
				{
					core.StartTimer('ad');
					noAds = 0;
					log("noAds = 0");
					ads++;
					toastLog('Watch AD: ' + ads);
				} else {
					noAds++;
					log("noAds++; "+noAds);
				}
				core.SleepX(3000);
		    } else if (state.HasHeader) {
		    	log("HasHeader");
		    	noAds++;
		    	log("noAds++; "+noAds);
				core.SleepX(3000);
		    } else if (state.CurrentStage == "next") {
		    	log("next");
		        core.Click(state.NextPos);
		        core.SleepX(1000);
		    } else {
		    	log("else");
		    	if (stageSeconds > 120) {
            		console.log("stuck protection >120");
            		toastLog("Restart");
					core.Restart();
					main.WaitX('1m');
            		return false;
            	} else if (stageSeconds > 30) {
            		let sbRes = core.ImageFinder(img, './Images/Interface/', "status_bar.png", 't10');
		        	if (sbRes.result) {
		        		core.HideStatusBarTrix();
						core.SleepX(2500);
		            }
            	}
		  //    	img = captureScreen();
		  //    	if (core.ImagesClicker(img, './Images/WatchAdButtons/'))
				// {
				// 	core.StartTimer('ad');
				// 	noAds = 0;
				// 	log("noAds = 0");
				// 	ads++;
				// 	toastLog('Watch AD: ' + ads);
				// 	core.SleepX(3000);
				// }

				if (core.ImagesClicker(img, './Images/AdClosers/'))
					log("AdClosers clicked");
				//core.ImagesClicker(img, './Images/Dialog/');
		    }

		    if (noAds >= 10)
			    done = true;
			else
			    core.SleepX(1000);
        }

        goHome("home_page");

	} finally {
		if (img != null)
	        img.recycle();
	}
}

_rfw.GoHome = function(destination) {
	goHome(destination);
}

module.exports = _rfw;

function goHome(destination) {
	console.log("GoHome");
	if (!destination)
		destination = 'home_page';
	
    let img = null
    core.StartTimer('goHome');
	while(core.ElapsedSeconds('goHome') < 120) {
		img = captureScreen();
		let state = core.A9State(img);
		//toastLog(state.CurrentStage);
        console.log("#GoHome " + state.CurrentStage + " start:" + core.ElapsedSeconds('goHome'));

		if (state.CurrentStage == destination || state.CurrentStage == 'home_page') {
            console.log("reach " + destination);
            return true;
        }

        if (state.HasBack)
        {
            console.log("GoHome2");
            if (destination == "home_page" && !state.HasSetup && state.HasHeader) 
                core.ClickPixelByName("setup");
            else
                core.ClickPixelByName("back");
            core.SleepX(500);
        }
        else if (state.CurrentStage == "next") {
            console.log("GoHome3");
            core.Click(state.NextPos);
        } else {
            console.log("GoHome4");
            core.ClosePopups();
        }

        //stuck protection
        if (state.CurrentStage == "unknow") {
			if (core.ElapsedSeconds('goHome') > 100) {
				images.save(img, "./Images/Test/Out/stuck_"+Date.now()+'.png', "png", 100);
				return false;
			} else if (core.ElapsedSeconds('goHome') > 60) {
    			core.ClosePopups();	
    			sleep(1500); 
        	} else if (core.ElapsedSeconds('goHome') > 45 && !trixDone) {
        		core.HideStatusBarTrix();
				trixDone = true;
        	} else if (core.ElapsedSeconds('goHome') > 20) {
        		let sbRes = core.ImageFinder(null, './Images/Interface/', "status_bar.png", 't10');
	        	if (sbRes.result) {
	        		core.HideStatusBarTrix();
					core.SleepX(2500);
	            }
        	}
        }

        core.SleepX(1500);
	}
    if (img != null)
        img.recycle();
}

function DE(eventName) {
	let eventProfile = core.profile[eventName];
	if (eventProfile == null) {
		toastLog('profile «' + eventName + '» not found');
		return false;
	}

	let img = captureScreen();
	try {
		let navigation = eventProfile["navigation"];
		let route = null;
        if (navigation != null)
            route = core.ParseNavigation(navigation);

		let state = core.A9State(img);

		if (state.CurrentStage != "home_page")
		    goHome("home_page");

		let car_owned_only = getProperty("car_owned_only", eventProfile, core.profile);
		let car_switch_direction = getProperty("car_switch_direction", eventProfile, core.profile);

		let done = false;
		let startTime = new Date().getTime();
		let nowTime = new Date().getTime();

		while(!done && (nowTime - startTime) < 60*1000) {

			img = captureScreen();
			state = core.A9State(img);

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (core.ElapsedSeconds('stage') > 2)
					core.ClosePopups();
		    } 
		    else if (state.CurrentStage == "next") {
		        core.Click(state.NextPos);
		    }
		    //select tab 2
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected != 2) {
		        core.SelectTab(2);
		    }
		    //select de
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected == 2) {
		        core.ClickPixelByName("explore_events");
				core.SleepX(2500);

		        if (!core.SelectDailyEvent(eventName)) {
		        	core.ClickPixelByName("setup");
		        }
		    }
		    else if (state.CurrentStage == "daily_events_lobby") {
		    	core.ClickPixelByName("golden_point");
		    	core.SleepX(1500);
		    }
		    //garage to car lobby
		    else if (state.CurrentStage == "garage") {
		    	if (car_owned_only) {
		    		core.ClickPixelByName("garage_filter");
		    		core.SleepX(1000);
		    		core.ClickPixelByName("garage_filter_by_owned");
		    		core.SleepX(500);
		    		core.ClickPixelByName("garage_filter_done");
		    		core.SleepX(1500);
		    	}
	            //select 1st car
	            if (!core.SelectCar("tl50"))
	            	core.SelectCar();
	            core.SleepX(1000);
		    }
		    //local finish
		    else if (state.CurrentStage == "car_lobby") {
		    	done = true;
		    }

			core.SleepX(1500);
		    nowTime = new Date().getTime();
		}

		if (!done)
			return false;

		if (!core.GarageSelectCar(null, eventProfile.preset, car_switch_direction))
		{
			core.ClickPixelByName("setup");
			return false;
		}

		//*==Race==*/ 
		return Race(eventName);
	}
	finally
	{
	    if (img != null)
	        img.recycle();
	}
}

function MP(num) {
	let eventName = "mp"+num;
	let eventProfile = core.profile[eventName];
	if (eventProfile == null) {
		toastLog('profile «' + eventName + '» not found');
		return false;
	}

	let img = captureScreen();
	try {
		let state = core.A9State(img);

		if (state.CurrentStage != "home_page")
		    goHome("home_page");

		//toast("toCarLobby");
		let league = "unranked";
		let car_owned_only = getProperty("car_owned_only", eventProfile, core.profile);
		let car_switch_direction = getProperty("car_switch_direction", eventProfile, core.profile);
		let forceMode = eventProfile["forceMode"];
		let disableLeagueSelector = eventProfile["disable_league_selector"];
		
		let done = false;
		let startTime = new Date().getTime();
		let nowTime = new Date().getTime();

		while(!done && (nowTime - startTime) < 60*1000) {

			img = captureScreen();
			state = core.A9State(img);

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (core.ElapsedSeconds('stage') > 2)
		        	core.ClosePopups();
		    } 
		    else if (state.CurrentStage == "next") {
		        core.Click(state.NextPos);
		    }
		    //select tab 4
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected != 4) {
		        core.SelectTab(4);
		    }
		    //select mp1
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected == 4) {
				var mpCorner = core.DetectMPTopLeftCorner(num, img);
				console.log({mpCorner});
		    	league = core.GetLeague(img, mpCorner, num);
		    	console.log("mp"+num+" league: " + league);
		        core.SelectMP(mpCorner, num, league);
		    }
		    //press play at mp lobby
		    else if (state.CurrentStage == "mp_lobby") {
		        core.ClickPixelByName("mp_play");
		        core.SleepX(3500);
		    }
		    //garage to car lobby
		    else if (state.CurrentStage == "garage") {
		    	if (car_owned_only) {
		    		core.ClickPixelByName("garage_filter");
		    		core.SleepX(1000);
		    		core.ClickPixelByName("garage_filter_by_owned");
		    		core.SleepX(500);
		    		core.ClickPixelByName("garage_filter_done");
		    		core.SleepX(1500);
		    	}

		    	if (disableLeagueSelector == null || disableLeagueSelector == false) {
			    	core.GarageSelectLeague(num, league);
			    	core.SleepX(1500);
			    }

	            //select 1st car
	            if (!core.SelectCar("tl50"))
	            	core.SelectCar();
	            core.SleepX(1000);
		    }
		    //local finish
		    else if (state.CurrentStage == "car_lobby") {
		    	done = true;
		    }

			core.SleepX(1500);
		    nowTime = new Date().getTime();
		    console.log("mp"+num+" stage:" + state.CurrentStage + " loop1: " + (nowTime - startTime));
		}

		if (!done)
			return false;

		if (!core.GarageSelectCar(league, eventProfile.preset, car_switch_direction, forceMode))
		{
			core.ClickPixelByName("setup");
			return false;
		}
		//*==Race==*/ 
		return Race(eventName);	
	}
	finally
	{
	    if (img != null)
	        img.recycle();
	}
}

function Race(eventName) {
	let eventProfile = core.profile[eventName];
	if (eventProfile == null) {
		toastLog('profile «' + eventName + '» not found');
		return false;
	}

	let img = captureScreen();
	try {
		let navigation = eventProfile["navigation"];
		let route = null;
        if (navigation != null)
            route = core.ParseNavigation(navigation);

		let state = core.A9State(img);

		let done = false;
		let raced = false;
		let signSet = eventProfile.sign_set;
		let routeRegion = core.profile.race_route_region;
		let prevPercent = -1;
		let nitroManagement = (route == null);

		let auto_nitro_set = eventProfile["auto_nitro"];
		let has_auto_nitro = auto_nitro_set != null;
		let next_auto_nitro = getProperty("auto_nitro_enable_at_sec", eventProfile, core.profile);
		let stop_auto_nitro = getProperty("auto_nitro_disable_after", eventProfile, core.profile);

		let auto_drift_set = eventProfile["auto_drift"];
		let has_auto_drift = auto_drift_set != null;
		let next_auto_drift = getProperty("auto_drift_enable_at_sec", eventProfile, core.profile);
		let stop_auto_drift = getProperty("auto_drift_disable_after", eventProfile, core.profile);

		let sign_set_click_limiter = getProperty("sign_set_click_limiter", eventProfile, core.profile);

		let watchAds = getProperty("watchAds", eventProfile, core.profile);
		let forceMode = eventProfile["forceMode"];
		let watchingAd = false;
		StageCounter("begin");

		//BEFORE RACE
		trixDone = false;
		core.StartTimer('start');
		while(!done && core.ElapsedSeconds('start') < 333) {
			img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			let stageSeconds = StageSeconds();

			console.log("#b-race " + state.CurrentStage + "(" + stageSeconds + ")" + " start:" + core.ElapsedSeconds('start'));

			//stuck protection
            if (state.CurrentStage == "unknow") {
            	if (stageSeconds > 300) {
            		console.log("stuck protection >300");
            		toastLog("Restart");
					core.Restart();
					main.WaitX('1m');
            		return false;
            	}
            	
            	if (stageSeconds > 180) {
            		images.save(img, "./Images/Test/Out/stuck_"+Date.now()+'.png', "png", 100);
            		console.log("stuck protection >180");
            		return false;
            	} 

            	if (stageSeconds > 120) {
					console.log("stuck protection >120");
					core.ClosePopups();	
            		sleep(3000); 
				} else if (stageSeconds > 100 && !trixDone) {
					console.log("stuck protection >100");
            		core.HideStatusBarTrix();
					trixDone = true;
            	} else if (stageSeconds > 20) {
            		let sbRes = core.ImageFinder(null, './Images/Interface/', "status_bar.png", 't10');
		        	if (sbRes.result) {
		        		core.HideStatusBarTrix();
						core.SleepX(2500);
		            }
            	}
            }

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (stageSeconds > 10) {
			    	console.log(">10");
			    	core.ClosePopups();
				    return false;	
			    }

		    	if (forceMode && stageSeconds > 1) {
		    		console.log("force+>1");
	    			let xRes = core.ImagesFinder(null, './Images/WatchAdButtons/');
	    			if (xRes.result) {
	    				core.Click(xRes.position_center);
	    				watchingAd = true;
						core.SleepX(15000);
						core.StartTimer('start');
						continue;
	    			}
			    } 
		    } 
		    //try start race
		    else if (state.CurrentStage == "car_lobby") {
		    	if (stageSeconds > 1) {
		    		let tdOn = core.CheckPixel(img, core.profile.car_lobby_td_on);
		    		if (!tdOn) {
		    			core.ClickPixelByName("car_lobby_td_on");
		    			core.SleepX(500);
		    		} else {
	                	core.ClickPixelByName("golden_point");
	                	core.SleepX(1500);
	            	}
	            }
            }
            //before race
            else if (state.CurrentStage == "next") {
          		core.Click(state.NextPos);
           		core.SleepX(1500);
            }     
            //race started
            else if (state.CurrentStage == "race") {
            	done = true;
            	break;
            }
            else if ((watchAds || forceMode) && watchingAd && state.CurrentStage == "unknow") {
            	imgfRes = core.ImagesFinder(null, './Images/AdAllInOne/');
				if (imgfRes.result) {
					core.Click(imgfRes.position_center);
					sleep(50); 
					core.Click(imgfRes.position_center);
					toastLog('close by ' + imgfRes.image_name);

					core.StartTimer('start');
					if (forceMode) 
						StageCounter('ads');

					sleep(2000); 
				}
            }

            core.SleepX(300);
		}
		if (!done)
			return false;

		//RACE
		done = false;
		core.StartTimer('race');
		while(!done && core.ElapsedSeconds('race') < 3*60) {
			img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			
            // end race
            if (state.CurrentStage == "next" && core.ElapsedSeconds('stage') > 1) {
            	done = true;
            }     
            // end race
            else if (state.HasHeader && raced && (["car_lobby", "mp_lobby", "daily_events_lobby", "home_page", "garage"].contains(state.CurrentStage))) {
            	if (core.ElapsedSeconds('stage') > 2)
					done = true;
            }
            //racing
            else if (state.CurrentStage == "race") {
            	if (!raced) {
            		raced = true;
            		prevPercent = 0;
            		core.StartTimer('percent');
            		core.StartTimer('route');
            		if (has_auto_nitro) 
            			core.StartTimer('auto_nitro');

            		if (has_auto_drift) 
            			core.StartTimer('auto_drift');
            	}

            	//navigation
            	if (route != null || stop_auto_nitro != null || stop_auto_drift != null) {
	            	//track percent
	            	let currPercent = core.GetTrackPercentMatrix(img); //GetTrackPercentOcr | GetTrackPercentHash
	            	if (currPercent > prevPercent) {
	            		core.StartTimer('percent');
	            		prevPercent = currPercent;
	            	}            		

	            	if (route != null) {
	            		let navRes = doNavComand(route, prevPercent, core.Elapsed('percent'));
	            		if (navRes.result) {
	            			if (navRes.newSigns != null)
	            				signSet = navRes.newSigns;

	            			if (navRes.nitroManagement != null)
	            				nitroManagement = navRes.nitroManagement;
	            		}
	            	}            		
            	}

                if (signSet && signSet.length > 0 && core.Elapsed('route') > sign_set_click_limiter)
                {
                    if (core.SignClicker(signSet, routeRegion))
                    	core.StartTimer('route')
                }

            	if (has_auto_nitro) {
                	if (core.Elapsed('auto_nitro') > next_auto_nitro && (stop_auto_nitro == null || (prevPercent < stop_auto_nitro))) {
                		next_auto_nitro = randomIntFromInterval(auto_nitro_set.rand_min, auto_nitro_set.rand_max);
						
						doNitroAction(auto_nitro_set.type); 
                		
                		core.StartTimer('auto_nitro');	
                	}
        		}

                if (has_auto_drift) {
                	if (core.Elapsed('auto_drift') > next_auto_drift && (stop_auto_drift == null || (prevPercent < stop_auto_drift))) {
                		let drift_dur = randomIntFromInterval(auto_drift_set.drift_min, auto_drift_set.drift_max);
                		next_auto_drift = randomIntFromInterval(auto_drift_set.rand_min, auto_drift_set.rand_max);
		                
		                doDriftAction(auto_drift_set.type, drift_dur);

                		core.StartTimer('auto_drift');	
                	}
        		}
            }
		}

		//AFTER RACE
		done = false;
		trixDone = false;
		watchingAd = false;
		core.StartTimer('race');
		while(!done && core.ElapsedSeconds('race') < 2*60) {
			img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			let stageSeconds = StageSeconds();
			console.log(state.CurrentStage + " " + core.ElapsedSeconds('stage'));
            // end race
            if (state.CurrentStage == "next") {
            	//if (core.ElapsedSeconds('stage') > 1) {
            	let clckWatch = false;
            	if (watchAds && !watchingAd && state.ImageName != null && state.ImageName.startsWith("miss_out")) {
            		let xRes = core.ImagesFinder(img, './Images/Money/');
            		if (xRes.result) {
            			console.log(xRes.image_name);
            			//images.captureScreen("./Images/Test/Out/x3-ads-" +Date.now()+ ".png");
						
						core.Click({x:2000, y:760});
						watchingAd = true;
						clckWatch = true;
						core.SleepX(15000);
						core.StartTimer('race');
						continue;
            		}
            	} 
            	
            	if (!clckWatch) {
            		core.Click(state.NextPos);
            		core.SleepX(1500);
	            }
            } 
            else if (state.CurrentStage == "dialog") {
		    	if (stageSeconds > 3) {
			    	console.log(">3");
			    	core.ClosePopups();
			    }
		    }     
            //else if (state.HasHeader && raced) {
            else if (state.HasHeader && raced && (["car_lobby", "mp_lobby", "daily_events_lobby", "home_page", "garage"].contains(state.CurrentStage))) {
            	if (core.ElapsedSeconds('stage') > 2)
					done = true;
            }
            else if (watchAds && watchingAd && state.CurrentStage == "unknow") {
            	imgfRes = core.ImagesFinder(img, './Images/AdAllInOne/');
				if (imgfRes.result) {
					core.Click(imgfRes.position_center);
					sleep(50); 
					core.Click(imgfRes.position_center);
					toastLog('close by ' + imgfRes.image_name);
					sleep(2000); 
				}
            }

            //stuck protection
            if (state.CurrentStage == "unknow") {
				if (stageSeconds > 180) {
					images.save(img, "./Images/Test/Out/stuck_"+Date.now()+'.png', "png", 100);
					return false;
				} else if (stageSeconds > 120) {
        			core.ClosePopups();	
        			sleep(1500); 
            	} else if (stageSeconds > 100 && !trixDone) {
            		core.HideStatusBarTrix();
					trixDone = true;
            	} else if (stageSeconds > 20) {
            		let sbRes = core.ImageFinder(null, './Images/Interface/', "status_bar.png", 't10');
		        	if (sbRes.result) {
		        		core.HideStatusBarTrix();
						core.SleepX(2500);
		            }
            	}
            }
		}

		return true;
	}
	finally
	{
	    if (img != null)
	        img.recycle();
	}
}

function SE(eventName) {
    let eventProfile = core.profile[eventName];
    if (eventProfile == null) {
        toastLog('profile «' + eventName + '» not found');
        return false;
    }

    let forceMode = eventProfile["forceMode"];
    let stage = eventProfile["stage"];
    let img = captureScreen();
    try {
        let state = core.A9State(img);

        if (state.CurrentStage != "home_page")
            goHome("home_page");

        let done = false;
        let startTime = new Date().getTime();
        let nowTime = new Date().getTime();

        while (!done && (nowTime - startTime) < 60 * 1000) {

            img = captureScreen();
            state = core.A9State(img);

            //close popups
            if (state.CurrentStage == "dialog") {
            	if (core.ElapsedSeconds('stage') > 2)
                	core.ClosePopups();
            } else if (state.CurrentStage == "next") {
                core.Click(state.NextPos);
            }
            //select tab 3
            else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected != 3) {
                core.SelectTab(3);
            }
            //select se
            else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected == 3) {
                let imgfRes = core.ImageFinder(img, './Images/SpecialEvents/' + eventName + '/', 'event_selector.png');
                if (imgfRes.result) {
                    core.Click(imgfRes.position_center);
                    core.SleepX(1500);
                } else {
                	if ((new Date()).getSeconds() > 30)
                		swipe(500, 480, 500, 200, 500);
                	else
                		swipe(500, 200, 500, 480, 500);
                }
            } else {
                let imgfRes = core.ImageFinder(img, './Images/SpecialEvents/' + eventName + '/', 'event_lobby.png');
                if (imgfRes.result) {
                    if (!core.SelectSpecialEvent(eventName, stage)) {
                        core.ClickPixelByName("setup");
                    	core.SleepX(2500);
                    	return false;
                    }
                    else
                        done = true;
                }
            }

            core.SleepX(1500);
            nowTime = new Date().getTime();
        }

        if (!done)
            return false;

        done = false;
		startTime = new Date().getTime();
		nowTime = new Date().getTime();

		while(!done && (nowTime - startTime) < 60*1000) {

			img = captureScreen();
			state = core.A9State(img);

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (core.ElapsedSeconds('stage') > 2)
					core.ClosePopups();
		    } 
		    else if (state.CurrentStage == "next") {
		        core.Click(state.NextPos);
		    }
		    //garage to car lobby
		    else if (state.CurrentStage == "garage") {
	            //select 1st car
	            if (!core.SelectCar("tl50"))
	            	core.SelectCar();
	            core.SleepX(1000);
		    }
		    //local finish
		    else if (state.CurrentStage == "car_lobby") {
		    	done = true;
		    }

			core.SleepX(1500);
		    nowTime = new Date().getTime();
		}

		if (!done)
			return false;

		// if preset defined
		if (eventProfile.preset) {
			let car_switch_direction = getProperty("car_switch_direction", eventProfile, core.profile);
			if (!core.GarageSelectCar(null, eventProfile.preset, car_switch_direction, forceMode))
			{
				core.ClickPixelByName("setup");
				return false;
			}
		}
		//*==Race==*/ 
        return Race(eventName);
    } finally {
        if (img != null)
            img.recycle();
    }
}

function Downgrade(num) {
	let eventName = "downgrade"+num;
	let eventProfile = core.profile[eventName];
	if (eventProfile == null) {
		toastLog('profile «' + eventName + '» not found');
		return false;
	}

	let img = captureScreen();
	try {
		let state = core.A9State(img);

		if (state.CurrentStage != "home_page")
		    goHome("home_page");

		//toast("toCarLobby");
		let league = "unranked";
		let car_owned_only = getProperty("car_owned_only", eventProfile, core.profile);
		let car_switch_direction = getProperty("car_switch_direction", eventProfile, core.profile);
		let forceMode = eventProfile["forceMode"];
		let disableLeagueSelector = eventProfile["disable_league_selector"];

		let done = false;
		let startTime = new Date().getTime();
		let nowTime = new Date().getTime();

		while(!done && (nowTime - startTime) < 60*1000) {

			img = captureScreen();
			state = core.A9State(img);

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (core.ElapsedSeconds('stage') > 2)
		        	core.ClosePopups();
		    } 
		    else if (state.CurrentStage == "next") {
		        core.Click(state.NextPos);
		    }
		    //select tab 4
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected != 4) {
		        core.SelectTab(4);
		    }
		    //select mp#
		    else if (state.HasSetup && state.HasATokens && state.HasCTokens && state.TabSelected == 4) {
				var mpCorner = core.DetectMPTopLeftCorner(num, img);
		    	league = core.GetLeague(img, mpCorner, num);
		    	console.log("downgrade"+num+" league: " + league);
		        core.SelectMP(mpCorner, num, league);
		    }
		    //press play at mp lobby
		    else if (state.CurrentStage == "mp_lobby") {
		        core.ClickPixelByName("mp_play");
		        core.SleepX(3500);
		    }
		    //garage to car lobby
		    else if (state.CurrentStage == "garage") {
		    	if (car_owned_only) {
		    		core.ClickPixelByName("garage_filter");
		    		core.SleepX(1000);
		    		core.ClickPixelByName("garage_filter_by_owned");
		    		core.SleepX(500);
		    		core.ClickPixelByName("garage_filter_done");
		    		core.SleepX(1500);
		    	}

		    	if (disableLeagueSelector == null || disableLeagueSelector == false) {
			    	core.GarageSelectLeague(num, league);
			    	core.SleepX(1500);
			    }

	            //select 1st car
	            if (!core.SelectCar("tl50"))
	            	core.SelectCar();
	            core.SleepX(1000);
		    }
		    //local finish
		    else if (state.CurrentStage == "car_lobby") {
		    	done = true;
		    }

			core.SleepX(1500);
		    nowTime = new Date().getTime();
		    console.log("downgrade"+num+" stage:" + state.CurrentStage + " loop1: " + nowTime - startTime);
		}

		if (!done)
			return false;

		if (!core.GarageSelectCar(league, eventProfile.preset, car_switch_direction, forceMode))
		{
			core.ClickPixelByName("setup");
			return false;
		}

		StageCounter("begin");
		done = false;
		let watchingAd = false;
		//BEFORE RACE
		core.StartTimer('start');
		while(!done && core.ElapsedSeconds('start') < 100) {
			img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			let stageSeconds = StageSeconds();

			console.log("#b-race " + state.CurrentStage + "(" + stageSeconds + ")" + " start:" + core.ElapsedSeconds('start'));

			//stuck protection
            if (state.CurrentStage == "unknow") {
            	if (stageSeconds > 300) {
            		console.log("stuck protection >300");
            		toastLog("Restart");
					core.Restart();
					main.WaitX('1m');
            		return false;
            	}
            	
            	if (stageSeconds > 180) {
            		images.save(img, "./Images/Test/Out/stuck_"+Date.now()+'.png', "png", 100);
            		console.log("stuck protection >180");
            		return false;
            	} 

            	if (stageSeconds > 120) {
					console.log("stuck protection >120");
					core.ClosePopups();	
            		sleep(3000); 
				}
            }

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (stageSeconds > 10) {
			    	console.log(">10");
			    	core.ClosePopups();
				    return false;	
			    }

		    	if (forceMode && stageSeconds > 1) {
		    		console.log("force+>1");
	    			let xRes = core.ImagesFinder(null, './Images/WatchAdButtons/');
	    			if (xRes.result) {
	    				core.Click(xRes.position_center);
	    				watchingAd = true;
						core.SleepX(15000);
						core.StartTimer('start');
						continue;
	    			}
			    } 
		    } 
		    //try start race
		    else if (state.CurrentStage == "car_lobby") {
		    	if (stageSeconds > 1) {
		    		let tdOn = core.CheckPixel(img, core.profile.car_lobby_td_on);
		    		if (!tdOn) {
		    			core.ClickPixelByName("car_lobby_td_on");
		    			core.SleepX(500);
		    		} else {
	                	core.ClickPixelByName("golden_point");
	                	core.SleepX(1500);
	            	}
	            }
            }
            //before race
            else if (state.CurrentStage == "next") {
          		core.Click(state.NextPos);
           		core.SleepX(1500);
            }     
            //race started
            else if (state.CurrentStage == "race") {
            	done = true;
            	break;
            }
            else if (forceMode && watchingAd && state.CurrentStage == "unknow") {
            	imgfRes = core.ImagesFinder(null, './Images/AdAllInOne/');
				if (imgfRes.result) {
					core.Click(imgfRes.position_center);
					sleep(50); 
					core.Click(imgfRes.position_center);
					toastLog('close by ' + imgfRes.image_name);

					core.StartTimer('start');
					if (forceMode) 
						StageCounter('ads');

					sleep(2000); 
				}
            }

            core.SleepX(300);
		}
		if (!done)
			return false;

		//RACE
		done = false;
		let raced = false;
		core.StartTimer('race');
		while(!done && core.ElapsedSeconds('race') < 1*60) {
			img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			
            // end race
            if (state.CurrentStage == "next" && core.ElapsedSeconds('stage') > 1) {
            	done = true;
            }     
            // end race
            else if (state.HasHeader && raced && (["car_lobby", "mp_lobby", "daily_events_lobby", "home_page", "garage"].contains(state.CurrentStage))) {
            	if (core.ElapsedSeconds('stage') > 2)
					done = true;
            }
            //racing
            else if (state.CurrentStage == "race") {
            	raced = true;

            	core.SleepX(10000);
            	core.ClickPixelByName("race_pause");
            	core.SleepX(1500);

            	let imgfRes = core.ImageFinder(null, './Images/Interface/', 'quit_race.png');
                if (imgfRes.result) {
                    core.Click(imgfRes.position_center);
					sleep(2000); 

					imgfRes = core.ImageFinder(null, './Images/Interface/', 'leave.png');
					if (imgfRes.result)
					{
						core.Click(imgfRes.position_center);
						sleep(2000); 
					}
					done = true;
				}
				core.SleepX(1000);
            }
		}

		//AFTER RACE
		done = false;
		core.StartTimer('race');
		while(!done && core.ElapsedSeconds('race') < 2*60) {
			img = captureScreen();
			state = core.A9State(img);
			StageCounter(state.CurrentStage);
			
            // end race
            if (state.CurrentStage == "next") {
          		core.Click(state.NextPos);
           		core.SleepX(1500);
            }     
            //else if (state.HasHeader && raced) {
            else if (state.HasHeader && raced && (["car_lobby", "mp_lobby", "daily_events_lobby", "home_page", "garage"].contains(state.CurrentStage))) {
            	if (core.ElapsedSeconds('stage') > 2)
					done = true;
            }

            //stuck protection
            if (state.CurrentStage == "unknow") {
				if (core.ElapsedSeconds('stage') > 180) {
					images.save(img, "./Images/Test/Out/stuck_"+Date.now()+'.png', "png", 100);
					return false;
				} else if (core.ElapsedSeconds('stage') > 120) {
        			core.ClosePopups();	
        			sleep(1500); 
            	} 
            }
		}

		return true;
	}
	finally
	{
	    if (img != null)
	        img.recycle();
	}
}

function DirectRace(eventName) {
	let eventProfile = core.profile[eventName];

	let img = captureScreen();
	try {
		let navigation = eventProfile["navigation"];
		let route = null;
        if (navigation != null)
            route = core.ParseNavigation(navigation);

		let car_owned_only = getProperty("car_owned_only", eventProfile, core.profile);
		let car_switch_direction = getProperty("car_switch_direction", eventProfile, core.profile);

		let done = false;
		let startTime = new Date().getTime();
		let nowTime = new Date().getTime();

		while(!done && (nowTime - startTime) < 60*1000) {

			img = captureScreen();
			state = core.A9State(img);

			//close popups
		    if (state.CurrentStage == "dialog") {
		    	if (core.ElapsedSeconds('stage') > 2)
					core.ClosePopups();
		    } 
		    else if (state.CurrentStage == "next") {
		        core.Click(state.NextPos);
		    }
		    else if (state.CurrentStage == "daily_events_lobby") {
		    	core.ClickPixelByName("golden_point");
		    	core.SleepX(1500);
		    }
		    //garage to car lobby
		    else if (state.CurrentStage == "garage") {
		    	if (car_owned_only) {
		    		core.ClickPixelByName("garage_filter");
		    		core.SleepX(1000);
		    		core.ClickPixelByName("garage_filter_by_owned");
		    		core.SleepX(500);
		    		core.ClickPixelByName("garage_filter_done");
		    		core.SleepX(1500);
		    	}
	            //select 1st car
	            if (!core.SelectCar("tl50"))
	            	core.SelectCar();
	            core.SleepX(1000);
		    }
		    //local finish
		    else if (state.CurrentStage == "car_lobby") {
		    	done = true;
		    }

			core.SleepX(1500);
		    nowTime = new Date().getTime();
		}

		if (!done)
			return false;

		if (eventProfile.preset != null && !core.GarageSelectCar(null, eventProfile.preset, car_switch_direction))
		{
			core.ClickPixelByName("setup");
			return false;
		}

		//*==Race==*/ 
		return Race(eventName);
	}
	finally
	{
	    if (img != null)
	        img.recycle();
	}
}

function exit() {
	let img = captureScreen();
	try {
		let state = core.A9State(img);

		if (state.CurrentStage != "home_page")
		    goHome("home_page");
		else {
			back();
			core.SleepX(1000);
			click(800, 740);
		}
	}
	finally
	{
	    if (img != null)
	        img.recycle();
	}
}

var lastStage = "unknow";
function StageCounter(stage)
{
	if (stage === lastStage)
		return;

	core.StartTimer('stage');
	lastStage = stage;
}

function StageSeconds()
{
	return core.ElapsedSeconds('stage')
}

function doNavComand(route, percent, delta) {
    let res = {result: false, newSigns: null, nitroManagement: null};

	if (route != null && percent >= 0 && delta >= 0)
    {
    	console.log("---< " + percent + "%"+delta+ " >---");
        for (let i = 0; i < route.length; i++) {

            let item = route[i];
            if (!item.fire && (percent - item.percent) > 5)
            {
            	item.fire = true;
            	continue;
            }	

            if (!item.fire && (percent > item.percent || (percent == item.percent && delta >= item.delta)))
            {
                item.fire = true;
                res.result = true;
                console.log(i+": "+item.percent+"%"+item.delta +" "+ item.type);

                switch (item.type) {
                	case "drift": 
                		threads.start(function(){
                			core.PressBrake(item.dur);
                		});
                		break;

                	case "drift-flash": 
	                	threads.start(function(){
							core.PressBrake(item.dur);
			                sleep(50);
			                core.PressNitro();
			                sleep(50);
			                core.PressNitro();
						});
                		break;

                	case "drift-perfect-nitro": 
                		threads.start(function(){
	                		core.PressBrake(item.dur);
		                    sleep(50);
		                    core.PressNitro();
		                    sleep(750);
		                    core.PressNitro();
	                    });
                		break;

                	case "drift-normal-nitro": 
                		threads.start(function(){
	                		core.PressBrake(item.dur);
		                    sleep(50);
		                    core.PressNitro();
	                    });
                		break;	
                	
                	case "stop-double-nitro": 
                		threads.start(function(){
	                		core.PressBrake(100);
		                    sleep(50);
		                    core.PressNitro();
		                    sleep(300);
		                    core.PressNitro();
	                    });
                		break;

                	case "stop-perfect-nitro": 
                		threads.start(function(){
	                		core.PressBrake(100);
		                    sleep(50);
		                    core.PressNitro();
		                    sleep(750);
		                    core.PressNitro();
	                    });
                		break;

                	case "stop-normal-nitro": 
                		core.PressBrake(100);
	                    sleep(50);
	                    core.PressNitro();
                		break;	
                			
                	case "stop-nitro": 
                		core.PressBrake(100);
                		break;

                	case "normal-nitro": 
                		core.PressNitro();
                		break;

                	case "perfect-nitro": 
                		threads.start(function(){
	                		core.PressNitro();
		                    sleep(750);
		                    core.PressNitro();
	                    });
                		break;

                	case "double-nitro": 
                		threads.start(function(){
		                    core.PressNitro();
		                    sleep(300);
		                    core.PressNitro();  
	                    });              	
                		break;

                	case "flash": 
                		core.PressNitro();
	                    sleep(50);
	                    core.PressNitro();

	                    if (item.dur > 0) {
	                    	for (var i = 0; i < item.dur; i++) {
	                    		sleep(100);
	                    		core.PressNitro();
	                    	}
	                    }
                		break;

                	case "360": 
                		core.PressBrake();
	                    sleep(50);
	                    core.PressBrake();

	                    if (item.dur > 0) {
	                    	for (var i = 0; i < item.dur; i++) {
	                    		sleep(100);
	                    		core.PressBrake();
	                    	}
	                    }
                		break;

                	case "360-flash": 
                		core.PressBrake();
	                    sleep(50);
	                    core.PressBrake();
	                    sleep(100);
	                    core.PressNitro();
	                    sleep(50);
	                    core.PressNitro();
	                    
	                    if (item.dur > 0) {
	                    	for (var i = 0; i < item.dur; i++) {
	                    		sleep(100);
	                    		core.PressNitro();
	                    	}
	                    }
                		break;

                	case "signs": 
                		res.newSigns = item.path;
                		break;

                	case "choose": 
                		core.SelectRouteNum(item.pos);
                		break;
                			
                	case "right": 
                		swipe(1900, 300, 2200, 300, 180);
                		break;

                	case "left": 
                		swipe(2900, 300, 1800, 300, 180);
                		break;

                	case "nitro-management-on": 
                		res.nitroManagement = true;
                		break;                		                		                		                		                		                		                		

                	case "nitro-management-off":
                		res.nitroManagement = false;   
                		break; 	
                }
            }
        }
    }

    return res;
}

// min and max included 
function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getProperty(propName, src1, src2) {
	try {
		if (src1 != null & src1[propName] != null)
	    	return src1[propName];

	    if (src2 != null & src2[propName] != null)
	    	return src2[propName];

		return null;
	} catch {
		return null;
	}
}

function getValueFrom(val) {
	if (Array.isArray(val)) 
	  return val.at(randomIntFromInterval(0, val.length-1));
	else
	  return val;
}

function doNitroAction(actType) {
	let actionType = getValueFrom(actType);
	//console.log("doNitroAction " + actionType);
	switch (actionType) {
		case "normal-nitro":
			core.PressNitro();
			break;

		case "perfect-nitro":
			core.PressNitro();
            sleep(750);
            core.PressNitro();
			break;	

		case "double-nitro":
			core.PressNitro();
            sleep(300);
            core.PressNitro();
			break;

		case "flash":
			core.PressNitro();
            core.PressNitro();
			break;	
	}
}

function doDriftAction(actType, duration) {
	let actionType = getValueFrom(actType);
	//console.log("doDriftAction " + actionType +" "+ duration);
	switch (actionType) {
		case "drift":
			core.PressBrake(duration);
			break;
		case "drift-flash":
			core.PressBrake(duration);
	        sleep(50);
	        core.PressNitro();
	        sleep(50);
	        core.PressNitro();
			break;
		case "drift-perfect-nitro":
			core.PressBrake(duration);
	        sleep(50);
	        core.PressNitro();
	        sleep(750);
	        core.PressNitro();
			break;	
	}
}

var lastCalledTime;
var fps;

function requestAnimFrame() {

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
  console.log(fps);
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('.') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function float2int (value) {
    return Math.ceil(value);
}