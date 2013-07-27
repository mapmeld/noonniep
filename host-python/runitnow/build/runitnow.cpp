#include <Arduino.h>

int main(void)
{
	init();

#if defined(USBCON)
	USBDevice.attach();
#endif
	
	setup();
    
	for (;;) {
		loop();
		if (serialEventRun) serialEventRun();
	}
        
	return 0;
}

void setup();
void loop();
#line 1 "build/runitnow.pde"
/* light stream */

void setup(){
  Serial.begin(115200);
}

void loop(){
  Serial.println( analogRead(0) );
  delay( 1500 );
}

extern "C" void __cxa_pure_virtual(){
  while (1);
}