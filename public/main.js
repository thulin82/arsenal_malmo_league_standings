import { ChartData } from "./chartData.js";
const chartData = new ChartData();
const renderBtn = document.getElementById("renderBtn");
const renderBtn2 = document.getElementById("renderBtn2");
const toggleBtn = document.getElementById("toggleBtn");
const toggleBtn2 = document.getElementById("toggleBtn2");
let myChart = null;
function getRandomColor() {
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function BuildChart(values, title, maxvalue) {
    const ctx = document.getElementById("myChart").getContext("2d");
    const chartConfig = {
        type: "line",
        data: values,
        options: {
            scales: {
                y: {
                    min: 1,
                    max: maxvalue,
                    reverse: true,
                },
            },
            parsing: {
                xAxisKey: "$.game",
                yAxisKey: "$.pos",
            },
            clip: {
                left: false,
                top: false,
                right: false,
                bottom: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: title,
                },
                legend: {
                    position: "right",
                },
            },
        },
    };
    // Chart is loaded globally from CDN
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    myChart = new window.Chart(ctx, chartConfig);
    return myChart;
}
renderBtn.addEventListener("click", () => {
    chartData.getArsenal().then((data) => {
        const json = data.json.data.graph.series;
        const labels = json.map((e) => e.$.slabel);
        const dataSet = json.map((e) => e.p);
        const barChartData = {
            datasets: [],
        };
        for (let i = 0; i < dataSet.length; i++) {
            const color = getRandomColor();
            barChartData.datasets.push({
                label: labels[i],
                backgroundColor: color,
                borderColor: color,
                data: dataSet[i],
            });
        }
        BuildChart(barChartData, "Arsenal League Positions", 20);
    });
});
renderBtn2.addEventListener("click", () => {
    chartData.getMalmo().then((data) => {
        const json = data.json.data.graph.series;
        const labels = json.map((e) => e.$.slabel);
        const dataSet = json.map((e) => e.p);
        const barChartData = {
            datasets: [],
        };
        for (let i = 0; i < dataSet.length; i++) {
            const color = getRandomColor();
            barChartData.datasets.push({
                label: labels[i],
                backgroundColor: color,
                borderColor: color,
                data: dataSet[i],
            });
        }
        BuildChart(barChartData, "Malmö FF League Positions", 16);
    });
});
toggleBtn.addEventListener("click", () => {
    if (myChart) {
        myChart.data.datasets.forEach((ds) => {
            ds.hidden = false;
        });
        myChart.update();
    }
});
toggleBtn2.addEventListener("click", () => {
    if (myChart) {
        myChart.data.datasets.forEach((ds) => {
            ds.hidden = true;
        });
        myChart.update();
    }
});
//# sourceMappingURL=main.js.map