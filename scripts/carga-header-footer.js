import { configurarModalesFooter } from './codigo-modal-footer.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await cargarHeader();
        configurarNavbar();
        configurarModal();
    } catch (error) {
        console.error('Error durante la carga:', error);
    }

    try {
        await cargarFooter();
        configurarModalesFooter();
    } catch (error) {
        console.error('Error al cargar el footer:', error);
    }
});

async function cargarHeader() {
    const response = await fetch('../html/header.html');
    if (!response.ok) {
        throw new Error('Error al cargar el header');
    }
    const data = await response.text();
    document.querySelector('header').innerHTML = data;
}

async function cargarFooter() {
    const response = await fetch('../html/footer.html');
    if (!response.ok) {
        throw new Error('Error al cargar el footer');
    }
    const data = await response.text();
    document.querySelector('footer').innerHTML = data;
}

// ------------------- NAV-BAR -------------------

function configurarNavbar() {
    var aboutUsBtn = document.getElementById('myBtn');
    var contactBtn = document.getElementById('contact-button');

    aboutUsBtn.addEventListener("click", () => {
        document.getElementById('open-menu').checked = false;
    });

    contactBtn.addEventListener("click", () => {
        document.getElementById('open-menu').checked = false;
    });

    enlaceActual();
}

function enlaceActual() {
    const urlParams = new URLSearchParams(window.location.search);
    const liga = urlParams.get('liga');
    let currentLink;
    switch (liga) {
        case 'pl': currentLink = document.getElementById('premier'); break;
        case 'sa': currentLink = document.getElementById('seriea'); break;
        case 'll': currentLink = document.getElementById('laliga'); break;
        case 'bl': currentLink = document.getElementById('bundesliga'); break;
        case 'pb': currentLink = document.getElementById('primerab'); break;
        default: currentLink = document.getElementById('lpfa'); break;
    }
    currentLink.classList.add("header__navbar-link--active");
}

function configurarModal() {
    var modal = document.getElementById("myModal");

    var btn = document.getElementById("myBtn");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }


    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// ----------------- FIN-NAV-BAR -----------------