function crearTablaPosiciones(url, liga) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const tabla = document.getElementById('body-table');
        
        data.positions.forEach((equipo, index) => {
            const fila = tabla.insertRow();
            fila.onclick = () => {
                const nuevaURL = `fixture.html?liga=${liga}&equipo=${equipo.team}`;
                window.open(nuevaURL, '_self');
            };

            const celdaPosicion = fila.insertCell();
            celdaPosicion.textContent = index+1;

            const celdaEquipo = fila.insertCell();
            celdaEquipo.className = "team-name";
            celdaEquipo.textContent = equipo.team;

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

const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
let anchor;
switch(liga) {
    case 'pl':  crearTablaPosiciones('premier-league.json', 'pl')
    anchor = document.getElementById('premier');
    anchor.className = "active";
    ;break;
    default: crearTablaPosiciones('liga_argentina_posiciones.json', 'lpfa')
    anchor = document.getElementById('lpfa');
    anchor.className = "active";
    ;break;
}