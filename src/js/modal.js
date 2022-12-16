const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach((field) => {
        field.removeClass("input__error");
        if (field.val().trim() === "") {
            field.addClass("input__error");
        }
    })

    const errorFields = form.find(".input__error");

    return errorFields.length === 0;
}

$("#form").submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modalWindow");
    const content = modal.find(".modal__content");
    content.removeClass('modal__content--error');

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },
            success: (data) => {
                content.text(data.message);
                Fancybox.show([{ 
                    src: "#modalWindow", 
                    type: "inline" 
                }]);
            },
            error: (data) => {
                content.text('Произошла ошибка, попробуйте заново');
                content.addClass('modal__content--error');
                Fancybox.show([{ 
                    src: "#modalWindow", 
                    type: "inline" 
                }]);
            }
        })
    }

})


$('.app-submit-btn').click(e => {
    e.preventDefault();
    
    Fancybox.close();
})