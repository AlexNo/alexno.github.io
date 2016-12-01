import {Component, OnInit, OnChanges, Input, Output, SimpleChange, EventEmitter} from '@angular/core';
import Page from "../../../models/paging/Page";

@Component({
    selector: 'weather-pagination',
    styleUrls: ['app/components/pagination/pagination.styl'],
    templateUrl: 'app/components/pagination/pagination.html'
})
export class PaginationComponent implements OnInit, OnChanges {

    @Input('total') total: number;
    @Input('current') current: number;
    @Output('onPage') onPage = new EventEmitter<number>();

    private numbers: Array<number> = [];

    constructor() {
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    ngOnInit() {
        console.log('PaginationComponent initialized!');

    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) {
            if (propName === 'total') {
                let changedProp: SimpleChange = changes[propName];
                let to: Page = changedProp.currentValue;
                if (to) {
                    this.numbers = Array(this.total)
                        .fill(1).map((x, i) => i + 1);
                }
            }
        }
    }

    toPage(page: number) {
        this.onPage.emit(page);
    }

    next() {
        if (this.current < this.total) {
            this.onPage.emit(this.current + 1);
        }
    }

    prev() {
        if (this.current > 1) {
            this.onPage.emit(this.current - 1);
        }
    }
}