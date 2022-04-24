const navs = require('./navigations.js');
// Whether the legendary, platinum, gold, silver, and bronze cars are available, true means available, false means unavailable
var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mpStatus    = [ true,    true,      true,  true,     true];
var mpCarPickABC = {
    legend: ['B5', 'A5', 'S5'],
    platinum: ['C5', 'B5', 'A4'],
    gold: ['C4', 'B4'],
    silver: ['D4', 'C4'],
    bronze: ['D4']
};
var mpCarPick = {
    legend: [1, 2, 3, 4],
    platinum: [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16],
    gold: [1,2,3,4,6,5,10,11,12,16],
    silver: [7,8,9,11,12,13,14,6,5,4,3,2,1],
    bronze: [13,16,22]
};
var mpCarPickSS = {
    legend: [1, 2, 3, 4],
    platinum: [1,2,4,5,6,7,9,11,12,13,14,15],
    gold: [17,8,11,10,18,21,3,15,6,4,2,1,5], 
    silver: [7,8,9,11,13,14,12,16,4,6,1,2,3,5], //ss
    bronze: [15,13,22] //ss
};
var mp2LevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mp2Status    = [ false,    false,      false,  false,    true];

var mp2CarPick = {
    // legend
    legend: [1, 2, 3, 4],
    // platinum
    platinum: [1, 2, 3, 4],
    // gold
    gold: [1,2,3,4],
    // silver
    silver: [1,2,3,4],
    // bronze
    bronze: [1,2,3,4,5,6,7,8]
};
var mp2CarPickABC = {
    legend: ['D0', 'C0', 'B0', 'A0', 'S0'],
    platinum: ['D0', 'C0', 'B0', 'A0', 'S0'],
    gold: ['D0', 'C0', 'B0', 'A0', 'S0'],
    silver: ['D0', 'C0', 'B0', 'A0', 'S0'],
    bronze: ['D0', 'C0', 'B0', 'A0', 'S0']
};
var chCarPick = [32,35];
var chCarPickABC = ['D4'];
//var simpleRouteSelector = ['ramp.png', 'ramp_left', 'ramp_right'];

