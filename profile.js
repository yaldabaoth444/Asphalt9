// Whether the legendary, platinum, gold, silver, and bronze cars are available, true means available, false means unavailable
var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mpStatus    = [ false,    false,      true,  true,     true];

var mpCarPick = {
    legend: [1, 2, 3, 4],
    platinum: [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16],
    gold: [1,3,2],
    silver: [1,2,3],
    bronze: [5,7,3]
};
var mpCarPickSS = {
    legend: [1, 2, 3, 4],
    platinum: [1,2,4,5,6,7,9,11,12,13,14,15],
    gold: [6,8,11,12,13,18,20,22,23,24,26], 
    silver: [21,22,23,20,19,15,14,16,7], //ss
    bronze: [21,19,15,13] //ss
};
var mp2LevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mp2Status    = [ false,    false,      false,  false,    true];

var mp2CarPick = {
    // legend
    legend: [1, 2, 3, 4],
    // platinum
    platinum: [1, 2, 3, 4],
    // gold
    gold: [13, 14,15,16,18,20,22,23],
    // silver
    silver: [1,2,3],
    // bronze
    bronze: [1,2,3,4,5,6,7,8]
};
var chCarPick = [11,13,17,19,21,23,26,27,29];
//var simpleRouteSelector = ['ramp.png', 'ramp_left', 'ramp_right'];
module.exports = {
    traceOn: false,
    width: 2340,
    height: 1080,
    accountType: "google",
    networkGamesCount: 2,
    specialPage: 2,
    eventPage: 3,
    networkPage: 4,
    carHuntPosition: 6, // negative values mean from the end
    adCloserFolder: './Images/AdCloser/', 
    routeSelector: './Images/TrafficSigns/',
    // Multiplayer 1 data
    mp1: {
        levelName : mpLevelName,
        status : mpStatus,
        carPick : mpCarPick,
        game: 1,
        carPickMode: "ordinary"
    },
    // Multiplayer 2 data
    mp2: {
        levelName : mp2LevelName,
        status : mp2Status,
        carPick : mp2CarPick,
        game: 2,
        carPickMode: "ordinary",
        carPickSwipeLimit: 1,
    },
    // Start button
    ch:{
        start: { x: 1743, y: 900, color: '#c3fb12' },
        carPick : chCarPick,
        carPickMode: "down",
        noTicketLeft: { x: 171, y: 938, color: '#1c5ab1'},
		noTicketRight: { x: 2172, y:938, color: '#1c5ab1'},

        specialSelector: { x: 486, y:606, color: '#fc0155'},
        specialSelected: { x: 1218, y:246, color: '#ed2c23'},
        specialHunt: { x: 578, y:909, color: '#0e7c9c'},
        specialStart: { x: 1857, y: 729, color: '#c3fb12' },
        specialNext: { x: 1746, y: 927, color: '#c3fb12' },
    },
    common: {
        // The top token icon = #0090ff blue, there will be color difference
        token: { x: 1482, y: 54, color: '#0090ff' },
        
        // The top integral icon = #ffc600||#ffc500 yellow
        credit: { x: 1846, y: 55, color: '#ffc600' },
        
        // Back button = #ffffff white
        back: { x: 25, y: 25, color: '#ffffff' },
    
        // <tip=#010101 black in the return button
        backward: { x: 110, y: 52, color: '#171717' },
        
        racePause: { x: 170, y: 65, color: '#ffffff' },
        raceTD: { x: 380, y: 192, color: '#3daaed' },
        raceTime: { x: 1906, y: 173, color: '#e81b60' },
        
        //pages: { x: 427, y: 1013, light: '#ffffff', dark: '#15151d', delta: 362 },
        pagesMarker:  { x: 263, y: 884,  color: '#ff0054', delta: 362, pressXOffset: 0, pressYOffset: 80 },
        eventsMarker: { x: 263, y: 1055, color: '#c3fb12', delta: 281, pressXOffset: 0, pressYOffset: -200 },
    },
    mp: {
        // Start button
        start: { x: 1700, y: 950, color: '#c3fb12' },
        reward: { x: 480, y: 740, color: '#ffffff' }, 
        rate: { x: 576, y: 911, color: '#ffffff' },
        stage: { x: 1475, y: 739, color: '#ffffff' },
        
        // Multiplayer above>tip=#ffffff white, y will change when multiplayer matches are adjusted
        game1of2: { x: 2186, y: 260, color: '#ffffff' },
        // Multiplayer below>tip=#ffffff, y will change when multiplayer matches are adjusted
        game2of2: { x: 2186, y: 668, color: '#ffffff' },
        
        continue1: { x: 1590, y: 890, color: '#c3fb12' },
        continue2: { x: 1590, y: 890, color: '#ffffff' },
        continue3: { x: 1640, y: 875, color: '#c3fb12' },
        continue4: { x: 1874, y: 898, color: '#ffffff' }, //league up  
        
        continue5: { x: 1945, y: 904, color: '#ffffff' }, //reward
        continue6: { x: 1741, y: 899, color: '#000921' }, //inverted
        
        advert1: { x: 1460, y: 825, color: '#9bff01' },
        
        // Start, continue
        goldenPoint: { x: 2138, y: 921, color: '#c3fb12' },
        
		errorleft: { x: 276, y: 816, color: '#2358a6'},
		errorright: { x: 2064, y:806, color: '#2c5394'},
        
        clubleft: { x: 406, y:704, color: '#ffffff'},
        clubright: { x: 1417, y:704, color: '#c3fb12'},
        
        leaguedownleft: { x: 440,  y: 908, color: '#1c5ab1' }, //league down 2458a4
        leaguedownright: { x: 1897,  y: 913, color: '#1c59b1' }, //league down 2158a8
        
        networkErrorLeft: { x: 299, y: 816, color: '#2358a6'},
		networkErrorRight: { x: 2040, y:816, color: '#2458a4'},
        
    },
    garage: {
        start: { x: 1800, y: 888, color: '#c3fb12' },
        istart: { x: 1800, y: 888, color: '#000921' },
        speed: { x: 245, y: 430, color: '#33effa' },
        accel: { x: 245, y: 530, color: '#33effa' },
        handl: { x: 245, y: 630, color: '#33effa' },
        nitro: { x: 245, y: 730, color: '#33effa' },
        ready:  { x: 1664, y: 914, color: '#fd0154' },
        
        // league buttons
        bronze: { x: 1566, y: 248, color: '#ce7145' },
        silver: { x: 1700, y: 248, color: '#365ca3' },
        gold: { x: 1835, y: 248, color: '#d78f23' },
        platinum: { x: 1970, y: 248, color: '#5d3eb6' },
        legend: { x: 2105, y: 248, color: '#3f3f3d' },
        swipeDuration: 1500,

        // current league
        league: { x: 740, y: 500, colorUnranked: '#ff0026', colorBronze: '#d98560', colorSilver: '#96b2d4', colorGold: '#f2cb30', colorPlatinum: '#000000', colorLegend: '#f6e2a5'},
        
        // First car
        firstCar: { x: 406, y: 633, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distance: { x: 674, y: 345, inertia: 30 }, //26-60fps
        
        // First car
        firstCarFlat: { x: 223, y: 640, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distanceFlat: { x: 696, y: 357, inertia: 30 }, //26-60fps
    }
}   
//////////////////////////////////////////