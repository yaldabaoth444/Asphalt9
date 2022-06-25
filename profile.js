const navs = require('./navigations.js');
// Whether the legendary, platinum, gold, silver, and bronze cars are available, true means available, false means unavailable
var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mpStatus    = [ true,     true,       true,   true,     true];
var mpCarPickABC = {
    legend: ['B5', 'A5', 'S5'],
    platinum: ['C5', 'B5', 'A4'],
    gold: ['C4', 'B4'],
    silver: ['D4', 'C4'],
    bronze: ['D4']
};

var mp2LevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze'];
var mp2Status    = [ false,    false,      false,  false,    true];
var mp2CarPickABC = {
    legend: ['D0', 'C0', 'B0', 'A0', 'S0'],
    platinum: ['D0', 'C0', 'B0', 'A0', 'S0'],
    gold: ['D0', 'C0', 'B0', 'A0', 'S0'],
    silver: ['D0', 'C0', 'B0', 'A0', 'S0'],
    bronze: ['D0', 'C0', 'B0', 'A0', 'S0']
};

var chCarPickABC = ['C4'];

module.exports = {
    //device screen resolution  
    width: 2340,
    height: 1080,
    //MP counts (support 1 & 2)
    networkGamesCount: 2,
    //Pages ordering
    specialPage: 2,
    eventPage: 3,
    networkPage: 4,
    //Car hunt position at daily events
    carHuntPosition: 6, // negative values mean from the end
    //Folder with ad closing buttons
    adCloserFolder: './Images/AdCloser/', 
    //Folder with traffic signs
    signsFolder: './Images/TrafficSigns/',
    //Default signs sets
    mpSignSet: 'ramp, ramp_left, ramp_right',
    huntSignSet: 'ramp, ramp_left, ramp_right',
    huntSESignSet: 'ramp, ramp_left, ramp_right',
    // Multiplayer 1 data
    mp1: {
        //League names (for informational purposes only)
        levelName : mpLevelName,
        //League restriction
        status : mpStatus,
        //Restrictions on the choice of cars depending on the league
        // league: ['D0', 'C0', 'B0', 'A0', 'S0'] == no restrictions
        carPick : mpCarPickABC,
        //MP position
        game: 1,
        //Supported mode (ordinary-abc | flat-abc | none)
        carPickMode: "ordinary-abc",
        //Nitro mode (750-900 for perfect, 100-300 for double)
        nitroTick: 900 
    },
    // Multiplayer 2 data
    mp2: {
        //League names (for informational purposes only)
        levelName : mp2LevelName,
        //League restriction
        status : mp2Status,
        //Restrictions on the choice of cars depending on the league
        // league: ['D0', 'C0', 'B0', 'A0', 'S0'] == no restrictions
        carPick : mp2CarPickABC,
        //MP position
        game: 2,
        //Supported mode (ordinary-abc | flat-abc | none)
        carPickMode: "ordinary-abc",
        //Nitro mode (750-900 for perfect, 100-300 for double)
        nitroTick: 900         
    },
    // Start button
    ch:{
        //Restrictions on the choice of cars
        carPick : chCarPickABC,
        //Supported mode (flat-abc | up | down)
        carPickMode: "flat-abc",    
        //Navigation instructions for hunt
        navigation: navs.Osaka_RAT_RACE_C,
        //Nitro mode (750-900 for perfect, 100-300 for double)
        nitroTick: 800,  
          
        // Start button
        start: { x: 1743, y: 900, color: '#c3fb12' },
        noTicketLeft: { x: 171, y: 938, color: '#1c5ab1'},
		noTicketRight: { x: 2172, y:938, color: '#1c5ab1'},
        //Special hunt internal settings
        specialSelector: { x: 486, y:606, color: '#fc0155'},
        specialSelected: { x: 1218, y:246, color: '#ed2c23'},
        specialHunt: { x: 578, y:909, color: '#0e7c9c'},
        specialStart: { x: 1857, y: 729, color: '#c3fb12' },
        specialNext: { x: 1746, y: 927, color: '#c3fb12' }
    },
    common: {
        // The top token icon = #0090ff blue, there will be color difference
        token: { x: 1482, y: 54, color: '#0090ff' },
        
        // The top integral icon = #ffc600||#ffc600 yellow
        credit: { x: 1846, y: 55, color: '#ffc600' },
        
        // White pixel near the return button
        back: { x: 25, y: 25, color: '#ffffff' },
    
        // Dark pixel in the return button
        backward: { x: 110, y: 52, color: '#171717' },
        
        //race attributes
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
        //Buttons at mp lobby (for added accuracy)
        reward: { x: 480, y: 740, color: '#ffffff' }, 
        rate: { x: 576, y: 911, color: '#ffffff' },
        stage: { x: 1475, y: 739, color: '#ffffff' },
        
        // Multiplayer above>tip=#ffffff white, y will change when multiplayer matches are adjusted
        game1of2: { x: 2186, y: 260, color: '#ffffff' },
        // Multiplayer below>tip=#ffffff, y will change when multiplayer matches are adjusted
        game2of2: { x: 2186, y: 668, color: '#ffffff' },
        
        //Some next|ok buttons
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

        //Pixels to determine the star level of a car
        star1: { x: 309, y: 148, color: "#ffec3d" }, 
        star2: { x: 350, y: 148, color: "#ffea3a" }, 
        star3: { x: 392, y: 148, color: "#ffec3e" }, 
        star4: { x: 433, y: 148, color: "#ffea3a" }, 
        star5: { x: 475, y: 148, color: "#ffeb3d" }, 
        star6: { x: 516, y: 148, color: "#ffea3a" }, 

        //unique pixels for detecting car class
        isClassA: { x: 2150, y: 220, color: "#162431" }, 
        isClassBS: { x: 2149, y: 208, color: "#162431" }, 
        isClassB: { x: 2135, y: 213, color: "#162431" }, 
        isClassD: { x: 2163, y: 208, color: "#162431" }, 

        //Buttons that determine whether the car is available for the race or not 
        //can Play
        canGo1: { x: 1664, y: 914, color: "#ff0054" }, 
        //need star up
        cantGo1: { x: 1813, y: 1015, color: "#ffffff" },
        //need blueprints or key 
        cantGo2: { x: 1813, y: 1015, color: "#000921" }, 

        // league buttons
        bronze: { x: 1470, y: 248, color: '#ce7145' },
        silver: { x: 1600, y: 248, color: '#365ca3' },
        gold: { x: 1740, y: 248, color: '#d78f23' },
        platinum: { x: 1870, y: 248, color: '#5d3eb6' },
        legend: { x: 2000, y: 248, color: '#3f3f3d' },
        
        //cars change rate  (in milliseconds)
        switchSpeed: 300,

        // current league
        league: { x: 740, y: 500, colorUnranked: '#ff0026', colorBronze: '#d98560', colorSilver: '#96b2d4', colorGold: '#f2cb30', colorPlatinum: '#000000', colorLegend: '#f6e2a5'},
        
        // First car
        firstCar: { x: 406, y: 633, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distance: { x: 674, y: 345, inertia: 12 }, //26-60fps
        
        // First car
        firstCarFlat: { x: 223, y: 640, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distanceFlat: { x: 696, y: 357, inertia: 12}, //26-60fps
    }
}