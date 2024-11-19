function crearFixture(liga, equipo) {
    fetch(`/api/partidos?liga=${liga}&equipo=${equipo}`)
    .then(response => response.json())
    .then(data => {
        //ACÁ BUSCO AL EQUIPO EN EL JSON
        const matchInfo = document.getElementsByClassName('match-info')[0];
        const directorio= data.dir;

        //ACÁ CREO LA PARTE DEL PROXIMO PARTIDO
        const equipoSeleccionado = document.createElement('div');
        equipoSeleccionado.className = 'selected-team';
        const escudoSProx = document.createElement('img');
        escudoSProx.className = "escudo";
        escudoSProx.src = `../${directorio}/${data.icon}`
        equipoSeleccionado.textContent = data.name;
        equipoSeleccionado.appendChild(escudoSProx);
        matchInfo.appendChild(equipoSeleccionado);

        const infoFechaEstadio = document.createElement('div');
        infoFechaEstadio.className = 'next-match-info';
        const fecha = document.createElement('p');
        const estadio = document.createElement('p');
        fecha.className = 'match-date';
        estadio.className = 'stadium';
        fecha.textContent = data.next_match.date;
        estadio.textContent = data.next_match.stadium;
        infoFechaEstadio.appendChild(fecha);
        infoFechaEstadio.appendChild(estadio);
        matchInfo.appendChild(infoFechaEstadio);

        const equipoRival = document.createElement('div');
        equipoRival.className = 'rival-team';
        equipoRival.textContent = data.next_match.opponent;
        const escudoRProx = document.createElement('img');
        escudoRProx.className = "escudo";
        escudoRProx.src = `../${directorio}/${data.next_match.icon}`
        equipoRival.appendChild(escudoRProx);
        matchInfo.appendChild(equipoRival);

        //ACA VA LA PARTE DE LOS ANTERIORES PARTIDOS

        //CREO LA FILA DEL PARTIDO
        const nextMatches = document.getElementById('previous-matches-table');
        data.last_5_matches.forEach(match => {
            const partido = nextMatches.insertRow();
            partido.className = 'match';

            //PONGO EL NOMBRE DEL EQUIPO SELECCIOANDO
            const equipoSNombre = partido.insertCell();
            equipoSNombre.className = 'team-name';
            const escudoS = document.createElement('img');
            escudoS.className = "escudo";
            escudoS.src = `../${directorio}/${data.icon}`
            const nombreEquipo = document.createTextNode(data.name);
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
            escudoR.src = `../${directorio}/${match.icon}`
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

const urlParams = new URLSearchParams(window.location.search);
const liga = urlParams.get('liga');
const equipo = urlParams.get('equipo');
crearFixture(liga, equipo);