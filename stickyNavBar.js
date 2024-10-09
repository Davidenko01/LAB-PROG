 // Selecciona la barra de navegación
 const navbar = document.getElementById("navbar");
    const sticky = navbar.offsetTop; // Obtiene la posición inicial de la barra

    // Función que se ejecuta al hacer scroll
    window.onscroll = function() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    };