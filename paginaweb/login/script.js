
/* =========================
   ABRIR / CERRAR
========================= */

const zone = document.querySelector(".zone");

const navigation = document.querySelector(".navigation");

const menu = document.getElementById("menu");
let icono = "menu";

const themebutton = document.getElementById("theme");
const themeicon = document.getElementById("itheme");
const txtmode = document.getElementById("mode");

const buttonNext = document.querySelectorAll(".bnext");
const buttonBack = document.querySelectorAll(".back");

const cmostrar = document.querySelectorAll(".checkbox");

const cambiarmodo = document.querySelector("#bcm");
const circulo = document.querySelector("#circulo");
const txtm = document.querySelector("#txtm");

const create_acount = document.querySelector(".create_acount");
const login = document.querySelector(".login");

console.log("navigation:", navigation);
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
    const password = formulario.querySelector(".password");
    
    dates.classList.add("active");
    password.classList.remove("active");
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