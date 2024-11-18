function crearTablaPosiciones(liga) {
    fetch(`/api/tablas?liga=${liga}`)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('body-table');
            const directorio= data.dir; //Obtenemos directorio correspondiente a la liga
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
                escudo.src = `../${directorio}/${equipo.icon}`
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
const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
crearTablaPosiciones(liga);

