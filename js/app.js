/**
 * APP para mostrar el clima con Fetch API y Open Weather API
 * Autor: Moisés Jiménez Macías
 *  url: https://github.com/ScarKMS/App-de-Clima
 */

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    // Consiltar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const isAlerta = document.querySelector('.bg-red-100');
    if (!isAlerta) {
        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
             <strong class="font-bold">Error!</strong>
             <span class="block">${mensaje}</span>
         `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

function consultarAPI(ciudad, pais) {
    const appId = '36b5f1375460f4e961b526808f596aa3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    //Muestra el spinner
    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            //Limpiar HTML previo
            limpiarHTML();

            //Comprueba que la ciudad exista
            if (datos.cod === "404") {
                mostrarError('Ciudad no Encontrada');
                return;
            }

            //Imprime la respuesta en el HTML
            mostarClima(datos);
        })
}

function mostarClima(datos) {

    const { name, main: { temp, temp_max, temp_min } } = datos;
    const tempActual = kelvinCentigrados(temp);
    const tempMax = kelvinCentigrados(temp_max);
    const tempMin = kelvinCentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${tempActual} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const maxima = document.createElement('p');
    maxima.innerHTML = `Max: ${tempMax} &#8451;`;
    maxima.classList.add('text-xl');

    const minima = document.createElement('p');
    minima.innerHTML = `Min: ${tempMin} &#8451;`;
    minima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxima);
    resultadoDiv.appendChild(minima);

    resultado.appendChild(resultadoDiv);
}

/**
 * 
 * function kelvinCentigrados(grados) {
    return parseInt(grados - 273.15);
    }} grados 
 */

const kelvinCentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
         <div class="rect1"></div>
         <div class="rect2"></div>
         <div class="rect3"></div>
         <div class="rect4"></div>
         <div class="rect5"></div>
     `;
    resultado.appendChild(divSpinner);
}