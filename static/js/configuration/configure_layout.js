let overlay = $('#overlay'), numRows;
const aspectRatio = screen.width / screen.height;

waitForFontAwesome(() => {
    $('#overlay-content').css({
        'top': '50%',
        'transform': 'translateY(-50%)'
    });
});

let button = $('#submit');

button.click(() => {
    submitForm();
});

$('#row-input').keypress((event) => {
    if (event.keyCode === 13 || event.which === 13) {
        submitForm();
    }
});

function submitForm() {
    let input = $('#row-input'), chosenNum = input.val(), errorMessage = $('#error-message'), field = $('.field');

    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 3) {
        errorMessage.html('Please enter a whole number that is no more than 3!');
        errorMessage.removeClass('is-hidden');
        input.removeClass('colored');
        input.addClass('is-danger');
        button.removeClass('colored-button');
        button.addClass('is-danger');
        if (!field.is(':animated'))
            field.effect('shake');

        input.focus();
    } else {
        initGridster(chosenNum);
        overlay.fadeOut()
    }
}

let gridster = null;

function initGridster(maxRows = 2) {
    numRows = maxRows;

    if ($('.gridster ul').children().length === 0)
        for (let row = 1; row <= maxRows; row++)
            for (let column = 1; column < 4; column += 2) {
                let element = `<li data-sizey="1" data-sizex="2" data-col="${column}" data-row="${row}"><div class="gridster-box"><div class="handle-resize"></div></div></li>`
                $('.gridster ul').append(element);
            }

    gridster = $(".gridster ul").gridster({
        widget_base_dimensions: ['auto', 140],
        autogenerate_stylesheet: true,
        min_cols: 1,
        max_cols: 4,
        max_rows: maxRows,
        widget_margins: [5, 5],
        avoid_overlapped_widgets: true,
        resize: {
            enabled: true
        }
    }).data('gridster');
    $('.gridster  ul').css({'padding': '0'});
    adjustGridsterHeight();
}

$(document).ready(() => {
    // Check if the prompt is even needed
    $('#row-input').focus();
    adjustGridsterHeight();
});

$(window).resize(adjustGridsterHeight);

function adjustGridsterHeight() {
    let targetHeight = $('.gridster ul').outerWidth() / aspectRatio;

    $('#gridster-section').css('height', `${targetHeight}px`);
    $('.gridster').css('height', `${targetHeight}px`);
    $('.gridster').children('ul').first().css('height', `${targetHeight}px`);

    let widgetTargetHeight = (targetHeight - (numRows + 1) * 5) / numRows;
}