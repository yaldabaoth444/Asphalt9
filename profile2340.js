var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
// Whether the legendary, platinum, gold, silver, and bronze cars are available, true means available, false means unavailable
var mpStatus = [
    // legend
    false, 
    // platinum
    false, 
    // gold
    true, 
    // silver
    true, 
    // bronze
    true
];
var mpCarPick = {
    // legend
    legend: [1, 2, 3, 4],
    // platinum
    platinum: [1, 2, 3, 4],
    // gold
    gold: [13, 14,15,16,18,20,22,23],
    // silver
    silver: [8, 10, 11, 12, 13, 15],
    // bronze
    bronze: [7, 11, 14]
};
var mp2LevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mp2Status = [
    // legend
    false, 
    // platinum
    false, 
    // gold
    false, 
    // silver
    false, 
    // bronze
    true
];
var mp2CarPick = {
    // legend
    legend: [1, 2, 3, 4],
    // platinum
    platinum: [1, 2, 3, 4],
    // gold
    gold: [13, 14,15,16,18,20,22,23],
    // silver
    silver: [5, 8, 10, 11, 12, 13, 15],
    // bronze
    bronze: [1, 2, 3]
};
var chCarPick = [3, 4];

module.exports = {
    traceOn: false,
    width: 2340,
    height: 1080,
    networkGamesCount: 2,
    eventPage: 3,
    networkPage: 4,
    carHuntPosition: 3,
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
        game1of2: { x: 2187, y: 222, color: '#fafafa' },
        // Multiplayer below>tip=#ffffff, y will change when multiplayer matches are adjusted
        game2of2: { x: 2187, y: 631, color: '#fafafa' },
        
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
        
    },
    mp1: {
        // Multiplayer 1 data
        levelName : mpLevelName,
        status : mpStatus,
        carPick : mpCarPick,
        game: 1,
        carPickMode: "ordinary",
    },
    mp2: {
        // Multiplayer 2 data
        levelName : mp2LevelName,
        status : mp2Status,
        carPick : mp2CarPick,
        game: 2,
        carPickMode: "none",
    },
    ch:{
        // Start button
        start: { x: 1743, y: 900, color: '#c3fb12' },
        carPick : chCarPick,
        carPickMode: "up",
        
        noTicketLeft: { x: 171, y: 938, color: '#1c5ab1'},
		noTicketRight: { x: 2172, y:938, color: '#1c5ab1'},
    },
    garage: {
        start: { x: 1800, y: 888, color: '#c3fb12' },
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
        swipeDuration: 700,

        // current league
        league: { x: 740, y: 500, colorUnranked: '#ff0026', colorBronze: '#d98560', colorSilver: '#96b2d4', colorGold: '#f2cb30', colorPlatinum: '#000000', colorLegend: '#f6e2a5'},
        
        // First car
        firstCar: { x: 406, y: 631, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distance: { x: 674 + 7, y: 345 },
        
        // First car
        firstCarFlat: { x: 223, y: 640, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distanceFlat: { x: 696 + 25, y: 357 },
    }
}
