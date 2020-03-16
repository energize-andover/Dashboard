let gridster, gridster_list = $(".gridster ul"), widgetBaseDimension;
const navbarHeight = 64, maxRows = 4, maxCols = 4, widgetMargins = [15, 15];

// Calculate the widgetBaseDimension
let availableVerticalSpace = $(window).height() - navbarHeight - $('footer').height() - 2 * 16 - maxRows * widgetMargins[0];

let borderWidth = $('.gridster-border').css('border-width');
availableVerticalSpace -= parseFloat(borderWidth.substring(0, borderWidth.length - 2)) * 2; // Remove the size of the border of the grid

let widgetHeight = Math.floor(availableVerticalSpace / maxRows);
widgetBaseDimension = [widgetHeight, widgetHeight]; // 1 x 1 widgets should be squares

waitForFontAwesome(initGridster);

function initGridster() {
    // Generate default 2 x 2 layout
    for (let col = 1; col <= 3; col += 2)
        for (let row = 1; row <= 2; row++)
            gridster_list.append(`<li class="box" data-row="${row}" data-col="${col}" data-sizex="2" data-sizey="2"></li>`);

    gridster = gridster_list.gridster({
        widget_base_dimensions: widgetBaseDimension,
        widget_margins: widgetMargins,
        min_cols: 1,
        min_rows: 1,
        max_cols: maxCols,
        helper: 'clone',
        shift_widgets_up: false,
        resize: {
            enabled: false,
        }
    }).data('gridster').disable();

    configureGridster();

    if (window.localStorage.getItem("EA_Dashboard_Layout") !== null) {
        $.ajax({
            url: '/api/decrypt',
            data: JSON.stringify({data: window.localStorage.getItem("EA_Dashboard_Layout")}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            success: (response) => {
                let serialization = JSON.parse(response['payload']), numCells = Object.keys(serialization).length;

                // sort serialization
                serialization = Gridster.sort_by_row_and_col_asc(serialization);

                gridster.remove_all_widgets();

                $.each(serialization, function () {
                    gridster.add_widget('<li class="box" ></li>', this.size_x, this.size_y, this.col, this.row).promise().done(configureGridster());
                });

                let overlayClearInterval = setInterval(() => {
                    if ($('li.gs-w').length === numCells) {
                        hideOverlay();
                        clearInterval(overlayClearInterval);
                    }
                }, 100);
            },
            error: () => {
                hideOverlay();
            }
        })
    } else
        hideOverlay();
}

function configureGridster() {
    let border = $('.gridster-border');
    border.css('width', `${widgetBaseDimension[1] * maxRows + (maxRows + 1) * widgetMargins[0]}px`);

    // Stopping the grid from expanding past the 4x4 dimensions or collapsing when items are removed
    let borderMaxHeight = border.first().outerHeight();
    border.css('height', `${borderMaxHeight}px`);
}

