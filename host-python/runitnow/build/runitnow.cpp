#include <WProgram.h>

int main(void)
{
	init();

	setup();
    
	for (;;)
		loop();
        
	return 0;
}

void setup();
void loop();
#line 1 "build/runitnow.pde"
#include <WProgram.h>
/* Sensor Test
  Turns purple LED on whenever sensor detects the red LED
  pin 10 is red
  digital pin 8 is purple
  analog 3 is light sensor
*/
int onIn = 1;
int lightSense;
void setup(){
  pinMode(8, OUTPUT);
  pinMode(10, OUTPUT);
}
void loop(){
  // cycle the target light
  // target light is on 0.5 seconds out of 2
  onIn = onIn + 1;
  if(onIn % 5 == 0){
    digitalWrite(10, HIGH);
    onIn = 1;
  }
  else{
    digitalWrite(10, LOW);
  }
  lightSense = analogRead(3);
  if(lightSense > 70){
    // target light detected! purple LED on!
    digitalWrite(8, HIGH);
  }
  else{
    // target light off! purple LED off!
    digitalWrite(8, LOW);
  }
  delay(500);
}