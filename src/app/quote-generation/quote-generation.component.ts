import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OriginatorInterface, QuoteInterface } from '../interfaces/quote-interface';
import { QuoteService } from '../services/quote.service';


@Component({
  selector: 'app-quote-generation',
  templateUrl: './quote-generation.component.html',
  styleUrls: ['./quote-generation.component.css']
})
export class QuoteGenerationComponent implements OnInit {

  constructor(private quoteGen : QuoteService , private firestore : AngularFirestore) { }

  quote : string;
  author : string;

  mode : string;
  modeBool : boolean;

  ngOnInit(): void {
    this.mode = "Mining";
    this.modeBool = true; 

    this.quoteClock();
  }

  //Requests new Quotes from api at a given interval (API allows max of 1 Quote per second)
  quoteClock(){
    //Making request frequency slightly higher than Limit to avoid getting Requests blocked
    if(this.modeBool){
      this.newQuote();
    }
    setTimeout( () => { this.quoteClock();} , 2500);
  }

  quoteCount : number = 0;
  duplicateCount : number = 0;
  newQuote(){
    this.quoteGen.getQuote().subscribe( all_data =>{
      let quote = this.getQuoteObj(all_data);
      this.quote = quote.content;
      this.author = quote.originator.name;
      this.addQuote(quote);
    });
    
  }

  addQuote(quote : QuoteInterface){
    this.firestore.collection("Quotes").doc(quote.id.toString()).get().subscribe(res => {
      let data = res.data();
      
      if(data === undefined){
        this.quoteCount = this.quoteCount + 1;
        console.log("Quotes added in this session : " + this.quoteCount);
        this.addNewQuote(quote);
      }else{
        this.duplicateCount = this.duplicateCount + 1;
        console.log("Doc Exists!");
      }
    });
  }

  addNewQuote(quote : QuoteInterface){
    this.firestore.collection("Quotes").doc(quote.id.toString()).set(quote);
  }

  // Saving only attributes that i decide to be nescessary
  getQuoteObj(jsonQuote){
    let quote : QuoteInterface;
    let originator_var : OriginatorInterface;
    originator_var = {
      id : jsonQuote["originator"]["id"],
      name : jsonQuote["originator"]["name"]
    }

    quote = {
      content : jsonQuote["content"],
      id : jsonQuote["id"],
      tags : jsonQuote["tags"],
      originator : originator_var
    };
    return quote;
  }


  setToMining(){
    this.mode = "Mining";
    this.modeBool = true;
  }

  setToFirebase(){
    this.mode = "Firebase";

  }

  getRealtimeQuote(){
    console.log("Not Implemented Yet");
    // I need to figure out how to get a random quote from firebase without wasting data or Reading too much

  }


}
