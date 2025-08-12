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
// FITNESS FOR A PART  ICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
// THE SOFTWARE.

module.exports = {
    
    ANY: {
        legend: ['D0', 'C0', 'B0', 'A0', 'S0'],
        platinum: ['D0', 'C0', 'B0', 'A0', 'S0'],
        gold: ['D0', 'C0', 'B0', 'A0', 'S0'],
        silver: ['D0', 'C0', 'B0', 'A0', 'S0'],
        bronze: ['D0', 'C0', 'B0', 'A0', 'S0']
    },
    
    D_CLASS: {
        legend: ['D0'],
        platinum: ['D0'],
        gold: ['D0'],
        silver: ['D0'],
        bronze: ['D0']
    },

    DC_CLASS: {
        legend: ['D0', 'C0'],
        platinum: ['D0', 'C0'],
        gold: ['D0', 'C0'],
        silver: ['D0', 'C0'],
        bronze: ['D0', 'C0']
    },

    SHORT_DRIFT: {
        drift_min: 300,
        drift_max: 1200,
        rand_min: 3000,
        rand_max: 5000,
        type: "drift-flash",
    },

    MEDIUM_DRIFT: {
        drift_min: 1200,
        drift_max: 2500,
        rand_min: 4000,
        rand_max: 6000,
        type: "drift-flash",
    },

    LONG_DRIFT: {
        drift_min: 2500,
        drift_max: 4000,
        rand_min: 6000,
        rand_max: 8000,
        type: "drift-flash",
    },

    PERFECT_NITRO: {
        rand_min: 2000,
        rand_max: 5000,
        type: "perfect-nitro",
    },

    SS_NITRO: {
        rand_min: 1000,
        rand_max: 2000,
        type: "flash",
    },

    PERFECT_NITRO_FAST: {
        rand_min: 2000,
        rand_max: 3500,
        type: "perfect-nitro",
    },

    CUSTOM_DRIFT: {
        drift_min: 800,
        drift_max: 4000,
        rand_min: 4000,
        rand_max: 10000,
        type: ["drift-perfect-nitro", "drift-flash"],
    },

    HIDE_CARS: [
        '8fcf08e5ee50636ad848a1fb091cff43' //tartarus
        //'41d34bce5ebfa65bde61cff79325341e'  //cc850
    ]
}