// Importamos el firbase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// configuramos la pagina para que use firebase
const firebaseConfig = {
apiKey: "AIzaSyDJ6IwIxG5rkUfHIFqJ7PTuxJ2vnK66U68",
authDomain: "menteypulso.firebaseapp.com",
projectId: "menteypulso",
storageBucket: "menteypulso.firebasestorage.app",
messagingSenderId: "817477075455",
appId: "1:817477075455:web:9a207b6ba92845cef5a7ca"
};

// Creamos los objetos para usar firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);

if(sessionStorage.getItem("maqueta") === null) {
  const maqueta = params.get("maq");
  console.log("maqueta:", maqueta);
  sessionStorage.setItem("maqueta", maqueta);
}else {
  const maqueta = sessionStorage.getItem("maqueta");
  console.log("maqueta:", maqueta);
}

//Verificamos que tenga iniciada la sesion

const sesion = sessionStorage.getItem("sesion");

let uid;
let nombre;
let apellido;
let dni;
let fechaNacimiento;
let email;
let alergias;
let enfermedades; 
let peso;
let altura;

if(sesion === null) {
  alert("Primero Inicie Sesion")
  window.location.href = "login.html";
}

uid = sessionStorage.getItem("sesion");

const referencia = doc(db, "usuarios", uid);

const datos = await getDoc(referencia);

if (datos.exists()) {
  const usuario = datos.data();
  nombre = usuario.nombre;
  apellido = usuario.apellido;
  dni = usuario.dni;
  fechaNacimiento = usuario.fechaNacimiento;
  email = usuario.email;
  alergias = usuario.alergias;
  enfermedades = usuario.enfermedades;
  peso = usuario.peso;
  altura = usuario.altura;
}
console.log(uid, nombre, apellido, dni, fechaNacimiento, email, alergias, enfermedades, peso, altura);

const txtnombre = document.querySelector("#nombretxt");
const txtdni = document.querySelector("#dnitxt");
const txtaltura = document.querySelector("#alturatxt");
const txtpeso = document.querySelector("#pesotxt");
const txtedad = document.querySelector("#edadtxt");

txtnombre.textContent = nombre;
txtdni.textContent = dni;
txtaltura.textContent = altura;
txtpeso.textContent = peso;

const nacimiento = new Date(fechaNacimiento);
const hoy = new Date();

let edad = hoy.getFullYear() - nacimiento.getFullYear();

const mes = hoy.getMonth() - nacimiento.getMonth();

if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
}

txtedad.textContent = edad;

// Creamos los objetos segund sus id o sus clases
const zone = document.querySelector(".zone");

const navigation = document.querySelector(".navigation");

const menu = document.getElementById("menu");
let icono = "menu";

const themebutton = document.getElementById("theme");
const themeicon = document.getElementById("itheme");
const txtmode = document.getElementById("mode");

const cmostrar = document.querySelectorAll(".checkbox");

const tema = sessionStorage.getItem("theme");

const ble = document.getElementById("ble");

console.log(tema);

if(tema === "dark" || tema === null){
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

navigation.addEventListener("click", () => {

  zone.classList.toggle("active");
  
  if(zone.classList.contains("active")){
    icono = "close";
  }else{
    icono = "menu";
  }
  
  menu.setAttribute("name", icono);

});

themebutton.addEventListener ("click", () => {
  if(document.documentElement.classList.contains("light")){
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    themeicon.setAttribute("name", "moon");
    themebutton.classList.remove("active");
    sessionStorage.setItem(
      "theme",
      "dark"
    );
  }else{
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light");
    themeicon.setAttribute("name", "sunny");
    themebutton.classList.add("active");
    sessionStorage.setItem(
      "theme",
      "light"
    );
  }
});

txtmode.textContent = "Pagina Principal";

ble.addEventListener("click", async (event) => {

  event.preventDefault();

  await import("./ble.js");

});

const txtqr = sessionStorage.getItem("QR");

if(txtqr !== null) {
  console.log(txtqr);
}
