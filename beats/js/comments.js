const findBlockByAlias = (alias) => {
    return $(".comment__item").filter((ndx, item) => {
        return $(item).attr("data-opened") == alias;
    });
}

$(".interactive-avatar__link").on('click', e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const switcherButton = $this.closest(".comment__switcher-item");
    const itemToShow = findBlockByAlias(target);

    itemToShow.addClass("comment__item--active").siblings().removeClass("comment__item--active");
    switcherButton.addClass("interactive-avatar-active").siblings().removeClass("interactive-avatar-active");
})