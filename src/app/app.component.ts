import { Component} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {  AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>(); 
  isLoggedIn: boolean = false; 
  isMobile: boolean = true; 
  title = 'Portal';
  private loginChangeSub!: Subscription | null;
  constructor( private authenticationService: AuthenticationService, private router: Router){}

  ngOnInit() {   
    if (this.authenticationService.currentUserValue) {
      this.isLoggedIn = true;
    }    
  }

  ngOnDestroy() {
    if (this.loginChangeSub) {
      this.loginChangeSub.unsubscribe();
      this.loginChangeSub = null;
    }
  }
  onLogout(){
    this.authenticationService.logout(); 
    this.isLoggedIn = false;        
    this.router.navigate(['./home']);          
  }
}
