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
        const nextMatches = document.getElementsByClassName('match-results')[0];
        equipoEncontrado.last_5_matches.forEach(match => {
            const partido = document.createElement('div');
            partido.className = 'match';
            nextMatches.appendChild(partido);

            const equipoSeleccionadoGoles = document.createElement('div');
            equipoSeleccionadoGoles.className = 'team-score';
            const goles = document.createElement('p');
            const equipoS = document.createElement('p');
            goles.className = 'score';
            equipoS.className = 'team-name';
            equipoS.textContent = equipo;
            goles.textContent = match.team_score;
            equipoSeleccionadoGoles.appendChild(equipoS);
            equipoSeleccionadoGoles.appendChild(goles);
            partido.appendChild(equipoSeleccionadoGoles);

            const infoFechaEstadioProx = document.createElement('div');
            infoFechaEstadioProx.className = 'date-stadium';
            const fechaProx = document.createElement('p');
            const estadioProx = document.createElement('p');
            fechaProx.className = 'match-date';
            estadioProx.className = 'stadium';
            fechaProx.textContent = match.date
            estadioProx.textContent = match.stadium
            infoFechaEstadioProx.appendChild(fechaProx);
            infoFechaEstadioProx.appendChild(estadioProx);
            partido.appendChild(infoFechaEstadioProx);

            const equipoRivalGoles = document.createElement('div');
            equipoRivalGoles.className = 'team-score';
            const golesR = document.createElement('p');
            const equipoR = document.createElement('p');
            golesR.className = 'score';
            equipoR.className = 'team-name';
            equipoR.textContent = match.opponent;
            golesR.textContent = match.opponent_score;
            equipoRivalGoles.appendChild(golesR);
            equipoRivalGoles.appendChild(equipoR);
            partido.appendChild(equipoRivalGoles);

        });
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