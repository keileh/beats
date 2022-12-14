const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__desc");
    const textBlock = contentBlock.find(".team__desc-container");
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__desc');
    const itemContainer = container.find('.team__item');

    itemContainer.removeClass("active");
    items.height(0);
}

$('.team__title').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team__list');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
})