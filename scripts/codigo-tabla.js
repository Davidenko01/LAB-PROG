function crearTablaPosiciones(url, liga) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('body-table');
            const directorio=seleccionCarpetaLiga(liga); //Obtenemos directorio correspondiente a la liga
            data.positions.forEach((equipo, index) => {
                const fila = tabla.insertRow();
                fila.onclick = () => {
                    const nuevaURL = `fixture.html?liga=${liga}&equipo=${equipo.team}`;
                    window.open(nuevaURL, '_self');
                };

                const celdaPosicion = fila.insertCell();
                celdaPosicion.textContent = index + 1;

                const celdaEquipo = fila.insertCell();
                celdaEquipo.className = "team-name";
                const escudo = document.createElement('img');
                escudo.className = "escudo";
                escudo.src = `../Fotos/${directorio}/${equipo.icon}`
                celdaEquipo.appendChild(escudo);
                const nombreEquipo = document.createTextNode(equipo.team);
                celdaEquipo.appendChild(nombreEquipo);

                const celdaPts = fila.insertCell();
                celdaPts.textContent = equipo.pts;

                const celdaPJ = fila.insertCell();
                celdaPJ.textContent = equipo.pj;

                const celdaPG = fila.insertCell();
                celdaPG.textContent = equipo.pg;

                const celdaPE = fila.insertCell();
                celdaPE.textContent = equipo.pe;

                const celdaPP = fila.insertCell();
                celdaPP.textContent = equipo.pp;

                const celdaGF = fila.insertCell();
                celdaGF.textContent = equipo.gf;

                const celdaGC = fila.insertCell();
                celdaGC.textContent = equipo.gc;

                const celdaDIF = fila.insertCell();
                celdaDIF.textContent = equipo.dif;
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });

}

function seleccionCarpetaLiga(liga){
    //Esta funcion recibe por parametro una liga y devuelve el nombre directorio correspondiente a la liga
    var carpetaLiga;
    switch(liga){
        case "lpfa": carpetaLiga="primeradivision"; break;
        case "pl": carpetaLiga="premier"; break;
        case "sa": carpetaLiga="seriea"; break;
        case "ll": carpetaLiga="laliga"; break;
        case "bl": carpetaLiga="bundesliga"; break;
        case "pb": carpetaLiga="primerab"; break;
    }
    return carpetaLiga;
}

const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
let anchor;
    switch (liga) {
        case 'pl': crearTablaPosiciones('../json/premier-league.json', 'pl')
            anchor = document.getElementById('premier');
            ; break;
        case 'sa': crearTablaPosiciones('../json/serie-A.json', 'pb')
            anchor = document.getElementById('seriea');

            ; break;
        case 'll': crearTablaPosiciones('../json/la-liga.json', 'll')
            anchor = document.getElementById('laliga');

            ; break;
        case 'bl': crearTablaPosiciones('../json/bundesliga.json', 'bl')
            anchor = document.getElementById('bundesliga');
            ; break;
        case 'pb': crearTablaPosiciones('../json/primera-b.json', 'pb')
            anchor = document.getElementById('primerab');
        
            ; break;
        default: crearTablaPosiciones('../json/liga_argentina_posiciones.json', 'lpfa')
            anchor = document.getElementById('lpfa');
            anchor.className = "active";
            ; break;
    }
