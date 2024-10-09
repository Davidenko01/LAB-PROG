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

        //ACA VA LA PARTE DE LOS ANTERIORES PARTIDOS

        //CREO LA FILA DEL PARTIDO
        const nextMatches = document.getElementById('previous-matches-table');
        equipoEncontrado.last_5_matches.forEach(match => {
            const partido = nextMatches.insertRow();
            partido.className = 'match';

            //PONGO EL NOMBRE DEL EQUIPO SELECCIOANDO
            const equipoSNombre = partido.insertCell();
            equipoSNombre.className = 'team-name';
            equipoSNombre.textContent = equipo;

            //PONGO LOS GOLES DEL EQUIPO SELECCIONADO
            const equipoSGoles = partido.insertCell();
            equipoSGoles.className = 'score';
            equipoSGoles.textContent = match.team_score;

            //pongo datos de la fecha y el estadio
            const infoFechaEstadioProx = partido.insertCell();
            infoFechaEstadioProx.className = 'date-stadium';
            const fechaProx = document.createElement('p');
            const estadioProx = document.createElement('p');
            fechaProx.className = 'match-date';
            estadioProx.className = 'stadium';
            fechaProx.textContent = match.date
            estadioProx.textContent = match.stadium
            infoFechaEstadioProx.appendChild(fechaProx);
            infoFechaEstadioProx.appendChild(estadioProx);

            //PONGO LOS GOLES DEL EQUIPO RIVAL
            const equipoRGoles = partido.insertCell();
            equipoRGoles.className = 'score';
            equipoRGoles.textContent = match.opponent_score;

            //PONGO EL NOMBRE DEL EQUIPO RIVAL
            const equipoRNombre = partido.insertCell();
            equipoRNombre.className = 'team-name';
            equipoRNombre.textContent = match.opponent;

        });
    });

}

const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
const equipo = urlParams.get('equipo');
let anchor;
switch(liga) {
    default: crearFixture('../json/partidos.json', equipo);
    ;break;
}