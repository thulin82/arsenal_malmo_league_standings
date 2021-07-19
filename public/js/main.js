/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-undef
const chartData = new ChartData();

const renderBtn = document.getElementById('renderBtn');
const renderBtn2 = document.getElementById('renderBtn2');
const toggleBtn = document.getElementById('toggleBtn');
const toggleBtn2 = document.getElementById('toggleBtn2');

var myChart = '';

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function BuildChart(values, title, maxvalue) {
    var ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: values,
        options: {
            scales: {
                y: {
                    min: 1,
                    max: maxvalue,
                    reverse: true
                }
            },
            parsing: {
                xAxisKey: '$.game',
                yAxisKey: '$.pos'
            },
            clip: {
                left: false,
                top: false,
                right: false,
                bottom: false
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    position: 'right'
                }
            }
        }
    });
    return myChart;
}

renderBtn.addEventListener('click', () => {
    var labels = '';
    var dataSet = '';
    chartData.getArsenal().then((data) => {
        const json = data.json.data.graph.series;
        labels = json.map(function (e) {
            return e.$.slabel;
        });

        dataSet = json.map(function (e) {
            return e.p;
        });
        labels.pop();  //to be removed when new season starts
        dataSet.pop(); //to be removed when new season starts

        var barChartData = {
            datasets: []
        };

        for (var i = 0; i < dataSet.length; i++) {
            var color = getRandomColor();
            barChartData.datasets.push(
                {
                    label: labels[i],
                    backgroundColor: color,
                    borderColor: color,
                    data: dataSet[i]
                }
            );
        }
        BuildChart(barChartData, "Arsenal League Positions", 20);
    });
});

renderBtn2.addEventListener('click', () => {
    var labels = '';
    var dataSet = '';
    chartData.getMalmo().then((data) => {
        const json = data.json.data.graph.series;
        labels = json.map(function (e) {
            return e.$.slabel;
        });

        dataSet = json.map(function (e) {
            return e.p;
        });

        var barChartData = {
            datasets: []
        };

        for (var i = 0; i < dataSet.length; i++) {
            var color = getRandomColor();
            barChartData.datasets.push(
                {
                    label: labels[i],
                    backgroundColor: color,
                    borderColor: color,
                    data: dataSet[i]
                }
            );
        }
        BuildChart(barChartData, "Malmö FF League Positions", 16);
    });
});

toggleBtn.addEventListener('click', () => {
    myChart.data.datasets.forEach(function(ds) {
        ds.hidden = false;
    });
    myChart.update();
});

toggleBtn2.addEventListener('click', () => {
    myChart.data.datasets.forEach(function(ds) {
        ds.hidden = true;
    });
    myChart.update();
});
