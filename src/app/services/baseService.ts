import { Injectable } from "@angular/core";


@Injectable()
export class BaseService {
    apiBaseURL: string = "https://localhost:5001/";
    constructor(){}
}