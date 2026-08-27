
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

// Creamos los objetos segund sus id o sus clases
/*const zone = document.querySelector(".zone");*/

/*const navigation = document.querySelector(".navigation");*/

/*const menu = document.getElementById("menu");
let icono = "menu";*/

const themebutton = document.getElementById("theme");
const themeicon = document.getElementById("itheme");
const txtmode = document.getElementById("mode");

const buttonNext = document.querySelectorAll(".bnext");
const buttonBack = document.querySelectorAll(".back");
const buttonCreate = document.querySelector(".bcreate");

const cmostrar = document.querySelectorAll(".checkbox");

const cambiarmodo = document.querySelector("#bcm");
const circulo = document.querySelector("#circulo");
const txtm = document.querySelector("#txtm");

const create_acount = document.querySelector(".create_acount");
const login = document.querySelector(".login");

const botonLogin = login.querySelector(".bcreate");

const error = document.getElementById("error");

/*console.log("navigation:", navigation);*/
console.log("themebutton:", themebutton);
console.log("buttonNext:", buttonNext);
console.log("cmostrar:", cmostrar);

/*navigation.addEventListener("click", () => {

  zone.classList.toggle("active");
  
  if(zone.classList.contains("active")){
    icono = "close";
  }else{
    icono = "menu";
  }
  
  menu.setAttribute("name", icono);

});*/

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

txtmode.textContent = "Crear Cuenta";

buttonNext.forEach((boton) => {
  boton.addEventListener ("click", function () {
    const formulario = boton.closest(".create_acount, .login");

    const dates = formulario.querySelector(".dates");
    const medics = formulario.querySelector(".medics");
    const password = formulario.querySelector(".password");
    
    /*dates.classList.remove("active");
    password.classList.add("active");*/

    if (medics && dates.classList.contains("active")) {

      dates.classList.remove("active");
      medics.classList.add("active");

    } else {

      if (medics) {
        medics.classList.remove("active");
      }

      dates.classList.remove("active");
      password.classList.add("active");

    }
  });
});

buttonBack.forEach((button) => {
  button.addEventListener ("click", function () {
    const formulario = button.closest(".create_acount, .login");

    const dates = formulario.querySelector(".dates");
    const medics = formulario.querySelector(".medics");
    const password = formulario.querySelector(".password");
    
    /*dates.classList.add("active");
    password.classList.remove("active");*/

    if (medics && medics.classList.contains("active")) {

      dates.classList.add("active");
      medics.classList.remove("active");

    } else {

      if (medics) {
        medics.classList.add("active");
      }else {
        dates.classList.add("active");
      }

      password.classList.remove("active");

    }
  });
});

cmostrar.forEach((boton) => {
  boton.addEventListener ("click", function () {
    const formulario = boton.closest(".create_acount, .login");

    const imostrar = formulario.querySelector(".imostrar");
    const password = formulario.querySelectorAll(".password1");
    
    if(boton.classList.contains("active")){
      boton.classList.remove("active");
      imostrar.style.opacity = "0";
      password.forEach((passw) => {
        passw.type = "password";
      });
    }else{
      boton.classList.add("active");
      imostrar.style.opacity = "1";
      password.forEach((passw) => {
        passw.type = "text";
      });
    }
  });
});

cambiarmodo.addEventListener("click", () => {
  circulo.classList.toggle("active");

  txtm.textContent = circulo.classList.contains("active")
    ? "¿No tienes cuenta?"
    : "¿Ya tienes cuenta?";

  cambiarmodo.textContent = circulo.classList.contains("active")
    ? "Crear Cuenta"
    : "Inicia Sesión";

  txtmode.textContent = circulo.classList.contains("active")
    ? "Iniciar Sesión"
    : "Crear Cuenta";

  if(circulo.classList.contains("active")){
    create_acount.classList.remove("active");
    login.classList.add("active");
  }else{
    create_acount.classList.add("active");
    login.classList.remove("active");
  }

  const formularioActivo = circulo.classList.contains("active")
    ? login
    : create_acount;
  
  const dates = formularioActivo.querySelector(".dates");
  const password = formularioActivo.querySelector(".password");
  
  dates.classList.add("active");
  password.classList.remove("active");
});

buttonCreate.addEventListener("click", async () => {
  buttonCreate.disabled = true;

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("dni").value;
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const email = document.getElementById("emailRegistro").value;
  const alergias = document.getElementById("alergias").value;
  const enfermedades = document.getElementById("enfermedades").value;

  const passwordr = document.getElementById("passwordRegistro").value;
  const confirmacion = document.getElementById("passwordConfirmacion").value;

  if (passwordr !== confirmacion) {
    error.textContent = "Las contraseñas no coinciden";
    return;
  }else {
    error.textContent = "";
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      passwordr
    );

    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      fechaNacimiento: fechaNacimiento,
      email: email,
      alergias: alergias,
      enfermedades: enfermedades
    });
  } catch (e) {

    console.error(e);
    error.textContent = e.message;

    botonCrear.disabled = false;
  }

});

botonLogin.addEventListener("click", async () => {

  const email = login.querySelector("#emailLogin").value;
  const password = login.querySelector("#passwordLogin").value;

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const referencia = doc(db, "usuarios", user.uid);

    const datos = await getDoc(referencia);

    if (datos.exists()) {
      console.log(datos.data());
    }

    const user = userCredential.user;

    console.log("Sesión iniciada:", user.uid, datos.data().name);

  } catch (error) {

    console.error(error);

    document.getElementById("error").textContent =
      "Correo o contraseña incorrectos";

  }

});