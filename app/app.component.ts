import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.styl'],
})
export class AppComponent {
    name: string = 'Angular';
}