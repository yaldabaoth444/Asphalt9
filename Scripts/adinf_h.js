toastLog("Start");
sleep(5000);
//device.setBrightness(0);

AdInfinteHUAWEI();

toastLog("End");
exit();

function AdInfinteHUAWEI()
{
	while (true) {
		click(1450, 950); //watch ad pack
		sleep(100); 
		//click(1670, 750); //watch ad refill tickets / fast forward
		//sleep(100); 
		//click(1775, 860); //watch universal
		click(1584, 792);
		sleep(1000); 

		click(2282, 57); //close
		sleep(1000); 

		click(2222, 935); //next
		sleep(1000); 
	}
}