if (window.location.href.endsWith('/configure')) {
    function adjustButtons() {
        let buttons = $('.colored-button');
        buttons.css('width', 'unset'); // Allows the buttons to reset to their natural width before adjusting them

        // Set all buttons to the largest width
        let maxWidth = buttons.first().outerWidth() > buttons.last().outerWidth() ? buttons.first().outerWidth() : buttons.last().outerWidth();

        buttons.css('width', `${maxWidth}px`);
    }

    waitForFontAwesome(() => {
        $('#config-menu').css({
            'top': '50%',
            'transform': 'translateY(-50%)'
        });
        setTimeout(adjustButtons, 250); // Adjust halfway through the transition so users don't see the change
    });

    window.addEventListener("resize", adjustButtons); // Readjust on window resize
}
