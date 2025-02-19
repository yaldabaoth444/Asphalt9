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
     TREZOR_STAGE_1: [
        "0%|signs|",
        "10%|flash",
        "15%|drift-flash|2800",
        "33%|360-flash",
		"37%|drift|1300",
        "47%|360-flash",
		"50%|drift|5000",
        "68%|360-flash",
        "82%|drift|8000"
    ],
    TREZOR_STAGE_2: [
        "0%|signs|",
        "6%|flash",
        "8%|stop-perfect-nitro",

        "12%|drift|2918",
        "20%|choose|13",
        "21%|flash",
        "23%|stop-perfect-nitro",
        "27%|choose|22",
        "31%|choose|12",

        "33%|drift|1555",
        "38%|flash",
        "39%|stop-nitro",
        "41%|choose|22",
        "45%|perfect-nitro",
        "48%|choose|12",
        "49%|choose|12",

        "54%|drift-flash|1698",
        "60%|stop-perfect-nitro",
        "64%|stop-normal-nitro",

        "67%|drift-flash|1546",
        "72%|stop-nitro",

        "74%|360-flash",
        "78%|drift|3432",
        "87%|right",
        "88%|flash",
        "92%|stop-nitro",
        "93%|drift-flash|2172",
    ],
    TREZOR_STAGE_3: [
        "0%|signs|",
        
        "5%|choose|33",
        "6%|drift-flash|4800",
        "21%|stop-perfect-nitro",
        
        "22%|choose|12",
        "23%|choose|12",
        "29%|drift|1200",
        
        "37%|choose|12",
        "38%|normal-nitro",
        
        "45%|choose|13",
        "47%|choose|13",
        "54%|flash",
        "58%|stop-nitro",

        "62%|choose|13",
        "63%|choose|13",
        "64%|drift|500",
        "76%|flash",
        "86%|drift-perfect-nitro|1000",
    ],
    TREZOR_STAGE_4: [
        "0%|signs|",

        "6%|flash",
        "9%|stop-perfect-nitro",
        "10%|choose|22",
        "14%|stop-nitro",
        "16%|perfect-nitro",
        "20%|stop-nitro",

        "24%|drift-flash|200",
        "29%|stop-nitro",
        "32%|flash",
        "33%|stop-perfect-nitro",
        "36%|choose|23",
        "40%|stop-nitro",
        
        "42%|360-flash|2",
        "47%|drift|454",
        "50%|choose|22",
        "52%|perfect-nitro",
        
        "54%|choose|22",
        "55%|choose|22",
        "56%|stop-nitro",
        "60%|flash",
        "63%|stop-nitro",

        "66%|perfect-nitro",
        "70%|choose|13",
        "72%|stop-nitro",
        "75%|flash|1",
        "76%|choose|12",
        "77%|choose|12",
        "78%|stop-nitro",

        "81%|right",
        "84%|flash",
        "88%|flash|2",

        "90%|choose|13",
        "91%|stop-perfect-nitro",
        "95%|normal-nitro|5",
    ]
}