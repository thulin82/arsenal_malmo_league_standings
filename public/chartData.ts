export interface SeriesItem {
    $: { slabel: string };
    p: unknown[];
}

export interface GraphData {
    json: {
        data: {
            graph: {
                series: SeriesItem[];
            };
        };
    };
}

export class ChartData {
    constructor() {}

    async getArsenal(): Promise<GraphData> {
        const response = await fetch("http://localhost:4567/arsenal");
        const json = (await response.json()) as GraphData["json"];
        return { json };
    }

    async getMalmo(): Promise<GraphData> {
        const response = await fetch("http://localhost:4567/malmo");
        const json = (await response.json()) as GraphData["json"];
        return { json };
    }
}
