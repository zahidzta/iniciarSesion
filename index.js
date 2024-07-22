const contInputs = document.getElementsByClassName("cont-input")

//Añade el tabindex a los contenedores de los input
for (let i = 0; i < contInputs.length; i++){
    contInputs[i].setAttribute("tabindex", i)
}

//Se añade el evento click al input
let elementoSeleccionado = null

document.querySelectorAll(".input-form").forEach(input => {
    input.addEventListener("click", () => {
        let padreInput = input.parentElement
        if (elementoSeleccionado != null){
            elementoSeleccionado.classList.remove("seleccionado")
        }
        padreInput.classList.add("seleccionado")
        elementoSeleccionado = padreInput

    })
})

//Cambia la visibilidad de los input contraseña
document.querySelectorAll(".ver-pass").forEach(img => {
    img.addEventListener("click", () => {
        if (img.classList.toggle("invisible")){
            //Hace invisible el input
            img.setAttribute("src", "/resources/ojos-cruzados.png")
            img.previousElementSibling.setAttribute("type", "password")
        } else {
            //Hace visible el input
            img.setAttribute("src", "/resources/ojo.png")
            img.previousElementSibling.setAttribute("type", "text")
        }
    })
})


//Validar los campos de los formularios

//Retorna si falso si la cadena tiene espacios
function validarEspacios(cadena){
    return cadena.indexOf(" ") != -1 ? false : true
}

//Valida que el correo electronico tenga el formato correcto
function validarCorreo(correo){
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    return expReg.test(correo) && validarEspacios(correo)
}

//Valida que la contraseña tenga un minimo de 8 caracteres
function validarPassword(password){
    return password.length < 8 ? false : true
}

//Valida que el número sea correcto (no debe de tener caracteres)
function validarNumero(numero){
    var expReg = /^\d+$/
    return expReg.test(numero)
}

//Valida que las contraseñas sean iguales
function validarIgualdadPassword(passwrod, confirmPassword){
    return passwrod == confirmPassword
}


const alertCont = document.querySelector(".cont-alerta")
const formsCont = document.querySelector(".cont-forms")

document.querySelector(".iniciar-sesion").addEventListener("submit", e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    formsCont.style.filter = "blur(2px)"
    alertCont.classList.remove("inactivo")
    if (validarCorreo(data["email"].trim()) && validarPassword(data["password"])){
        document.querySelector(".alerta-iniciar").classList.remove("inactivo")
    } else {
        document.querySelector(".alerta-error").classList.remove("inactivo")
    }
})

document.querySelector(".crear-cuenta").addEventListener("submit", e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )

    formsCont.style.filter = "blur(2px)"
    alertCont.classList.remove("inactivo")
    if (validarEspacios(data["name"].trimEnd()) 
        && validarNumero(data["phone"]) 
        && validarCorreo(data["email"].trim()) 
        && validarPassword(data["password"]) 
        && validarIgualdadPassword(data["password"], data["confirm_password"])){

            document.querySelector(".alerta-crear").classList.remove("inactivo")

    } else {
        document.querySelector(".alerta-error").classList.remove("inactivo")
    }

})

document.querySelectorAll(".cerrar-alerta").forEach(boton =>{
    boton.addEventListener("click", () =>{
        formsCont.style.filter = "blur(0)"
        alertCont.classList.add("inactivo")
        boton.parentElement.classList.add("inactivo")
    })
})