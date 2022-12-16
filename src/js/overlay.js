const openButton = document.getElementById('overlayOpener');
const overlayMenu = document.getElementById('overlayMenu');
const closeButton = document.getElementById('overlayCloser');

openButton.addEventListener('click', e =>{
    e.preventDefault();

    overlayMenu.classList.toggle('overlay--active');
})

closeButton.addEventListener('click', e => {
    e.preventDefault();

    overlayMenu.classList.toggle('overlay--active');
})

overlayMenu.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('overlay__link')) {
        overlayMenu.classList.remove('overlay--active');
    }
})