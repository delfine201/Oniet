
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
const zone = document.querySelector(".zone");

const navigation = document.querySelector(".navigation");

const menu = document.getElementById("menu");
let icono = "menu";

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

const errort = document.getElementById("error");

/*console.log("navigation:", navigation);*/
console.log("themebutton:", themebutton);
console.log("buttonNext:", buttonNext);
console.log("cmostrar:", cmostrar);

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
  }else{
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light");
    themeicon.setAttribute("name", "sunny");
    themebutton.classList.add("active");
  }
});

txtmode.textContent = "Pagina Principal";