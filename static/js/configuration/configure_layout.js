let overlay = $('#overlay'), layout, gridster, gridster_list = $(".gridster ul");
const maxRows = 4, maxCols = 4, widgetBaseDimension = [100, 100];

// waitForFontAwesome(() => {
//     $('#overlay-content').css({
//         'top': '50%',
//         'transform': 'translateY(-50%)'
//     });
// });
//
// if (window.localStorage.getItem('currentLayout') !== null) {
//     layout = WidgetLayout.fromString(window.localStorage.getItem('currentLayout'));
//
//     // Hide the overlay
// }
//
// let button = $('#submit');
//
// button.click(() => {
//     let input = $('#row-input'), chosenNum = input.val(), errorMessage = $('#error-message'), field = $('.field');
//
//     if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 2) {
//         errorMessage.html('Please enter a whole number that is no more than 2!');
//         errorMessage.removeClass('is-hidden');
//         input.removeClass('colored');
//         input.addClass('is-danger');
//         button.removeClass('colored-button');
//         button.addClass('is-danger');
//         if (!field.is(':animated'))
//             field.effect('shake');
//
//         input.focus();
//     } else {
//         let colData = [];
//
//         for (let i = 0; i < chosenNum; i++)
//             colData.push(2);
//
//         layout = new WidgetLayout(colData);
//         window.localStorage.setItem('currentLayout', layout.toString());
//
//         overlay.fadeOut()
//     }
// });P4$$w

$(() => {
    gridster = gridster_list.gridster({
        widget_base_dimensions: widgetBaseDimension,
        widget_margins: [5, 5],
        min_cols: 1,
        min_rows: 1,
        max_cols: maxCols,
        helper: 'clone',
        shift_widgets_up: false,
        resize: {
            enabled: true,
            min_size: [1, 1],
            max_size: [4, maxRows],
            stop: enforceBounds
        },
        draggable: {
            stop: enforceBounds
        }
    }).data('gridster');

    $('.gridster-border').css('width', `${widgetBaseDimension[1] * maxRows + (maxRows + 1) * 5}px`)
});

// Resizes or removes gridster elements as needed so the grid does not exceed maxRows x maxCols
function enforceBounds() {
    gridster_list.children('li').each((index, li) => {
        let item = $(li);

        let row = parseInt(item.attr('data-row')), col = parseInt(item.attr('data-col')),
            width = parseInt(item.attr('data-sizex')), height = parseInt(item.attr('data-sizey'));

        if (row > maxRows || col > maxCols)
            removeGridsterItem(item);
        else if (row + height - 1 > maxRows)
            item.attr('data-sizey', maxRows - row + 1);
        else if (col + width - 1 > maxCols)
            item.attr('data-sizex', maxCols - col + 1);
    });

    // Check for overlaps and delete overlapping cells if needed so that only one remains

    let gridState = []; // A maxRows x maxCols 2D array that contains true for each filled corresponding grid location

    for (let i = 0; i < maxRows; i++) {
        let rowState = [];
        for (let j = 0; j < maxCols; j++)
            rowState[j] = false;
        gridState[i] = rowState;
    }

    gridster_list.children('li').each((index, li) => {
        let item = $(li);

        let row = parseInt(item.attr('data-row')), col = parseInt(item.attr('data-col')),
            width = parseInt(item.attr('data-sizex')), height = parseInt(item.attr('data-sizey'));

        for (let i = row - 1; i < row + height - 1; i++)
            for (let j = col - 1; j < col + width - 1; j++)
                if (!(i < 0 || i > maxRows - 1 || j < 0 || j > maxCols - 1))
                    if (gridState[i][j])
                        item.remove(); // An overlap
                    else
                        gridState[i][j] = true;
    });
}

function removeGridsterItem(item) {
    gridster.remove_widget(item);
}

// Returns true if there is an empty space in the grid, and the row and column of the first empty space if there is one
function canAddItem() {

    let gridState = []; // A maxRows x maxCols 2D array that contains true for each filled corresponding grid location

    for (let i = 0; i < maxRows; i++) {
        let rowState = [];
        for (let j = 0; j < maxCols; j++)
            rowState[j] = false;
        gridState[i] = rowState;
    }


    gridster_list.children('li').each((index, li) => {
        let item = $(li);

        let row = parseInt(item.attr('data-row')), col = parseInt(item.attr('data-col')),
            width = parseInt(item.attr('data-sizex')), height = parseInt(item.attr('data-sizey'));

        for (let i = row - 1; i < row + height - 1; i++)
            for (let j = col - 1; j < col + width - 1; j++)
                gridState[i][j] = true;
    });

    let returnArray = [false, NaN, NaN]; // Format: [true or false, x-coordinate or NaN, y-coordinate or NaN]

    for (let x = 0; x < maxRows; x++)
        for (let y = 0; y < maxCols; y++)
            if (!gridState[x][y]) {
                returnArray[0] = true;
                returnArray[1] = x + 1;
                returnArray[2] = y + 1;
                return returnArray;
            }

    return returnArray; // If no blank spaces are found, return default
}


// Adds a 1x1 gridster square to the first available cell in the grid, if there is one
function addGridsterItem() {
    let additionData = canAddItem();

    if (additionData[0]) {
        // An empty space exists
        let x = additionData[1], y = additionData[2];

        // Validate that x and y are in bounds
        if (x <= maxRows && y <= maxCols) {
            console.log(x, y);
            gridster.add_widget('<li></li>', 1, 1, y, x);
        }
    }
}