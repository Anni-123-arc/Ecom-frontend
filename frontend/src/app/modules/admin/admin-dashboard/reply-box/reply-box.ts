import { Component,output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserMessagesService } from '../../../../core/services/user-messages-service';

@Component({
  selector: 'app-reply-box',
  imports: [FormsModule],
  templateUrl: './reply-box.html',
  styleUrl: './reply-box.css'
})
export class ReplyBox {
    reply:string = " "

    replyS = output<string>()
    isClose = output<boolean>()
    constructor(private userMessagesService:UserMessagesService){}
    
    onSubmit(){
        this.replyS.emit(this.reply)
        this.reply = " "
    }

    onClose(){
         this.isClose.emit(false)
    }


}
