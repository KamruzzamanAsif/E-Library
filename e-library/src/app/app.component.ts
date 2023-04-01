import { Component } from '@angular/core';
import { Router,NavigationEnd, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-library';
  constructor(private router:Router){}
  ngOnInit():void{
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        const navbar=window.document.getElementById("header");
        if(navbar){
          navbar.style.background="none"
        }
      }
      if(event instanceof NavigationEnd){
        const currentRoute=this.router.url;
        const navbar=window.document.getElementById("header");
        if(currentRoute==="/book-details"||currentRoute==="/all-books-record"||currentRoute==="/all-book-settings"||currentRoute==="/users-record"||currentRoute==="/users-settings"){
          if(navbar){
            // navbar.classList.remove("header-transparent")
            navbar.style.backgroundColor="red"
            console.log(navbar.style.backgroundColor)
          }
        }
        else{
          
        }
      }
    })
  }
}
