import { Component, Input, output } from '@angular/core';
import { UserMessagesService } from '../../../../../core/services/user-messages-service';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.html',
  styleUrl: './review-card.css'
})
export class ReviewCard {
    @Input({required: true}) messages!: {
  id: string;
  name: string;
  profileImage: string;
  date: string; // ISO format date, e.g., "2025-07-19"
  message: string;
  reply:string
};

   replyH = output<{id:string , isVisibleBox:boolean}>()

    constructor(){}

    onReply(){
      const Header =  {id:this.messages.id , isVisibleBox:true}
      this.replyH.emit(Header)
       
    }

}