module.exports = {
    traceOn: false,
    width: 2280,
    height: 1080,
    accountType: "google",
    networkGamesCount: 2,
    specialPage: 2,
    eventPage: 3,
    networkPage: 4,
    carHuntPosition: 8, // negative values mean from the end
    adCloserFolder: './Images/AdCloser/', 
    signsFolder: './Images/TrafficSigns/',
    //mpSignSet: 'ramp, ramp_left, ramp_right',
    //huntSignSet: 'ramp, ramp_left, ramp_right',
    huntSESignSet: 'ramp, ramp_left, ramp_right',
    // Multiplayer 1 data
    mp1: {
        levelName : mpLevelName,
        status : mpStatus,
        carPick : mpCarPickABC,
        game: 1,
        carPickMode: "ordinary-abc",
        nitroTick: 900 //900-perfect|300-double
    },
    // Multiplayer 2 data
    mp2: {
        levelName : mp2LevelName,
        status : mp2Status,
        carPick : mp2CarPickABC,
        game: 2,
        carPickMode: "ordinary-abc",
        //carPickSwipeLimit: 4,
        nitroTick: 300 //900-perfect|300-double        
    },
    // Start button
    ch:{
        start: { x: 1744, y: 904, color: '#c3fb12' },
        carPick : chCarPickABC,
        carPickMode: "flat-abc",
        noTicketLeft: { x: 171, y: 938, color: '#1c5ab1'},
		noTicketRight: { x: 2172, y:938, color: '#1c5ab1'},

        specialSelector: { x: 486, y:606, color: '#fc0155'},
        specialSelected: { x: 1218, y:246, color: '#ed2c23'},
        specialHunt: { x: 578, y:909, color: '#0e7c9c'},
        specialStart: { x: 1857, y: 729, color: '#c3fb12' },
        specialNext: { x: 1746, y: 927, color: '#c3fb12' },
        //navigation: navs.The_Caribbean_ISLET_RACE,
        nitroTick: 900 //900-perfect|300-double
    },
    common: {
        // The top token icon = #0090ff blue, there will be color difference
        token: { x: 1445, y: 54, color: '#0090ff' }, /*!*/
        
        // The top integral icon = #ffc600||#ffc500 yellow
        credit: { x: 1803, y: 54, color: '#ffc600' }, /*!*/
        
        // Back button = #ffffff white
        back: { x: 25, y: 25, color: '#ffffff' }, /*!*/
    
        // <tip=#010101 black in the return button
        backward: { x: 102, y: 51, color: '#101010' }, /*!*/
        
        racePause: { x: 159, y: 90, color: '#ffffff' }, /*!*/
        raceTD: { x: 296, y: 192, color: '#3ea8eb' }, /*!*/
        raceTime: { x: 1881, y: 173, color: '#ffffff' }, /*!*/
        
        //pages: { x: 427, y: 1013, light: '#ffffff', dark: '#15151d', delta: 362 },
        pagesMarker:  { x: 250, y: 886,  color: '#f40152', delta: 356, pressXOffset: 0, pressYOffset: 80 },   /*!*/
        eventsMarker: { x: 260, y: 1054, color: '#c3fb12', delta: 281, pressXOffset: 0, pressYOffset: -200 }, /*!*/
    },
    mp: {
        // Start button
        start: { x: 1181, y: 914, color: '#c3fb12' }, /*!*/
        reward: { x: 467, y: 738, color: '#ffffff' }, /*!*/
        rate: { x: 560, y: 910, color: '#ffffff' },   /*!*/
        stage: { x: 1442, y: 738, color: '#ffffff' }, /*!*/
        
        // Multiplayer above>tip=#ffffff white, y will change when multiplayer matches are adjusted
        game1of2: { x: 2165, y: 293, color: '#fefefe' }, /*!*/
        // Multiplayer below>tip=#ffffff, y will change when multiplayer matches are adjusted
        game2of2: { x: 2165, y: 691, color: '#fbfbfb' }, /*!*/
        
        continue1: { x: 1596, y: 879, color: '#c3fb12' }, /*!*/
        continue2: { x: 1550, y: 893, color: '#ffffff' }, /*!*/
        continue3: { x: 1551, y: 893, color: '#c3fb12' }, /*!*/
        continue4: { x: 1828, y: 904, color: '#ffffff' }, /*!*///league up  
        
        continue5: { x: 1898, y: 910, color: '#ffffff' }, /*!*///reward
        continue6: { x: 1538, y: 878, color: '#c3fb12' }, /*!*/
        
        advert1: { x: 1460, y: 825, color: '#9bff01' },
        
        // Start, continue
        goldenPoint: { x: 2106, y: 917, color: '#c3fb12' }, /*!*/
        
		errorleft: { x: 276, y: 816, color: '#2358a6'},
		errorright: { x: 2064, y:806, color: '#2c5394'},
        
        clubleft: { x: 406, y:704, color: '#ffffff'},
        clubright: { x: 1417, y:704, color: '#c3fb12'},
        
        leaguedownleft: { x: 430,  y: 903, color: '#1c5ab2' }, /*!*///league down 2458a4
        leaguedownright: { x: 1849,  y: 903, color: '#1c5ab2' }, /*!*///league down 2158a8
        
        networkErrorLeft: { x: 267, y: 869, color: '#1c5ab2'}, /*!*/
		networkErrorRight: { x: 2012, y:869, color: '#1c5ab2'}, /*!*/
        
    },
    garage: {
        start: { x: 1800, y: 888, color: '#c3fb12' }, /*!*/
        istart: { x: 1800, y: 888, color: '#000921' }, /*!*/
        
        star1: { x: 301, y: 146, color: "#ffeb58" }, /*!*/
        star2: { x: 343, y: 146, color: "#ffee5a" }, /*!*/
        star3: { x: 381, y: 146, color: "#ffea57" }, /*!*/
        star4: { x: 422, y: 146, color: "#ffe957" }, /*!*/
        star5: { x: 462, y: 146, color: "#ffea57" }, /*!*/
        star6: { x: 503, y: 146, color: "#ffe957" }, /*!*/
        
        isClassA: { x: 2099, y: 218, color: "#182633" }, /*!*/
        isClassBS: { x: 2100, y: 206, color: "#162431" }, /*!*/
        isClassB: { x: 2110, y: 200, color: "#162431" }, /*!*/
        isClassD: { x: 2112, y: 208, color: "#162431" }, /*!*/ 

        canGo1: { x: 1631, y: 919, color: "#fd0859" }, /*!*/
        cantGo1: { x: 1765, y: 895, color: "#ffffff" }, /*!*/
        cantGo2: { x: 2245, y: 920, color: "#000000" }, /*!*/

        // league buttons
        bronze: { x: 1432, y: 230, color: '#xxxxxx' }, /*!*/
        silver: { x: 1563, y: 230, color: '#xxxxxx' }, /*!*/
        gold: { x: 1695, y: 230, color: '#xxxxxx' }, /*!*/
        platinum: { x: 1822, y: 230, color: '#xxxxxx' }, /*!*/
        legend: { x: 1958, y: 230, color: '#xxxxxx' }, /*!*/
        swipeDuration: 1500,
        switchSpeed: 1000, /*!*/

        // current league
        league: { x: 740, y: 500, colorUnranked: '#ff0026', colorBronze: '#d98560', colorSilver: '#96b2d4', colorGold: '#f2cb30', colorPlatinum: '#000000', colorLegend: '#f6e2a5'}, /*!*/
        
        // First car
        firstCar: { x: 396, y: 630, colorFull: '#c3fb13', colorEmpty: '#ff0054' }, /*!*/

        // Vehicle spacing
        distance: { x: 678, y: 349, inertia: 12 }, //26-60fps /*!*/
        
        // First car
        firstCarFlat: { x: 223, y: 640, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distanceFlat: { x: 696, y: 357, inertia: 12}, //26-60fps
    }
}   
//////////////////////////////////////////
