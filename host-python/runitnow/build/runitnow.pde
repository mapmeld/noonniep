/*
  Blink Test
  pin 13 is orange indicator on Arduino
 */
void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(3000);
  digitalWrite(13, LOW);
  delay(2000);
}