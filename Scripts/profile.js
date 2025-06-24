const presets = require('./presets.js');
const navs = require('./Navs/navigations.js');
const showroom_navs = require('./Navs/nav-sr-sr01.js');
//const se_navs = require('./Navs/nav-se-ultima.js');

module.exports = {
	//====================U=S=E=R=========================
    mp1: {
     	preset: {
		     legend:   ['C5', 'B5', 'A5', 'S5'],
		     platinum: ['C5', 'B5', 'A5', 'S5'],
		     gold:     ['C5', 'B5', 'A4', 'S4'],
		     silver:   ['C4', 'B4', 'A3'],
		     bronze:   ['D3', 'C3', 'B3']
		},
		//preset: presets.D_CLASS,
		car_owned_only: false,
		disable_league_selector: true,
		sign_set: 'ramp, ramp_left, ramp_right',
		auto_nitro: presets.PERFECT_NITRO,
		auto_drift: presets.MEDIUM_DRIFT,

		auto_drift_enable_at_sec: 15000,   	//in ms
	    //auto_drift_disable_after: 93,  		//in track %

		auto_nitro_enable_at_sec: 2000,    	//in ms
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
		    legend:   ['D5', 'C5'],
		    platinum: ['D5', 'C5'],
		    gold:     ['D5', 'C5'],
		    silver:   ['D5', 'C5'],
		    bronze:   ['D5', 'C5'],
		},
    	car_owned_only: true,

		sign_set: 'ramp, ramp_left, ramp_right',
		auto_nitro: presets.SS_NITRO,
		auto_drift: presets.SHORT_DRIFT,
		sign_set_click_limiter: 1800,

		auto_drift_enable_at_sec: 20000,   	//in ms
	    auto_drift_disable_after: 90,  		//in track %

		auto_nitro_enable_at_sec: 4000,    	//in ms
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
    	preset: ['C5'],
		sign_set: 'ramp, ramp_left, ramp_right',
		navigation: navs.SAN_FRANCISCO_CITY_DASH,
		sign_set_click_limiter: 1500,
		auto_nitro: null,
		auto_drift: null,
		//car_switch_direction: "right",
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
		sign_set: '',
		sign_set_click_limiter: 1200,
		navigation: navs.CAIRO_TOWER_FINISH_A,
		
		auto_nitro_enable_at_sec: 0,
		auto_nitro_disable_after: null,
		auto_nitro: null,

		auto_drift_enable_at_sec: 10000,
		auto_drift_disable_after: null,
		auto_drift: null,

		watchAds: true,
		forceMode: true,
    },  
	showroom: {
		preset: ['C1'],
		sign_set: 'ramp, ramp_left, ramp_right, bottle, bottle2',
		sign_set_click_limiter: 1200,
		stage: "stage10",
		navigation: showroom_navs.SR01_STAGE_10,
		auto_nitro: null,
		auto_drift: null,
		watchAds: true,
		forceMode: true,		
	}, 
	sonic: {
     	preset: ['B1'],
		sign_set: '',
		sign_set_click_limiter: 1200,
		navigation: navs.SONIC_STAGE_7,
		stage: "stage7",
		auto_nitro: null,
		auto_drift: null,
		forceMode: true,
		watchAds: true,
		tdOff: true,
    }, 
    nevera: {
     	preset: ['S2'],
		sign_set: '',
		sign_set_click_limiter: 1300,
		navigation: navs.Greenland_ICY_LOOP,
		stage: "stage2",
		auto_nitro: null,
		auto_drift: null,
    }, 	
