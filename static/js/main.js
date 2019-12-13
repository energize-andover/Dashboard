function waitForFontAwesome(afterFunction) {
    $(document).ready(() => {
        // Wait for FontAwesome to load
        let faInterval = setInterval(() => {
            let icons = document.getElementsByClassName('fa');
            let ready = true;
            for (let index = 0; index < icons.length; index++) {
                let icon = icons[index];
                if (window.getComputedStyle(icon, null).getPropertyValue('font-family') !== 'FontAwesome') {
                    ready = false;
                }
            }

            if (ready) {
                console.log("Icons Loaded!");
                afterFunction();
                clearInterval(faInterval);
            }
        }, 100);
    });
}