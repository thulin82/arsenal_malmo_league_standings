import { ChartData, type GraphData, type SeriesItem } from "./chartData.js";
import type { Chart as ChartJS } from "chart.js";

const chartData = new ChartData();

const renderBtn = document.getElementById("renderBtn") as HTMLButtonElement;
const renderBtn2 = document.getElementById("renderBtn2") as HTMLButtonElement;
const toggleBtn = document.getElementById("toggleBtn") as HTMLButtonElement;
const toggleBtn2 = document.getElementById("toggleBtn2") as HTMLButtonElement;

let myChart: ChartJS | null = null;

function getRandomColor(): string {
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

interface Dataset {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: unknown[];
}

interface BarChartData {
    datasets: Dataset[];
}

function BuildChart(
    values: BarChartData,
    title: string,
    maxvalue: number
): unknown {
    const ctx = (
        document.getElementById("myChart") as HTMLCanvasElement
    ).getContext("2d") as CanvasRenderingContext2D;

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
    myChart = new (window as any).Chart(
        ctx,
        chartConfig
    ) as ChartJS;
    return myChart;
}

renderBtn.addEventListener("click", () => {
    chartData.getArsenal().then((data: GraphData) => {
        const json = data.json.data.graph.series;
        const labels = json.map((e: SeriesItem) => e.$.slabel);
        const dataSet = json.map((e: SeriesItem) => e.p);

        const barChartData: BarChartData = {
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
    chartData.getMalmo().then((data: GraphData) => {
        const json = data.json.data.graph.series;
        const labels = json.map((e: SeriesItem) => e.$.slabel);
        const dataSet = json.map((e: SeriesItem) => e.p);

        const barChartData: BarChartData = {
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
