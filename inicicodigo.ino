#include <Servo.h>
#include <Key.h>
#include <Keypad.h>
#include <SPI.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <MAX30100_PulseOximeter.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

#define REPORTING_PERIOD_MS 1000

PulseOximeter pox;

uint32_t tsLastReport = 0;
byte ultimoBPM[20] = {};
float bpm = 0;

String palabra = "";

String mensaje = "";

char dato = 0;
 
void setup()
{
  Serial.begin(115200);

  Serial.println("Iniciando MAX30100...");

  if (!pox.begin()) {
      Serial.println("ERROR al iniciar PulseOximeter");
      while (1);
  }

  Serial.println("PulseOximeter iniciado correctamente");

  // LED IR con corriente baja
  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);

  // Callback cuando detecta un latido
  pox.setOnBeatDetectedCallback([]() {
      //Serial.println("LATIDO DETECTADO");
  });
  Serial.println("Iniciando");
  Serial.println("blt listo");

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);

  delay(500);

  lcd.clear();
}

void armarMensaje() {
  dato = 0;
  if (Serial.available()){
    dato = Serial.read();
    if (isAlpha(dato) || isDigit(dato) || dato == ' ') {
      mensaje += dato;
    } else if (dato == '\n') {
      recibir();
      mensaje = "";
    }
  }
}

void recibir() {
  if (mensaje != "") {

    Serial.print("Recibido: ");
    Serial.println(mensaje);

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(mensaje);
  }
}

void pulsoxi(){
  pox.update();

  float bpm = pox.getHeartRate();

  for(byte i = 0; i < 20; i++){
    // Guardar solamente valores razonables
    if (bpm >= 40 && bpm <= 180) {
      ultimoBPM[i] = bpm;
    }
  }

  bpm = 0;

  for(byte i = 0; i < 20; i++){
    bpm += ultimoBPM[i];
  }

  for(byte i = 0; i < 3; i++){
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("BPM:");
    lcd.setCursor(0, 1);
    lcd.print(bpm);

    delay(5000);

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Oxigeno:");
    lcd.setCursor(0, 1);
    lcd.print("none");

    delay(5000);
  }

  // Mostrar cada segundo
  /*if (millis() - tsLastReport >= REPORTING_PERIOD_MS)
  {
    Serial.print("BPM: ");
    Serial.println(ultimoBPM, 1);

    tsLastReport = millis();
  }*/
}

void enviar(String datos) {
  lcd.clear();
  lcd.print("Enviado: ");
  lcd.print(datos);
}

void loop() {

  armarMensaje();
}
