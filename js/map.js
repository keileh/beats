let myMap; 
const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.748248, 37.609501],
        zoom: 14,
        controls: []
    });

    const coords = [
        [55.758692, 37.583321],
        [55.742765, 37.581391],
        [55.750093, 37.603710],
        [55.756522, 37.620091]
    ]; 

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/geomarker.svg',
        iconImageSize: [43, 55],
        iconImageOffset: [-3, -42]
    })

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);