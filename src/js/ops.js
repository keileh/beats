const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".menu");
const menuItems = sideMenu.find(".menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
    return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "menu--light";

    if (menuTheme == "white") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    };
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
    if (inScroll == false) {
        const transitionOver = 1000;
        const mouseInvertiaOver = 300;

        inScroll = true;
        const sectionPosition = countSectionPosition(sectionEq);
    
        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${sectionPosition}%)`
        });

        resetActiveClassForItem(sections, sectionEq, "active");

        setTimeout(() => {
            inScroll = false;

            resetActiveClassForItem(menuItems, sectionEq, "menu__item-active");
        }, transitionOver + mouseInvertiaOver);
    }
};

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction == "next" && nextSection.length) {
        performTransition(nextSection.index());
    };

    if (direction == "prev" && prevSection.length) {
        performTransition(prevSection.index());
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport("next");
    }

    if (deltaY < 0) {
        scrollViewport("prev");
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !== "input" && tagName !== "textarea") {
        switch (e.keyCode) {
            case 38: //prev
                scrollViewport("prev");
                break;
    
            case 40: //next 
                scrollViewport("next");
                break;
        }
    }
}); 

$(".wrapper").on("touchmove", e => {
    e.preventDefault();
})

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const reqTarget = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${reqTarget}]`);

    performTransition(reqSection.index());
})

if (isMobile) {
    $("body").on("swipe", {
        swipe: function(event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if (direction == "up") scrollDirection = "next";
            if (direction == "down") scrollDirection = "prev";

            scroller[scrollDirection]();
    },
  });
}