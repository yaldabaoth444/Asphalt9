Revival of the project <a href = "https://github.com/DrOmega9834/Asphalt9" target = "_blank">DrOmega9834\/Asphalt9</a>

for Auto.js *v4.1.1 alpha2* <a href = "https://hyb1996.github.io/AutoJs-Docs/#/?id=%e7%bb%bc%e8%bf%b0" target = "_blank">Docs</a> | <a href = "http://chorblack.top:8000/autojs/Auto.js-4.1.1%20Alpha2.apk" target = "_blank">Downloads</a>

This project is being tested on the Xiaomi Mi 9 smartphone with a resolution of 2340x1080.  
Add new 2280x1080 profile (thanks to <a href = "https://github.com/Dexya" target = "_blank">Dexya</a>)

installation instructions from the old version <a href = "./readme/README_EN.md" target = "_blank">Click here to read instructions</a>  
video instructions <a href = "https://www.youtube.com/watch?v=O-ROD0nzIhE" target = "_blank">#1</a> <a href = "https://www.youtube.com/watch?v=dC_V8fuvykQ" target = "_blank">#2</a>  

Already done: \ō͡≡o˞̶
- multiplayer MP1 & MP2
- car hunt (+ in special events)
- options for choosing cars in the garage (ordinary/none/flat/up|down)
- restart app when stuck
- route selection (by image recognition)

TODO:  
 ¯\\_(ツ)_/¯  

[example race](https://www.youtube.com/watch?v=yx-xXiE0fXM)
```
💡 The principle of the main.js:  
If Hunt + MP2 + MP1 are activated  
The main cycle is a race in MP1  

During MP2, every race there is a check: Is it time to go Hunt  
If it is, the cycle is interrupted and the Hunt race cycle is started a specified number of times  

During MP1, every race there is a check: It is not the time to go Hunt or MP2  
If it is, the cycle is interrupted and the corresponding Hunt or MP2 cycle is started a specified number of times  

if both cycles (MP1&2) have been run a given number of times, the Hunt cycle is started automatically  
 
🔹 By setting 0 in the huntCounts|mp1Counts|mp2Counts parameters, we exclude them from work,  
thus setting which cycles we need at the moment.  
🔹 mp2EveryMinutes - preferably set in such a way that in the next cycle the car will be refueled  
and will be able to drive a specified number of times  
🔹 huntEveryMinutes - calculated automatically because it depends on the availability of tickets
```
⚠️ which hunt will be launched is adjusted as follows    
Car Hunt Special Events ![image](https://user-images.githubusercontent.com/25618671/174010423-6d6a0dae-3214-4f23-9930-e4ec585a6dc3.png)  
Car Hunt Daily Events ![image](https://user-images.githubusercontent.com/25618671/174010184-f7c35baa-4508-4789-a020-a3113018c277.png)  
![image](https://user-images.githubusercontent.com/25618671/174287133-d226b7af-4bcd-492d-97a4-41b0ce9e2272.png)

Latest changes:  
💥navigation refactoring  
Now there is only one directory with all available signs, and in the route sets the signs that will be active 
![image](https://user-images.githubusercontent.com/25618671/155859660-de0f80e0-7660-479b-9e60-939ab20ab3da.png)

<hr>

💥hunt navigation
![image](https://user-images.githubusercontent.com/25618671/152245137-fd79636b-e7fa-4f84-ab56-c99c3053e8ce.png)
__actions__:
- *route* - change the directory with navigation signs  
- *drift* - pressing the brake with a specified duration  
- *flash* - double-tap on the gas  
- *360* - double-tap on the brake  
- *drift-flash* - pressing the brake with a specified duration then double-tap on the gas  
- *360-flash* - double-tap on the brake then double-tap on the gas  

__format__: {*action*|time|option}  
- *action*: see actions above
- time: time of command execution from the start of the race in milliseconds
- option: parameter depends on the command  

<hr>

💥new cars pick mode  
![image](https://user-images.githubusercontent.com/25618671/152342720-a816db41-a0f2-40df-8c9a-901c545c12b8.png)
![image](https://user-images.githubusercontent.com/25618671/152342782-00fbbcbd-e1af-4035-8e93-5ba5959a7a1e.png)

<hr>

![image](https://user-images.githubusercontent.com/25618671/152342822-e86691f0-fb55-4318-9b84-de350041a7cb.png)

<hr>

![image](https://user-images.githubusercontent.com/25618671/152342856-3384f3e0-eaaf-40eb-a486-71d95a6d84cc.png)

<hr>

![image](https://user-images.githubusercontent.com/25618671/152342891-4ee37d45-b6a7-4d23-b15a-6b3c15208c96.png)
___
**Donation**  
If you think my scripts is helpful for you, you can donate me, your donation is the best encouragement to me.  
###### <a href = "https://payeer.com/" target = "_blank">Payeer account: P1073238462</a>
