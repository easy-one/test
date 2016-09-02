function CSChart (container) {
    var that = this,
        gData,
        updateThrottle,
        chart,
        options = {};


    this.create = function (table) {
        if (!window.google || !google.charts.Bar || !google.visualization) {
            setTimeout(function () {
                that.create(table);
            }, 200);
        }
        else {
            google.charts.setOnLoadCallback(function () {
                var data = [],
                    row = [];

                row.push((PERIOD === 0) ? 'Destination' : 'Time');

                for (var i in COLUMNS) {
                    if (csBase.visibleCols[i]) {
                        row[REARRANGE[i]] = COLUMNS[i];
                    }
                }
                data.push(row);
                data = data.concat(table);

                gData = google.visualization.arrayToDataTable(data);

                if (!chart) {
                    chart = new google.charts.LineChart(container);
                }

                chart.draw(gData, options);
            });
        }
    };


    this.resize = function () {
        clearTimeout(updateThrottle);

        updateThrottle = setTimeout(function () {
            if (chart) {
                chart.draw(gData, options);
            }
        }, 100);
    }
}