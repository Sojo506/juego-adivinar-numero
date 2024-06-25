// Manipulación del DOM

// Variables globales
let numeroSecreto = 0;
let contador = 0;
const numeroMaximo = 10;
const contenedorNumeros = [];
const containerInput = document.querySelector('.container__input');
const reiniciar = document.querySelector('#reiniciar');
const intentar = document.querySelector('#btn__intentar');

// Establece las condiciones iniciales del juego
condicionesIniciales();

// Evento para verificar el intento del usuario
intentar.addEventListener('click', verificarIntento);

// Función que verifica el intento del usuario
function verificarIntento() {
    const numeroUsuario = parseInt(containerInput.value);

    if (isNaN(numeroUsuario)) {
        asignarTextoElemento(
            '.texto__parrafo',
            'Por favor, ingrese un número válido.'
        );
        return;
    }

    if (numeroSecreto === numeroUsuario) {
        asignarTextoElemento(
            '.texto__parrafo',
            `¡Acertaste Maquinola en ${contador} ${
                contador === 1 ? 'intento' : 'intentos'
            } 🥳`
        );
        finalizarJuego();
    } else {
        asignarTextoElemento(
            '.texto__parrafo',
            numeroSecreto > numeroUsuario
                ? 'El número es mayor'
                : 'El número es menor'
        );
        contador++;
        containerInput.value = '';
    }
}

// Función que asigna texto a un elemento del DOM
function asignarTextoElemento(selector, contenido) {
    document.querySelector(selector).textContent = contenido;
}

// Función que genera un número aleatorio entre un rango dado y lo almacena si no ha sido generado antes
function numeroRandom(min, max) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;

    if (contenedorNumeros.includes(numero)) {
        return numeroRandom(min, max);
    } else {
        contenedorNumeros.push(numero);
        return numero;
    }
}

// Función que finaliza el juego
function finalizarJuego() {
    intentar.disabled = true;
    reiniciar.disabled = false;
}

// Función que reinicia el juego
function reiniciarJuego() {
    reiniciar.disabled = true;
    intentar.disabled = false;
    containerInput.value = '';
    condicionesIniciales();
}

// Función que establece las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('#titulo', 'Juego del número secreto');
    asignarTextoElemento(
        '.texto__parrafo',
        `Indica un número del 1 al ${numeroMaximo}`
    );
    numeroSecreto = numeroRandom(1, numeroMaximo);
    contador = 1;
}

// Evento para reiniciar el juego
reiniciar.addEventListener('click', reiniciarJuego);
