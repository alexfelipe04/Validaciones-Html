/*const inputNacimiento = document.querySelector("#birth");
inputNacimiento.addEventListener("blur", (evento) =>{
     validarNacimiento(evento.target);
});*/

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
  }
  
  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];
  
  const mensajesDeError = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    password: {
      valueMissing: "El campo contraseña no puede estar vacío",
      patternMismatch:
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "Este campo no puede estar vacío",
      customError: "Debes tener al menos 18 años de edad",
    },
  };
  
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

  function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }
  
  
  


function validarNacimiento(input){
    const fecha = new Date(input.value);
    let mensaje='';
    if (!mayor_Edad(fecha)){
        mensaje= "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayor_Edad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha =new Date(
                                    fecha.getUTCFullYear()+18, 
                                    fecha.getUTCMonth(), 
                                    fecha.getUTCDate());

    return diferenciaFecha < fechaActual;


}