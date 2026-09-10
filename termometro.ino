#include <Wire.h>
#include <Adafruit_MLX90614.h>

Adafruit_MLX90614 mlx = Adafruit_MLX90614();

void setup() {
  Serial.begin(9600);

  mlx.begin();
}

void loop() {

  float temperaturaAmbiente = mlx.readAmbientTempC();

  float temperaturaObjeto = mlx.readObjectTempC();


  Serial.print("Temperatura ambiente: ");
  Serial.print(temperaturaAmbiente);
  Serial.println(" °C");


  Serial.print("Temperatura del objeto: ");
  Serial.print(temperaturaObjeto);
  Serial.println(" °C");


  Serial.println("-------------------");

  delay(1000);
}
