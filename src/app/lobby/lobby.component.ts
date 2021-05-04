import { Component, OnInit } from '@angular/core';
import { DatatransferService } from '../datatransfer.service';

import { Message_interface } from "../interfaces/message_interface"; 
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private dtService : DatatransferService ,  private firestore : AngularFirestore) { }

  ngOnInit(): void {
    console.log("Initial Firebase Link");
    this.firestore.collection("messages").snapshotChanges().subscribe(data =>{
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

  send(){
    if(this.message.length == 0) return;

    this.firestore.collection("messages").add({message:this.message});
    this.message = "";
  }

}
