import { Component , OnInit, output } from '@angular/core';
import { ReviewCard } from './review-card/review-card';
import { UserMessagesService } from '../../../../core/services/user-messages-service';

@Component({
  selector: 'app-admin-user-reviews',
  standalone: true,
  imports: [ReviewCard],
  templateUrl: './admin-user-reviews.html',
  styleUrl: './admin-user-reviews.css'
})
export class AdminUserReviews implements OnInit {
  messages: any[] = [];
  hideHeading = false;
  private lastScrollTop = 0;

  replyH = output<{id:string , isVisibleBox:boolean}>()

  constructor(private userMessagesService: UserMessagesService) {
    this.messages = this.userMessagesService.getCustomerMessages();
  }

  ngOnInit(): void {
      this.messages = this.userMessagesService.getCustomerMessages();
  }

  onScroll(event: Event) {
    const container = event.target as HTMLElement;
    const scrollTop = container.scrollTop;

    this.hideHeading = scrollTop > this.lastScrollTop;
    // this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  setHeader(header:any){
       const replyObj = {id:header.id , isVisibleBox:header.isVisibleBox}
       this.replyH.emit(replyObj)
  }
}

