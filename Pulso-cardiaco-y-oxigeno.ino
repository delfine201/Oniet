#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

#define REPORTING_PERIOD_MS 1000

PulseOximeter pox;

uint32_t tsLastReport = 0;
float ultimoBPM = 0;

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
}

void loop()
{
    // Actualizar continuamente
    pox.update();

    float bpm = pox.getHeartRate();

    // Guardar solamente valores razonables
    if (bpm >= 40 && bpm <= 180) {
        ultimoBPM = bpm;
    }

    // Mostrar cada segundo
    if (millis() - tsLastReport >= REPORTING_PERIOD_MS)
    {
        Serial.print("BPM: ");
        Serial.println(ultimoBPM, 1);

        tsLastReport = millis();
    }
}
