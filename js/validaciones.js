export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
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
        valueMissing: "Ingrese su nombre para poder continuar"
    },
    email : {
        valueMissing: "Ingrese su correo electronico para poder continuar",
        typeMismatch: "Formato de correo no valido, favor de verificar "
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento : {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero : {
        valueMissing: "Ingrese su numero para poder continuar",
        valueMismatch: "El formato no es valido"
    },
    direccion: {
        valueMissing: "Ingrese su direccion para poder continuar",
        valueMismatch: "Formato no valido, es necesario 10-40 caracteres"
    },
    ciudad: {
        valueMissing: "Ingrese su ciudad para poder continuar",
        valueMismatch: "Formato no valido, es necesario 4-20 caracteres"
    },
    estado: {
        valueMissing: "Indique su estado de residencia para poder continuar",
        valueMismatch: "Formato no valido, es necesario 4-20 caracteres"
    },
  };
  
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };
  
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}