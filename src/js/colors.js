const mesureWidth = elem => {
    let reqElemWidth = 0;
    const screenWidth = $(window).width();
    const containerColors = elem.closest(".colors");
    const titlesBlocks = containerColors.find(".colors__item-title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = elem.find(".colors__item-content");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isTablet = window.matchMedia("(max-width: 768px)").matches;
    const isMobile = window.matchMedia("(max-width: 480px)").matches;

    if (isTablet) {
        reqElemWidth = screenWidth - titlesWidth;
    }

    if (isMobile) {
        reqElemWidth = screenWidth - titlesBlocks.width();
    } 
    if (!isTablet && !isMobile) {
        reqElemWidth = 500;
    };

    return {
        containerColors: reqElemWidth,
        textContainer: reqElemWidth - paddingLeft - paddingRight
    }
};

const closeEveryElemInContainer = (containerColors) => {
    const elems = containerColors.find(".colors__item");
    const contentBlock = containerColors.find(".colors__wrapper-content");
    
    elems.removeClass("active");
    contentBlock.width(0);
};

const openElem = (elem) => {
    const hiddenContent = elem.find(".colors__wrapper-content");
    const requiredWidth = mesureWidth(elem);
    const textBlock = elem.find(".colors__item-content");

    elem.addClass("active");
    hiddenContent.width(requiredWidth.containerColors);
    textBlock.width(requiredWidth.textContainer);
};

$(".colors__item-title").click(e => {
    e.preventDefault();

    const $this =  $(e.currentTarget);
    const elem = $this.closest(".colors__item");
    const elemOpened = elem.hasClass("active");
    const containerColors = $this.closest(".colors");

    if (elemOpened) {
        closeEveryElemInContainer(containerColors);
    } else{
        closeEveryElemInContainer(containerColors);
        openElem(elem);
    };
});