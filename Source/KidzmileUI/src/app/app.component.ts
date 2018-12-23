import { Component } from '@angular/core';
import { Router,Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KidzmileUI';
  showLoadingIndicator=true;
  constructor(private _router:Router) {

    this._router.events.subscribe((routerevent: Event)=>{
        if(routerevent instanceof NavigationStart){
          this.showLoadingIndicator=true;
        }

        if(routerevent instanceof NavigationEnd){
          this.showLoadingIndicator=false;
        }

        if(routerevent instanceof NavigationError){
          this.showLoadingIndicator=false;
        }
    });

  }
}
