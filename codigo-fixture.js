function crearFixture(url, equipo) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //ACÁ BUSCO AL EQUIPO EN EL JSON
        const equipoEncontrado = data.teams.find((elemento) => elemento.name === equipo);
        const matchInfo = document.getElementsByClassName('match-info')[0];

        //ACÁ CREO LA PARTE DEL PROXIMO PARTIDO
        const equipoSeleccionado = document.createElement('div');
        equipoSeleccionado.className = 'selected-team';
        equipoSeleccionado.textContent = equipo;
        matchInfo.appendChild(equipoSeleccionado);

        const infoFechaEstadio = document.createElement('div');
        infoFechaEstadio.className = 'next-match-info';
        const fecha = document.createElement('p');
        const estadio = document.createElement('p');
        fecha.className = 'match-date';
        estadio.className = 'stadium';
        fecha.textContent = equipoEncontrado.next_match.date;
        estadio.textContent = equipoEncontrado.next_match.stadium;
        infoFechaEstadio.appendChild(fecha);
        infoFechaEstadio.appendChild(estadio);
        matchInfo.appendChild(infoFechaEstadio);

        const equipoRival = document.createElement('div');
        equipoRival.className = 'rival-team';
        equipoRival.textContent = equipoEncontrado.next_match.opponent;
        matchInfo.appendChild(equipoRival);

        //ACA VA LA PARTE DE LOS PROXIMOS PARTIDOS

    });

}

const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
const equipo = urlParams.get('equipo');
let anchor;
switch(liga) {
    default: crearFixture('partidos.json', equipo);
    ;break;
}