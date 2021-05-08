import { HttpClient ,  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuoteInterface } from '../interfaces/quote-interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  optionsHeader : any;

  constructor(private httpclient : HttpClient) { 
    let headers = new HttpHeaders()
      .set("x-rapidapi-key" , "a3a8517f02mshbb8db9496c9d13cp10ea15jsn538029b989e2")
      .set("x-rapidapi-host", "quotes15.p.rapidapi.com");
    this.optionsHeader = {"headers" : headers};
  }


  getQuote(){
    return this.httpclient.get<any>("https://quotes15.p.rapidapi.com/quotes/random/" ,this.optionsHeader);
  }

}
