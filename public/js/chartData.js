// eslint-disable-next-line no-unused-vars
class ChartData {
    constructor() {}

    async getArsenal() {
        // Start backend before this step is executed
        const response = await fetch(`http://localhost:4567/arsenal`);
        const json = await response.json();
        return { json };
    }

    async getMalmo() {
        // Start backend before this step is executed
        const response = await fetch(`http://localhost:4567/malmo`);
        const json = await response.json();
        return { json };
    }
}
