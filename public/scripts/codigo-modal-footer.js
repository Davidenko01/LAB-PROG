export function configurarModalesFooter() {
    const openModalLinks = document.querySelectorAll(".footer__link-open-modal");
    const modal = document.querySelector(".modal-window");
    const modalContent = document.querySelector(".modal-window__content");

    var lastKey = '';
    var url = '';

    openModalLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const key = link.getAttribute("data-key");

            if (lastKey != key) {
                modalContent.innerHTML = '';
                url = '../json/' + key + '.json';

                newModal(url, modalContent);
                 
                lastKey = key;        
            }
            modal.showModal();        
            //Al abrir la ventana modal se controla si mostrar o no el boton up
            //Se esperan 50ms para el renderizado 
            setTimeout(checkOverflow, 50);   
        });
    });
    //Al cambiar el tamanio controla si mostrar o no el boton up 
    window.addEventListener("resize", checkOverflow);
}

function newModal(url, modalContent) {
    const modalTitle = document.querySelector(".modal-window__title");

    fetch(url)
        .then(response => response.json())
        .then(data => {

            modalTitle.textContent = data.title;

            data.sections.forEach(section => {

                switch (section.type) {
                    case 'paragraph':
                        var paragraph = document.createElement('p');
                        paragraph.textContent = section.content;
                        modalContent.appendChild(paragraph);
                        break;
                    case 'list':
                        var list = document.createElement('ol');
                        section.content.forEach(item => {
                            const listItem = document.createElement('li');
                            listItem.textContent = item;
                            list.appendChild(listItem);
                        });
                        modalContent.appendChild(list);
                        break;
                    default:
                        var title = document.createElement('h3');
                        title.textContent = section.content;
                        modalContent.appendChild(title);
                        break;
                }
            });
        })
        .catch(error => console.error('Error al cargar el contenido del modal:', error));
}


function checkOverflow() {
    const modal = document.querySelector(".modal-window");
    const upButton = document.querySelector(".modal-window__button--up");

    if (modal.hasAttribute("open")) {
        // console.log(modal.scrollHeight > modal.clientHeight);
        if (modal.scrollHeight > modal.clientHeight) {
            upButton.style.display = "block";
        } else {
            upButton.style.display = "none";
        }
    }
}
