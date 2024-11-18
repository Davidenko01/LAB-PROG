var navLinks = document.querySelectorAll(".table-header__link");

navLinks.forEach(link => {
    link.addEventListener('click', () => {

        navLinks.forEach(l => l.classList.remove("table-header__link--active"));

        link.classList.add("table-header__link--active");
    });
}); 

// var navLinks = document.querySelectorAll(".table-header__link");
// var windowPathname = window.location.pathname;

// navLinks.forEach(link => {

//     var navLinkPathname = new URL(link.href).pathname;

//     if ((windowPathname === navLinkPathname) || (windowPathname === '/tabla-torneo.html' && navLinkPathname === '/')) {
//         link.classList.add("table-header__link--active");
//     }
// });  