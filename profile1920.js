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
    silver: [5, 8, 10, 11, 12, 13, 15],
    // bronze
    bronze: [7, 5, 6, 11]
};

module.exports = {
    traceOn: false,
    networkGamesCount: 2,
    
    common: {
        // The top token icon = #0090ff blue, there will be color difference
        token: { x: 1210, y: 59, color: '#0090ff' },
        
        // The top integral icon = #ffc600 yellow
        credit: { x: 1540, y: 43, color: '#ffc600' },
        
        // Back button #ffffff white
        back: { x: 22, y: 22, color: '#ffffff' },
    
        // black in the return button
        backward: { x: 49, y: 45, color: '#151515' },
        
        racePause: { x: 77, y: 81, color: '#ffffff' },
        raceTD: { x: 201, y: 173, color: '#3daaed' },
        raceTime: { x: 1627, y: 173, color: '#f9ccd8' },
        
        pages: { x: 314, y: 1048, light: '#ffffff', dark: '#14151d', delta: 314 },
    },
    
    mp: {
        // Multiplayer data
        levelName : mpLevelName,
        status : mpStatus,
        carPick : mpCarPick,
        
        // Start button
        start: { x: 994, y: 905, color: '#c3fb12' },
        reward: { x: 393, y: 707, color: '#ffffff' }, 
        rate: { x: 474, y: 905, color: '#ffffff' },
        stage: { x: 1212, y: 707, color: '#ffffff' },
        
        // Multiplayer above>tip=#ffffff white, y will change when multiplayer matches are adjusted
        game1of2: { x: 1824, y: 250, color: '#ffffff' },
        // Multiplayer below>tip=#ffffff, y will change when multiplayer matches are adjusted
        game2of2: { x: 1824, y: 585, color: '#ffffff' },
        
        continue1: { x: 1296, y: 911, color: '#c3fb12' }, //@result
        continue2: { x: 1313, y: 917, color: '#ffffff' }, //@
        continue3: { x: 1313, y: 917, color: '#c3fb12' }, //@
        continue5: { x: 1597, y: 936, color: '#ffffff' }, //@reward
        
        continue4: { x: 1597, y: 936, color: '#ffffff' }, //league up
        continue6: { x: 1597, y: 936, color: '#000921' }, //inverted
        
        advert1: { x: 1460, y: 825, color: '#9bff01' },
        
        // common point for all continue buttons
        goldenPoint: { x: 1820, y: 974, color: '#c3fb12' },
        
        // The lower left corner of the error window = #1c5ab2 blue
		errorleft: { x: 276, y: 816, color: '#2358a6'},
		// The bottom right corner of the error window = #1c5ab2 blue
		errorright: { x: 1064, y:806, color: '#2c5394'},
        
        clubleft: { x: 406, y:704, color: '#ffffff'},
        clubright: { x: 1417, y:704, color: '#c3fb12'},
        
        leaguedownleft: { x: 440,  y: 908, color: '#1c5ab1' }, //league down 2458a4
        leaguedownright: { x: 1897,  y: 913, color: '#1c59b1' }, //league down 2158a8
        
    },
    
    garage: {
        start: { x: 1471, y: 913, color: '#c3fb12' },
        speed: { x: 210, y: 430, color: '#33eff9' },
        accel: { x: 210, y: 528, color: '#33eff9' },
        handl: { x: 210, y: 628, color: '#33eff9' },
        nitro: { x: 210, y: 726, color: '#33eff9' },
        ready:  { x: 1365, y: 944, color: '#ff0154' },
        
        // league buttons
        bronze: { x: 1299, y: 175, color: '#d86e38' },
        silver: { x: 1409, y: 175, color: '#315cb1' },
        gold: { x: 1520, y: 175, color: '#e09522' },
        platinum: { x: 1630, y: 175, color: '#593db9' },
        legend: { x: 1741, y: 175, color: '#424242' },

        // current league
        league: { x: 600, y: 511, colorBronze: '#d98560', colorSilver: '#96b2d4', colorGold: '#f2cb30', colorPlatinum: '#000000', colorLegend: '#f6e2a5'},
        
        // First car
        firstCar: { x: 343, y: 609, colorFull: '#c3fb13', colorEmpty: '#ff0054' },

        // Vehicle spacing
        distance: { x: 694, y: 355 },
    }
}