export class ChartData {
    constructor() { }
    async getArsenal() {
        const response = await fetch("http://localhost:4567/arsenal");
        const json = (await response.json());
        return { json };
    }
    async getMalmo() {
        const response = await fetch("http://localhost:4567/malmo");
        const json = (await response.json());
        return { json };
    }
}
//# sourceMappingURL=chartData.js.map