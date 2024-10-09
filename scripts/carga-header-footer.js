document.addEventListener("DOMContentLoaded", async () => {
    try {
        await cargarHeader();
        configurarNavbar();
        configurarSideNav();
    } catch (error) {
        console.error('Error durante la carga:', error);
    }

    try {
        await cargarFooter();
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

function configurarNavbar() {
    const navbar = document.getElementById("navbar");
    if (navbar) {
        const sticky = navbar.offsetTop;

        window.onscroll = function() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        };
    }
}

function configurarSideNav() {
    const urlParams = new URLSearchParams(window.location.search);
    const liga = urlParams.get('liga');
    let anchor;
    switch (liga) {
        case 'pl': anchor = document.getElementById('premier'); break;
        case 'sa': anchor = document.getElementById('seriea'); break;
        case 'll': anchor = document.getElementById('laliga'); break;
        case 'bl': anchor = document.getElementById('bundesliga'); break;
        case 'pb': anchor = document.getElementById('primerab'); break;
        default: anchor = document.getElementById('lpfa'); break;
    }
    anchor.className = "active";
}