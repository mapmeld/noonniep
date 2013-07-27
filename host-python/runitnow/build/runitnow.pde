/* light stream */

void setup(){
  Serial.begin(115200);
}

void loop(){
  Serial.println( analogRead(2) );
  delay( 1500 );
}

extern "C" void __cxa_pure_virtual(){
  while (1);
}