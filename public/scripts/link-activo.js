var navLinks = document.querySelectorAll(".table-header__link");

navLinks.forEach(link => {
    link.addEventListener('click', () => {

        navLinks.forEach(l => l.classList.remove("table-header__link--active"));

        link.classList.add("table-header__link--active");
    });
}); 
 