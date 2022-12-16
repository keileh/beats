const slider = $('.products__list').bxSlider({
    pager: false,
    controls: false
});

$('.slider__arrow--prev').click(e => {
    e.preventDefault();
    
    slider.goToPrevSlide();
})

$('.slider__arrow--next').click(e => {
    e.preventDefault();

    slider.goToNextSlide();
})