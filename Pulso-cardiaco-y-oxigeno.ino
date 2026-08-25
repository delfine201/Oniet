#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

MAX30105 particleSensor;

#define BUFFER_SIZE 100 // El algoritmo procesa ráfagas de 100 muestras

uint32_t irBuffer[BUFFER_SIZE];  // Datos del LED infrarrojo
uint32_t redBuffer[BUFFER_SIZE]; // Datos del LED rojo

int32_t spo2;           // Valor calculado de Oxígeno en sangre
int8_t validSPO2;       // Indicador de validez del cálculo de Oxígeno (1 = Válido)
int32_t heartRate;      // Valor calculado de Pulsaciones (BPM)
int8_t validHeartRate;  // Indicador de validez del ritmo cardíaco (1 = Válido)

void setup() {
  Serial.begin(115200); // Configura el monitor serie a 115200 baudios
  
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println(F("No se encontró el sensor MAX30102. Revisa conexiones."));
    while (1);
  }

  // Configuración específica para leer ambos LEDs simultáneamente
  byte ledBrightness = 60; // Opciones: 0=Apagado a 255=Máximo
  byte sampleAverage = 4;  // Opciones: 1, 2, 4, 8, 16, 32
  byte ledMode = 2;        // 2 = Modo Multi-LED (Rojo + IR)
  byte sampleRate = 100;   // Opciones: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411;    // Opciones: 69, 118, 215, 411
  int adcRange = 4096;     // Opciones: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);
}

void loop() {
  Serial.println(F("Tomando las primeras 100 muestras básicas... Coloque su dedo fijamente."));
  
  // Leer los primeros 100 datos para llenar el búfer inicial
  for (byte i = 0 ; i < BUFFER_SIZE ; i++) {
    while (particleSensor.available() == false) 
      particleSensor.check(); // Revisar si hay nuevos datos en el sensor

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); // Avanzar a la siguiente muestra
  }

  // Calcular BPM y SpO2 con el bloque inicial de 100 muestras
  maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_SIZE, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

  // Bucle continuo de actualización de datos
  while (1) {
    // Desplazar las últimas 75 muestras hacia el inicio del búfer para ahorrar memoria
    for (byte i = 25; i < BUFFER_SIZE; i++) {
      redBuffer[i - 25] = redBuffer[i];
      irBuffer[i - 25] = irBuffer[i];
    }

    // Tomar 25 muestras nuevas para completar las 100 del búfer recalculable
    for (byte i = 75; i < BUFFER_SIZE; i++) {
      while (particleSensor.available() == false) 
        particleSensor.check();

      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample();
    }

    // Recalcular con los nuevos datos agregados
    maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_SIZE, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

    // Imprimir los resultados por el Monitor Serie si los cálculos son válidos
    Serial.print(F("BPM="));
    if (validHeartRate == 1 && heartRate > 0) {
      Serial.print(heartRate, DEC);
    } else {
      Serial.print(F("Calculando..."));
    }

    Serial.print(F("\t SpO2="));
    if (validSPO2 == 1 && spo2 > 0) {
      Serial.print(spo2, DEC);
      Serial.println(F("%"));
    } else {
      Serial.println(F("Calculando..."));
    }
  }
}
