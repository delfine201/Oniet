#include <Wire.h>
#include "MAX30100.h"

#define SAMPLING_RATE MAX30100_SAMPRATE_100HZ

#define IR_LED_CURRENT  MAX30100_LED_CURR_7_6MA
#define RED_LED_CURRENT MAX30100_LED_CURR_7_6MA

#define PULSE_WIDTH MAX30100_SPC_PW_1600US_16BITS
#define HIGHRES_MODE true

MAX30100 sensor;

void setup()
{
    Serial.begin(115200);

    Serial.println("Iniciando MAX30100...");

    if (!sensor.begin()) {
        Serial.println("ERROR al iniciar MAX30100");
        while (1);
    }

    Serial.println("MAX30100 iniciado correctamente");

    sensor.setMode(MAX30100_MODE_SPO2_HR);
    sensor.setLedsCurrent(IR_LED_CURRENT, RED_LED_CURRENT);
    sensor.setLedsPulseWidth(PULSE_WIDTH);
    sensor.setSamplingRate(SAMPLING_RATE);
    sensor.setHighresModeEnabled(HIGHRES_MODE);
}

void loop()
{
    uint16_t ir, red;

    sensor.update();

    while (sensor.getRawValues(&ir, &red)) {
        Serial.println(ir);
        delay(50);
    }
}
