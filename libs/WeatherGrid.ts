import City from "../models/City";
import Page from "../models/paging/Page";


class WeatherGrid {

    private paging: Page = new Page();

    constructor(cities: Array<City>) {
        this.paging.list = cities;
        this.paging.totalPages = Math.ceil(cities.length / this.paging.pageSize);
        this.initListeners();
        this.render();
    }

    private render() {
        let table = document.getElementById('weather-body');
        let start = (this.paging.currentPage - 1) * this.paging.pageSize;
        let finish = this.paging.currentPage * this.paging.pageSize;
        let cities = this.paging.list;
        let rows = cities.slice(start, finish).reduce((rows, row) => {
            let next = `<tr>
            <th data-field="id">${row.name}</th>
            <th data-field="name">${row.main.temp}</th>
            <th data-field="price">${row.wind.speed}</th>
        </tr>`;
            return `${rows}${next}`
        }, '');

        table.innerHTML = rows;
    }

    private initListeners() {
        let prev = document.getElementById('prev');
        let next = document.getElementById('next');
        let paging: Page = this.paging;

        next.addEventListener('click', () => {
            if (paging.currentPage < paging.totalPages) {
                paging.currentPage += 1;
                this.render();
            }
        });

        prev.addEventListener('click', () => {
            if (paging.currentPage > 1) {
                paging.currentPage -= 1;
                this.render();
            }
        });
    }
}

export default WeatherGrid;