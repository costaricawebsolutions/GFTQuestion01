import { Component } from '@angular/core';

@Component({
    selector: 'pm-app',
    template: `

        <div class='container'>
            <router-outlet></router-outlet>
        </div>    
     `
})
export class AppComponent {
    pageTitle: string = 'Geovanny Quesada Cash Register Products';
    
}
