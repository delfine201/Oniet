import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDJ6IwIxG5rkUfHIFqJ7PTuxJ2vnK66U68",
authDomain: "menteypulso.firebaseapp.com",
projectId: "menteypulso",
storageBucket: "menteypulso.firebasestorage.app",
messagingSenderId: "817477075455",
appId: "1:817477075455:web:9a207b6ba92845cef5a7ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const maquetaRef = doc(db, "maquetas", "MAQUETA01");

const maquetaSnap = await getDoc(maquetaRef);

console.log(maquetaSnap.data());

const datos = maquetaSnap.data();

console.log("Html5Qrcode:", typeof Html5Qrcode);

const lector = new Html5Qrcode("lectorQR");
const botonQR = document.getElementById("escanearQR");

const themebutton = document.getElementById("theme");
const themeicon = document.getElementById("itheme");

const inputId = document.getElementById("id");
const inputNombre = document.getElementById("nombre");
const inputEstado = document.getElementById("estado");

inputId.value = "MAQUETA01";
inputNombre.value = datos.nombre;
inputEstado.value = datos.activo ? "Activo" : "Inactivo";

themebutton.addEventListener ("click", () => {
  if(document.documentElement.classList.contains("light")){
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    themeicon.setAttribute("name", "moon");
    themebutton.classList.remove("active");
  }else{
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light");
    themeicon.setAttribute("name", "sunny");
    themebutton.classList.add("active");
  }
});

botonQR.addEventListener("click", async () => {
    console.log("1. Botón presionado");

    try {
        console.log("2. Intentando abrir cámara...");

        await lector.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            (textoQR) => {
                console.log("3. QR detectado:", textoQR);

                inputId.value = textoQR;
            },
            (error) => {
                // Los errores de "no encontré un QR en este frame"
                // son normales y los ignoramos.
            }
        );

        console.log("4. Cámara iniciada");
        document.getElementById("lectorQR").style.border = "3px solid red";
    } catch (error) {
        console.error("❌ Error al abrir la cámara:", error);
    }
});
