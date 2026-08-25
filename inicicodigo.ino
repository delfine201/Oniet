#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>
#include <SoftwareSerial.h>

SoftwareSerial blt(10, 11);

LiquidCrystal_I2C lcd(0x27,16,2);

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
 
void setup()
{
  Serial.begin(9600);
  blt.begin(38400);
  Serial.println("Iniciando");
  Serial.println("blt listo");

  lcd.init();
  lcd.backlight();

  lcd.setCursor(0,0);
  lcd.print("hola");

  lcd.setCursor(0,1);
  lcd.print("Soy Arduino");

  delay(500);

  lcd.clear();
}

void loop()
{
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

  if (blt.available()) {
    Serial.print("Recibido: ");
    Serial.println(blt.read());

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(blt.read);
  }

  if (Serial.available()) {
    char dato = Serial.read();

    blt.write(dato);

    lcd.clear();
    lcd.print("Enviado: ");
    lcd.print(dato);
  }
}