/*	
    srw12: {
     	preset: ['B1'],
		sign_set: '',
		sign_set_click_limiter: 1200,
		navigation: showroom_navs.W12_STAGE_4,
		stage: "stage4",
		auto_nitro: null,
		auto_drift: null,
		forceMode: true,
    }, 	
    zonda: {
     	preset: ['A6'],
		sign_set: '',
		sign_set_click_limiter: 800,
		navigation: navs.ROME_TIBER_CROSS,
		stage: "stage6",
		auto_nitro: null,
		auto_drift: null,
    }, 
   	ultima: {
		sign_set: 'ramp_left, ramp_right, bottle, bottle2',
		sign_set_click_limiter: 2200,
		navigation: se_navs.ULTIMA_STAGE_6,
		stage: "stage6",
		auto_nitro: null,
		auto_drift: null,
		forceMode: true,
    }, */

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

    auto_drift_enable_at_sec: 10000,   	//in ms
    auto_drift_disable_after: null,     //in track %

	auto_nitro_enable_at_sec: 0,    	//in ms
    auto_nitro_disable_after: null, 	//in track %

    //==================S=Y=S=T=E=M=======================
    appId: 'com.gameloft.android.HUAW.GloftA9HW.HUAWEI',
    screen_width: 2340,
    screen_height: 1080,

	back: { x: 122, y: 52, color: '#010101', diff: 1 },
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

	daily_events_lobby: { x: 20, y: 400, color: '#100926', diff: 3 },
	car_lobby_marker1: { x: 264, y: 381, color: '#ffffff' },
	car_lobby_marker2: { x: 281, y: 640, color: '#ffffff' },
	car_lobby_td_on: { x: 1715, y: 920, color: '#ffffff' },

    car_star_1: { x: 428, y: 230, color: "#ffef5b", diff: 5 }, 
    car_star_2: { x: 470, y: 230, color: "#ffef59", diff: 5 }, 
    car_star_3: { x: 512, y: 230, color: "#ffef56", diff: 5 }, 
    car_star_4: { x: 554, y: 230, color: "#ffee54", diff: 5 }, 
    car_star_5: { x: 596, y: 230, color: "#ffed51", diff: 5 }, 
    car_star_6: { x: 640, y: 230, color: "#fff05e", diff: 5 }, 

    //Buttons that determine whether the car is available for the race or not 
    //can Play
    car_can_go: { x: 1787, y: 870, color: "#b275ee", diff: 5 }, 
    //need star up
    car_skip: { x: 2257, y: 843, color: "#ffffff", diff: 2 }, 
    //need blueprints or key 
    need_upgrade: { x: 1870, y: 900, color: "#000000" }, 

	car_shift_left: { x: 843, y: 508, color: "#202020", diff: 5 }, 
	car_shift_right: { x: 2105, y: 507, color: "#1e1e1e" }, 
	car_hash_region: [267, 160, 84, 94],

	//race_marker: { x: 455, y: 222, color: '#c3fb12', diff: 3 },
	race_marker: { x: 431, y: 215, color: '#c3fb12', diff: 3 },
	//race_route_region: [910, 185, 520, 100],
	race_route_region: [890, 185, 560, 100],
	race_td_on: { x: 425, y: 200, color: "#c3fb12" }, 

	prc_num_1: [
	 	{ x: 468, y:148, blank: [5, 6], dirty: [ 0, 1, 2, 3, 8, 9] },
	 	{ x: 462, y:154, blank: [0], dirty: [ 3, 7, 8, 9] },
	 	{ x: 457, y:160, blank: [0, 1, 3, 5, 6, 8, 9 ], dirty: [ 4, 7] },
	 	{ x: 455, y:166, blank: [1, 4], dirty: [ 0, 2, 3, 5, 6, 8, 9] },
	 	{ x: 464, y:160, blank: [2, 7], dirty: [ 0, 1, 3, 4, 5, 6, 8, 9] },
	 	{ x: 461, y:166, blank: [7], dirty: [ 1, 2, 4] }, 
	 	{ x: 451, y:153, blank: [3], dirty: [ 9] }, 
	 	{ x: 446, y:161, blank: [3], dirty: [ 8] },
	 	{ x: 447, y:159, blank: [5, 9], dirty: [ 6, 8] },
	],

	prcLightColor: '#bbbbbb',
	prcLightThreshold: 70,
	prcDarkColor: '#000000',
	prcDarkThreshold: 100
}
