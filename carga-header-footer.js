// Cargar header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;
    })
    .catch(error => console.log('Error al cargar el header:', error));

// Cargar footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').innerHTML = data;
    })
    .catch(error => console.log('Error al cargar el footer:', error));