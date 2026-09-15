export async function probarBLE(config) {

    try {

        const device = await navigator.bluetooth.requestDevice({
            filters: [
                {
                    services: [config.suuid]
                }
            ]
        });

        console.log("📱 Dispositivo:", device.name);
        console.log("🔑 ID interno:", device.id);

        const server = await device.gatt.connect();

        const service =
            await server.getPrimaryService(
                config.suuid
            );

        const characteristic =
            await service.getCharacteristic(
                config.cuuid
            );

        console.log("🟢 BLE conectado correctamente");

        return {
            device,
            server,
            service,
            characteristic
        };

    } catch (error) {

        console.error("❌ BLE:", error);
        return null;
    }
}

/*try {

    device = await navigator.bluetooth.requestDevice({
        filters: [
            { services: [SERVICE_UUID] }
        ]
    });

    const server = await device.gatt.connect();

    const service =
        await server.getPrimaryService(SERVICE_UUID);

    characteristic =
        await service.getCharacteristic(CHARACTERISTIC_UUID);

    await characteristic.startNotifications();

    let buffer = "";

    characteristic.addEventListener(
        "characteristicvaluechanged",
        event => {

            const decoder = new TextDecoder();

            const mensaje = decoder.decode(event.target.value);

            buffer += mensaje;

            const partes = buffer.split("\n");

            buffer = partes.pop();

            for (const registro of partes) {

                console.log("REGISTRO:", registro);

                document.getElementById("received").textContent =
                    registro;
            }
        }
    );

    alert("🟢 Conectado a " + device.name);

} catch (error) {

    console.error(error);

    alert("❌ Error: " + error.message);
}*/

/*document.getElementById("send").addEventListener("click", async () => {

    if (!characteristic) {
        alert("Primero conectá el Bluetooth");
        return;
    }

    document.getElementById("received").textContent = "";

    const message =
        document.getElementById("message").value;

    const encoder = new TextEncoder();

    const data = encoder.encode(message);

    await characteristic.writeValue(data);

    console.log("Enviado:", message);

});*/