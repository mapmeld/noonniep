/*
  Blink Test
  Turns blue and yellow LEDs on and off, repeatedly.
  pin 2 is blue
  pin 4 is green
  activating 2 and 4 together makes aqua-green
  pin 6 is yellow
  pin 8 is purple
  pin 13 is orange indicator on Arduino
 */
void setup() {
  /* at start, prepare LED pins */
  pinMode(2, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(13, OUTPUT);
  Serial.begin(115200);
}
void loop() {
  Serial.println("hello");
  /* program a light show here! */
  digitalWrite(2, HIGH);
  digitalWrite(6, HIGH);
  digitalWrite(8,LOW);
  /* wait 3 seconds with those settings */
  delay(3000);
  digitalWrite(2, LOW);
  digitalWrite(6, LOW);
  digitalWrite(8,HIGH);
  /* wait 2 seconds with those settings */
  delay(2000);
  /* loop() repeats */
}

extern "C" void __cxa_pure_virtual(){
  while (1);
}