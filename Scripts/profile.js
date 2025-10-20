const presets = require('./presets.js');
const navs = require('./Navs/navigations.js');
const showroom_navs = require('./Navs/nav-sr-bmwi8.js');
const se_navs = require('./Navs/nav-se-porsche935.js');

module.exports = {
	//====================U=S=E=R=========================
    mp1: {
     	preset: {
		     legend:   ['C2', 'B1', 'A1', 'S1'],
		     platinum: ['C2', 'B1', 'A1', 'S1'],
		     gold:     ['C2', 'B1', 'A1', 'S1'],
		     silver:   ['C2', 'B1', 'A1'],
		     bronze:   ['D3', 'C2', 'B1']
		},
		//preset: presets.D_CLASS,
		car_owned_only: false,
		disable_league_selector: true,
		sign_set: 'ramp, ramp_left, ramp_right',
		auto_nitro: presets.PERFECT_NITRO,
		auto_drift: presets.MEDIUM_DRIFT,

		auto_drift_enable_at_msec: 15000,   	//in ms
	    //auto_drift_disable_after: 93,  		//in track %

		auto_nitro_enable_at_msec: 2000,    	//in ms
	    //auto_nitro_disable_after: 90, 	//in track %
	    car_switch_direction: "left",
    },
    downgrade1: {
    	preset: presets.D_CLASS,
    	car_owned_only: true,
    	car_switch_direction: "right",
    	disable_league_selector: true,
		sign_set: '',
    },
    mp2: {
    	preset: {
		    // legend:   ['B4', 'A4', 'S4'],
		    // platinum: ['B4', 'A4', 'S4'],
		    // gold:     ['B4', 'A4', 'S4'],
		    // silver:   ['B4', 'A4', 'S4'],
		    // bronze:   ['B4', 'A4', 'S4'],
		    legend:   ['D2', 'C2', 'B1', 'A1', 'S1'],
		    platinum: ['D2', 'C2', 'B1', 'A1', 'S1'],
		    gold:     ['D2', 'C2', 'B1', 'A1', 'S1'],
		    silver:   ['D2', 'C2', 'B1', 'A1', 'S1'],
		    bronze:   ['D2', 'C2', 'B1', 'A1', 'S1'],
		},
    	car_owned_only: true,
		car_switch_direction: "right",
		
		sign_set: 'ramp, ramp_left, ramp_right',
		auto_nitro: presets.SS_NITRO,
		auto_drift: presets.SHORT_DRIFT,
		sign_set_click_limiter: 1800,

		auto_drift_enable_at_msec: 20000,   	//in ms
	    auto_drift_disable_after: 90,  		//in track %

		auto_nitro_enable_at_msec: 4000,    	//in ms
    },
    mp3: {
    	preset: presets.ANY,
    	//car_owned_only: true,
		sign_set: 'ramp, ramp_left, ramp_right',
		auto_nitro: presets.SS_NITRO,
		auto_drift: null,
		sign_set_click_limiter: 1800,
		watchAds: true,
		forceMode: true,
    },
    downgrade3: {
    	preset: presets.ANY,
    	car_owned_only: false,

		sign_set: 'ramp, ramp_left, ramp_right',
		auto_nitro: presets.SS_NITRO,
		auto_drift: null,
		sign_set_click_limiter: 1800,
		forceMode: true,
    },
    hunt: {
    	preset: ['D3'],
		sign_set: '',
		navigation: navs.CAIRO_SUBTERRANEAN_DASH_B,
		sign_set_click_limiter: 1200,
		auto_nitro: null,
		auto_drift: null,
		car_switch_direction: "right",
		//car_owned_only: true,
		watchAds: true,
		//forceMode: true,
    },
    epic: {
    	preset: ['A0'],
		sign_set: '',
		navigation: navs.Tuscany_VERSATILE_TRAIL,
		sign_set_click_limiter: 1200,
		auto_nitro: null,
		auto_drift: null,
		watchAds: true,
		forceMode: true,
    },
    star: {
    	preset: ['S0'],
		sign_set: 'ramp, ramp_left, ramp_right',
		navigation: navs.GREENLAND_JOURNEY_TO_THE_CENTER,
		sign_set_click_limiter: 1200,
		auto_nitro: null,
		auto_drift: null,
		//car_switch_direction: "right",
		//car_owned_only: true,
		watchAds: true,
		forceMode: true,
    },
    free: {
    	preset: ['B0'],
		sign_set: 'tunnel, dir_left, ramp_left, ramp_right',
		navigation: null,
		sign_set_click_limiter: 1200,
		auto_nitro: presets.PERFECT_NITRO,
		auto_drift: null,
		watchAds: true,
    },   
    race: {
		sign_set: 'ramp, ramp_left, ramp_right',
		sign_set_click_limiter: 1200,
		navigation: null,
		
		auto_nitro_enable_at_msec: 0,
		auto_nitro_disable_after: null,
		auto_nitro: null,

		auto_drift_enable_at_msec: 0,
		auto_drift_disable_after: null,
		auto_drift: {
	        drift_min: 2500,
	        drift_max: 4000,
	        rand_min: 6000,
	        rand_max: 8000,
	        type: ["drift-flash", "360"]
	    },

		//watchAds: true,
		forceMode: true,
    },  
	showroom: {
		preset: ['D1', 'C1'],
		sign_set: '',
		sign_set_click_limiter: 1300,
		stage: "stage13",
		navigation: showroom_navs.BMWI8_STAGE_13,
		auto_nitro: null,
		auto_drift: null,
		watchAds: true,
		forceMode: true,		
	}, 
    porsche935: {
     	preset: ['A6'],
		sign_set: '',
		sign_set_click_limiter: 1300,
		navigation: navs.Shanghai_REACH_FOR_THE_SKY,
		stage: "stage6",
		auto_nitro: null,
		auto_drift: null,
		forceMode: true,
		watchAds: true,
		//tdOff: true,
    }, 	

	//=================D=E=F=A=U=L=T======================
    sleep_extender: 0,
    car_switch_speed: 300,
    car_black_list: presets.HIDE_CARS,
    //car_owned_only: true,
    //car_switch_direction: "left",
    avoid_sign_set: "!barrier, !obstacle",
    sign_set_click_limiter: 2500,
    watchAds: true,
    fixOrientation: true,

    auto_drift_enable_at_msec: 10000,   	//in ms
    auto_drift_disable_after: null,     //in track %

	auto_nitro_enable_at_msec: 0,    	//in ms
    auto_nitro_disable_after: null, 	//in track %

    //==================S=Y=S=T=E=M=======================
    appId: 'com.gameloft.android.ANMP.GloftA9HM',
    //appId: 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI',
    screen_width: 2340,
    screen_height: 1080,

	back: { x: 120, y: 56, color: '#7e7e80', diff: 1 },
	a_tokens: { x: 1482, y: 51, color: '#0090ff' },
	c_tokens: { x: 1847, y: 51, color: '#ffc600' },
	home: { x: 100, y: 50, color: '#c800ff' },
	setup: { x: 2231, y: 57, color: '#fcfcfd', diff: 4 },

	tab1: { x: 340, y: 910, color: '#ffffff' },
	tab2: { x: 680, y: 910, color: '#ffffff' },
	tab3: { x: 1020, y: 910, color: '#ffffff' },
	tab4: { x: 1360, y: 910, color: '#ffffff' },
	tab5: { x: 1700, y: 910, color: '#ffffff' },
	
	explore_events: { x: 2100, y: 760, color: '#ffd400', diff: 3 },
//	de_tickets: { x: 2012, y: 210, color: '#ffffff' },
//	rewards: { x: 680, y: 900, color: '#ffffff' },
//	leaderboard: { x: 190, y: 900, color: '#ffffff' },
//	milestones: { x: 1170, y: 900, color: '#ffffff' },
	mp_play: { x: 1900, y: 940, color: '#ffd400' },
	golden_point: { x: 2080, y: 900, color: '#ffd400', diff: 3 },
	mpScanLineY: 189,	
	race_pause: { x: 200, y: 120, color: '#ffffff' },

	mp1_league_marker_unranked: { x: 175, y: 15, color: '#d4b56d', diff: 4 },
	mp1_league_marker_bronze: { x: 175, y: 15, color: '#e19861', diff: 4 },
	mp1_league_marker_silver: { x: 175, y: 15, color: '#3cb6ec', diff: 4 },
	mp1_league_marker_gold: { x: 175, y: 15, color: '#fde825', diff: 4 },
	mp1_league_marker_platinum: { x: 175, y: 15, color: '#b275f0', diff: 4 },
	mp1_league_marker_legend: { x: 175, y: 15, color: '#f6e2a3', diff: 4 },

	mp1_league_selector_bronze: { x: 1400, y: 240, color: '#000000' },
	mp1_league_selector_silver: { x: 1515, y: 240, color: '#000000' },
	mp1_league_selector_gold: { x: 1630, y: 240, color: '#000000' },
	mp1_league_selector_platinum: { x: 1750, y: 240, color: '#000000' },
	mp1_league_selector_legend: { x: 1870, y: 240, color: '#000000' },

	mp2_league_marker_unranked: { x: 136, y: 26, color: '#666666', diff: 4 },
	mp2_league_marker_bronze: { x: 136, y: 26, color: '#078460', diff: 4 },
	mp2_league_marker_silver: { x: 136, y: 26, color: '#078460', diff: 4 },
	mp2_league_marker_gold: { x: 136, y: 26, color: '#fde825', diff: 4 },
	mp2_league_marker_platinum: { x: 136, y: 26, color: '#b275f0', diff: 4 },
	mp2_league_marker_legend: { x: 136, y: 26, color: '#f6e2a3', diff: 4 },

	mp2_league_selector_bronze: { x: 1760, y: 240, color: '#000000' },
	mp2_league_selector_silver: { x: 1875, y: 240, color: '#000000' },
	mp2_league_selector_gold: { x: 1760, y: 240, color: '#000000' },
	mp2_league_selector_platinum: { x: 1760, y: 240, color: '#000000' },
	mp2_league_selector_legend: { x: 1760, y: 240, color: '#000000' },

	mp3_league_marker_unranked: { x: 109, y: 100, color: '#00a2f6', diff: 4 },
	mp3_league_marker_bronze: { x: 109, y: 100, color: '#00a2f6', diff: 4 },

	mp3_league_selector_bronze: { x: 1860, y: 220, color: '#000000' },
	mp3_league_selector_silver: { x: 1860, y: 220, color: '#000000' },

	garage_filter: { x: 2052, y: 194, color: '#000000' },
	garage_filter_by_owned: { x: 696, y: 387, color: '#000000' },
	garage_filter_done: { x: 524, y: 901, color: '#000000' },

	daily_events_lobby: { x: 2172, y: 292, color: '#1c0b34', diff: 3 },
	car_lobby_marker1: { x: 264, y: 381, color: '#ffffff' },
	car_lobby_marker2: { x: 281, y: 640, color: '#ffffff' },
	car_lobby_td_on: { x: 1606, y: 935, color: '#ffffff' },

    car_star_1: { x: 428, y: 230, color: "#ffef5b", diff: 5 }, 
    car_star_2: { x: 470, y: 230, color: "#ffef59", diff: 5 }, 
    car_star_3: { x: 512, y: 230, color: "#ffef56", diff: 5 }, 
    car_star_4: { x: 554, y: 230, color: "#ffee54", diff: 5 }, 
    car_star_5: { x: 596, y: 230, color: "#ffed51", diff: 5 }, 
    car_star_6: { x: 640, y: 230, color: "#fff05e", diff: 5 }, 

    //Buttons that determine whether the car is available for the race or not 
    //need star up
    car_skip: { x: 2257, y: 860, color: "#fcfcfc", diff: 3 }, 
    //need blueprints or key 
    need_upgrade: { x: 1870, y: 900, color: "#000000" }, 

	car_shift_left: { x: 843, y: 508, color: "#202020", diff: 5 }, 
	car_shift_right: { x: 2105, y: 507, color: "#1e1e1e" }, 
	car_hash_region: [267, 160, 84, 94],

	race_marker1: { x: 170, y: 100, color: '#ffffff' },
	race_marker2: { x: 453, y: 218, color: '#c3fb12', diff: 3 },
	//race_marker2: { x: 452, y: 187, color: '#c3fb12' }, //for DS

	//race_route_region: [910, 185, 520, 100],
	race_route_region: [890, 185, 560, 100],
	race_td_on: { x: 425, y: 200, color: "#c3fb12" }, 

	prc_num_1: [
	 	{ x: 470, y:143, blank: [4, 5, 6], dirty: [ 0, 1, 2, 3, 7, 8, 9] },
	 	{ x: 465, y:159, blank: [2, 7], dirty: [ 0, 1, 3, 4, 5, 6, 8, 9] },
	 	{ x: 461, y:152, blank: [0, 1, 4, 7 ], dirty: [ 2, 3, 5, 6, 8] },
	 	{ x: 461, y:146, blank: [0, 1, 2, 3, 5, 6, 7, 8, 9], dirty: [ 4] },
	 	{ x: 459, y:154, blank: [0, 1, 4, 7], dirty: [ 2, 9] },
	 	{ x: 454, y:166, blank: [1, 4], dirty: [ 0, 2, 3, 5, 6, 7, 8, 9] }, 
	 	{ x: 451, y:161, blank: [3, 5, 7, 9], dirty: [ 0, 6, 8] }, 
	 	{ x: 455, y:147, blank: [2, 3, 7], dirty: [ 0, 6, 8, 9] }, 
	],

	prcLightColor: '#bbbbbb',
	prcLightThreshold: 70,
	prcDarkColor: '#000000',
	prcDarkThreshold: 100
}
