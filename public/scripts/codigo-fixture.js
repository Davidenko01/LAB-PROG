function crearFixture(url, equipo, liga) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //ACÁ BUSCO AL EQUIPO EN EL JSON
        const equipoEncontrado = data.teams.find((elemento) => elemento.name === equipo);
        const matchInfo = document.getElementsByClassName('match-info')[0];
        const directorio=seleccionCarpetaLiga(liga);

        //ACÁ CREO LA PARTE DEL PROXIMO PARTIDO
        const equipoSeleccionado = document.createElement('div');
        equipoSeleccionado.className = 'selected-team';
        const escudoSProx = document.createElement('img');
        escudoSProx.className = "escudo";
        escudoSProx.src = `../Fotos/${directorio}/${equipoEncontrado.icon}`
        equipoSeleccionado.textContent = equipo;
        equipoSeleccionado.appendChild(escudoSProx);
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
        const escudoRProx = document.createElement('img');
        escudoRProx.className = "escudo";
        const equipoRivalProx = data.teams.find((tipo) => tipo.name === equipoEncontrado.next_match.opponent);
        escudoRProx.src = `../Fotos/${directorio}/${equipoRivalProx.icon}`
        equipoRival.appendChild(escudoRProx);
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
            const escudoS = document.createElement('img');
            escudoS.className = "escudo";
            escudoS.src = `../Fotos/${directorio}/${equipoEncontrado.icon}`
            const nombreEquipo = document.createTextNode(equipo);
            equipoSNombre.appendChild(escudoS);
            equipoSNombre.appendChild(nombreEquipo);

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
            const escudoR = document.createElement('img');
            escudoR.className = "escudo";
            let equipoR = data.teams.find((tipo) => tipo.name === match.opponent);
            escudoR.src = `../Fotos/${directorio}/${equipoR.icon}`
            const nombreRival = document.createTextNode(match.opponent);
            equipoRNombre.appendChild(escudoR);
            equipoRNombre.appendChild(nombreRival);

            // PONGO LA COLUMNA EXTRA AL FINAL Y ESTABLEZCO EL COLOR
            const columnaExtraFinal = partido.insertCell();
            columnaExtraFinal.className = 'column-end';

            // Ajusta el color de fondo basado en el valor del score del equipo seleccionado
            if (match.team_score > match.opponent_score) {
                columnaExtraFinal.style.backgroundColor = 'green';
            } else if (match.team_score < match.opponent_score) {
                columnaExtraFinal.style.backgroundColor = 'red';
            } else {
                columnaExtraFinal.style.backgroundColor = 'gray'; // Empate
            }

        });
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
        case "pb": carpetaLiga="primeranacional"; break;
    }
    return carpetaLiga;
}

const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
const equipo = urlParams.get('equipo');
let anchor;
switch(liga) {
    default: crearFixture('../json/partidos.json', equipo, liga);
    ;break;
}