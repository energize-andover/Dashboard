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

class WidgetLayout {
    constructor(colData) {
        if (colData === undefined)
            this.colData = [2, 2]; // Default to 2x2
        else
            this.colData = colData;
    }

    adjustLayout(colData) {
        this.colData = colData;
    }

    getNumRows() {
        return this.colData.length;
    }

    getNumCols(row) {
        if (row >= 0 && row < this.getNumRows())
            return this.colData[row];
    }

    toString() {
        return JSON.stringify(this.colData);
    }

    static fromString(str) {
        return new WidgetLayout(JSON.parse(str));
    }
}