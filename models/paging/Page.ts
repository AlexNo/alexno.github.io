import City from "../City";

class Page {
    currentPage: number = 1;
    pageSize: number = 10;
    totalPages: number;
    list: Array<City>;
}

export default Page;