
function cargarInfoLiga() {
    fetch('../json/ligas-info.json')
        .then(response => response.json())
        .then(ligasInfo => {

            let urlParams = new URLSearchParams(window.location.search);
            let liga = urlParams.get('liga');

            let imgElement = document.getElementById('table-header__img');
            let titleElement = document.getElementById('table-header__title');
            let infoElement = document.getElementById('table-header__info');

            //liga!= null y liga pertenezca pertenezca al json
            if (liga && ligasInfo[liga]) {
                let ligaData = ligasInfo[liga];

                imgElement.src = ligaData.imgSrc;
                titleElement.textContent = ligaData.title;
                infoElement.textContent = (String)(new Date().getFullYear());
            } else {
                titleElement.textContent = 'Liga no encontrada';
                infoElement.textContent = 'Por favor selecciona una liga válida.';
            }

           
            //provisorio, para que cargue tabla-torneo.hmtl
            if (!liga) {
                imgElement.src = "../Fotos/logo_lpfa.png";
                titleElement.textContent = "Primera División de Fútbol";
                infoElement.textContent = (String)(new Date().getFullYear());
            }

        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            let titleElement = document.getElementById('table-header__title');
            let infoElement = document.getElementById('table-header__info');
            titleElement.textContent = 'Error al cargar datos';
            infoElement.textContent = 'No se pudieron cargar los datos de la liga.';
        });
}

window.onload = cargarInfoLiga;
