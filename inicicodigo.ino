#include <Servo.h>
#include <Keypad.h>
#include <SPI.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <MAX30100_PulseOximeter.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

SoftwareSerial blt(10, 11);

#define REPORTING_PERIOD_MS 1000

PulseOximeter pox;

uint32_t tsLastReport = 0;
float ultimoBPM[20] = {};
float bpm = 0;

const byte ROWS = 4; //four rows
const byte COLS = 4; //four columns
//define the cymbols on the buttons of the keypads
char hexaKeys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {9, 8, 7, 6}; //connect to the row pinouts of the keypad // conecciones con un 4x4 {9, 8, 7, 6} - 4x3 {/*9,*/ 8, 7, 6, 5}
byte colPins[COLS] = {5, 4, 3, 2}; //connect to the column pinouts of the keypad  // conecciones con un 4x4 {5, 4, 3, 2} - 4x3 {4, 3, 2}

//initialize an instance of class NewKeypad
Keypad teclado = Keypad( makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS); 

String palabra = "";

String mensaje = "";
String msjfinal = "";

String info = "";
String nombre = "";
String dni = "";


char dato = 0;
 
void setup()
{
  Serial.begin(115200);
  blt.begin(38400);
  Serial.println("Iniciando");
  Serial.println("blt listo");

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

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0);

  lcd.clear();
}

void armarMensaje() {
  dato = 0;
  while (Serial.available()){
    dato = Serial.read();
    if (isAlpha(dato) || isDigit(dato) || dato == ' ') {
      mensaje += dato;
    } else if (dato == '\n') {
      recibir();
      msjfinal = mensaje;
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
  for(byte i = 0; i < 40; i++){
    ultimoBPM[i] = 0;
  }

  int vueltas = 20;

  for(byte i = 0; i < vueltas; i++){
    pox.update();

    float lecturabpm = pox.getHeartRate();
    // Guardar solamente valores razonables
    if (lecturabpm >= 40 && lecturabpm <= 180) {
      ultimoBPM[i] = lecturabpm;
    }else if (lecturabpm < 40 && lecturabpm > 180 || lecturabpm == "null") {
      vueltas++;
    }
  }

  bpm = 0;

  for(byte i = 0; i < 20; i++){
    bpm += ultimoBPM[i];
  }

  bpm = bpm / 20.0;

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

  blt.println(datos);
}

void loop() {
  armarMensaje();

  /*char tecla = teclado.getKey();
  
  if (tecla){
    Serial.println(tecla);

    if(tecla == '#') {
      Serial.println("adentroooo");
      palabra = "";
    }else {
      palabra += tecla;
    }    

    lcd.clear();
    lcd.setCursor(0, 0);
  	lcd.print(palabra);
  }*/

  if (msjfinal == "init"){
    ble.println("datos");
  }

  for(byte i = 0; i < msjfinal.length(); i++){
    if(isAlpha(msjfinal[i]) || isDigit(msjfinal[i]) msjfinal[i] != "/"){
      
    }
  }
}
