function crearTablaPosiciones() {
    const url = 'liga_argentina_posiciones.json'; 
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const tabla = document.getElementById('tabla-pos').getElementsByTagName('tbody')[0];
        
        data.positions.forEach((equipo, index) => {
            const fila = tabla.insertRow();

            const celdaPosicion = fila.insertCell();
            celdaPosicion.textContent = index+1;

            const celdaEquipo = fila.insertCell();
            celdaEquipo.textContent = equipo.team;

            const celdaPts = fila.insertCell();
            celdaPts = celdaPts = equipo.pts;

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
crearTablaPosiciones();