let layout, gridster, gridster_list = $(".gridster ul");
const maxRows = 4, maxCols = 4, widgetBaseDimension = [100, 100];

waitForFontAwesome(() => {
    initGridster();
});

function initGridster() {
    // Generate default 2 x 2 layout
    let currentID = 0; // Used to keep track of the current ID of the cell. IDs start from 0 and increment row-wise

    for (let row = 1; row <= 2; row++)
        for (let col = 1; col <= 3; col += 2) {
            gridster_list.append(`<li id="cell-id-${currentID}" data-row="${row}" data-col="${col}" data-sizex="2" data-sizey="2"></li>`);
            currentID++;
        }

    gridster = gridster_list.gridster({
        widget_base_dimensions: widgetBaseDimension,
        widget_margins: [5, 5],
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

                $.each(serialization, function (index) {
                    gridster.add_widget(`<li id="cell-${index}"></li>`, this.size_x, this.size_y, this.col, this.row).promise().done(configureGridster());
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
    border.css('width', `${widgetBaseDimension[1] * maxRows + (maxRows + 1) * 5}px`);

    // Stopping the grid from expanding past the 4x4 dimensions or collapsing when items are removed
    let borderMaxHeight = border.first().outerHeight();
    border.css('height', `${borderMaxHeight}px`);
}

