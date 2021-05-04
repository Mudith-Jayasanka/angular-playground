import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  constructor(private http : HttpClient) { }

  BASE_URL : string = "https://ang-playground-backend.herokuapp.com/";

  getQuote(){
    let headers = new HttpHeaders().set("x-rapidapi-key" , "a3a8517f02mshbb8db9496c9d13cp10ea15jsn538029b989e2" ) ;
    return this.http.get<any>("https://quotes15.p.rapidapi.com/quotes/random/" , {headers})
  }

  getHello(){
    return this.http.get<string>(this.BASE_URL);
  }

  sendMessage(message : string , username : string){
    let data = message + "," + username;
    console.log("SENDING: " + data)
    return this.http.post<any>(this.BASE_URL + "sendMsg" , data);
  }

  getMessages(){
    return this.http.get<any>(this.BASE_URL + "getMessages");
  }

  deleteMessages(){
    return this.http.get<any>(this.BASE_URL + "deleteMsgs");
  }

}
