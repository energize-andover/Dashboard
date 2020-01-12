let overlay = $('#overlay');
var layout;

waitForFontAwesome(() => {
    $('#overlay-content').css({
        'top': '50%',
        'transform': 'translateY(-50%)'
    });
});

if (window.localStorage.getItem('currentLayout') !== null) {
    layout = WidgetLayout.fromString(window.localStorage.getItem('currentLayout'));

    // Hide the overlay
}

let button = $('#submit');

button.click(() => {
    let input = $('#row-input'), chosenNum = input.val(), errorMessage = $('#error-message'), field = $('.field');

    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 2) {
        errorMessage.html('Please enter a whole number that is no more than 2!');
        errorMessage.removeClass('is-hidden');
        input.removeClass('colored');
        input.addClass('is-danger');
        button.removeClass('colored-button');
        button.addClass('is-danger');
        if (!field.is(':animated'))
            field.effect('shake');

        input.focus();
    } else {
        let colData = [];

        for (let i = 0; i < chosenNum; i++)
            colData.push(2);

        layout = new WidgetLayout(colData);
        window.localStorage.setItem('currentLayout', layout.toString());

        overlay.fadeOut()
    }
});