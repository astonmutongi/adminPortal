import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { BaseService  } from '../services/baseService';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;
    private loggedIn = new BehaviorSubject<boolean>(false); 
    public loginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    get isLoggedIn() {
        return this.loggedIn.asObservable(); 
    }

    constructor(private http: HttpClient, private baseService: BaseService) {
        var user = localStorage.getItem('currentUser');       
        if (user !=  null) 
        {
            this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(user));
            this.currentUser = this.currentUserSubject.asObservable(); 
        }else{
            this.currentUserSubject = new BehaviorSubject<User | null>(null);
            this.currentUser = this.currentUserSubject.asObservable(); 
        }
        //this.baseService = new BaseService();
        
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username:string, password:string) {
        return this.http.post<any>(`${this.baseService.apiBaseURL}authenticate/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.loggedIn.next(true);
                this.loginChange.emit(true);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');        
        this.currentUserSubject.next(null);
        this.loggedIn.next(false);
        this.loginChange.emit(true);
    }
}