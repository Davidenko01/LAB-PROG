function cargarInfoLiga(ligaSelected) {
    fetch(`/api/tablas/header?liga=${ligaSelected}`)
        .then(response => response.json())
        .then(ligaInfo => {
            let imgElement = document.getElementById('table-header__img');
            let titleElement = document.getElementById('table-header__title');
            let infoElement = document.getElementById('table-header__info');

            imgElement.src = ligaInfo.imgSrc;
            titleElement.textContent = ligaInfo.title;
            infoElement.textContent = (String)(new Date().getFullYear());       
        });
}

const urlParametros = new URLSearchParams(window.location.search);
const ligaSelected = urlParametros.get('liga');
cargarInfoLiga(ligaSelected);

