const openButton = document.querySelector("#overlayOpener");
const body = document.body;

openButton.addEventListener("click", e => {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");

    const containerElement = document.createElement("div");
    containerElement.classList.add("overlay__container");

    const contentElement = document.createElement("div");
    contentElement.classList.add("overlay__content");

    const closeElement = document.createElement("a");
    closeElement.classList.add("close");
    closeElement.textContent = "x";
    closeElement.href = "#";

    overlayElement.appendChild(containerElement);
    containerElement.appendChild(closeElement);
    containerElement.appendChild(contentElement);
    body.appendChild(overlayElement);
})