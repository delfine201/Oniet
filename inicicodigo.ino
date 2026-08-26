#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);


String palabra = "";

String mensaje = "";

char dato = 0;
 
void setup()
{
  Serial.begin(9600);
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

void enviar(String datos) {
  lcd.clear();
  lcd.print("Enviado: ");
  lcd.print(dato);
}

void loop() {

  armarMensaje();
}
