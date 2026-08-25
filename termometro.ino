#include <Wire.h>
#include <Adafruit_MLX90614.h>

Adafruit_MLX90614 mlx = Adafruit_MLX90614();

void setup() {
  Serial.begin(9600);
  
  if (!mlx.begin()) {
    Serial.println("Error al conectar con el sensor MLX90614");
    while (1);
  }
  
  Serial.println("Sensor iniciado correctamente");
}

void loop() {
  Serial.print("Temp Ambiente = ");
  Serial.print(mlx.readAmbientTempC());
  Serial.print(" °C \t");
  
  Serial.print("Temp Objeto = ");
  Serial.print(mlx.readObjectTempC());
  Serial.println(" °C");
  
  delay(500);
}
