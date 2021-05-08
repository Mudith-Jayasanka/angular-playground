import { Component, OnInit } from '@angular/core';

import { Message_interface } from "../interfaces/message_interface"; 
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor( private firestore : AngularFirestore) { }

  
  ngOnInit(): void {
    this.firestore.collection("messages" , ref => ref.orderBy("time") ).snapshotChanges()
    .subscribe(data =>{
      this.messageHistory = [];
      data.forEach(a=>{
        let msg : any;
        msg = a.payload.doc.data();
        this.messageHistory.push(msg);
      });
    });

  }

  message : string;
  username : string = "STATIC";

  messageHistory : any[];

  enterPressed(event){
    if(event.keyCode === 13){
      this.send();
    }
  }

  send(){
    if(this.message.length == 0) return;

    this.firestore.collection("messages").add(this.getJsonMsg());
    this.message = "";
  }

  getJsonMsg(){
    let dateTime : Date = new Date();
    let theTime : string = dateTime.getUTCHours().toString() + ":" + dateTime.getUTCMinutes().toString() + ":" + dateTime.getUTCSeconds().toString();

    let msgObj : Message_interface = {
      message : this.message,
      time : theTime
    }
    return msgObj;
  }

}
