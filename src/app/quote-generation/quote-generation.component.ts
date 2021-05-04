import { Component, OnInit } from '@angular/core';
import { DatatransferService } from '../datatransfer.service';

@Component({
  selector: 'app-quote-generation',
  templateUrl: './quote-generation.component.html',
  styleUrls: ['./quote-generation.component.css']
})
export class QuoteGenerationComponent implements OnInit {

  constructor(private datatransfer : DatatransferService) { }

  ngOnInit(): void {
    this.getNewQuote();
  }

  author: any = "";
  quote: any = "";

  authorQueue : string[] = [];
  quoteQueue : string[] = [];

  firstQuoteLoaded : boolean = false;
  fetching : boolean = false;
  getNewQuote() {
    if (this.authorQueue.length >20 ) return;
    if(this.fetching)return;

    //console.log("Sending Request");
    this.fetching = true;
    this.datatransfer.getQuote().subscribe(
      resolve =>{
        this.quoteQueue.push(resolve.content);
        this.authorQueue.push(resolve.originator.name);
        
        if(!this.firstQuoteLoaded){
          this.newQuote();
          this.firstQuoteLoaded = true;
        }
  
        this.fetching = false;
        //The server only accepts one request per second
        setTimeout(() => {  this.getNewQuote(); }, 1500);
      },
      error => {
        setTimeout(()=>{this.getNewQuote();} , 1200);
      }
    )
  }

  newQuote(){
    this.datatransfer.getHello().subscribe((data)=>{console.log(data);})
    if(this.authorQueue.length == 0) return;

    this.author = this.authorQueue[0];
    this.quote = this.quoteQueue[0];
    this.authorQueue.shift();
    this.quoteQueue.shift();
    this.getNewQuote();
  }
}
