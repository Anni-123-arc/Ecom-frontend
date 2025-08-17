import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserMessagesService } from '../../core/services/user-messages-service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faPaperPlane, faSearch, faUserCog, faTruck, 
  faChartLine, faHistory, faLaptop, faMobile, 
  faTablet, faCheckCircle, faExclamationCircle  , faMessage
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { OrderManagement } from '../../core/services/order-management';
import { Router } from '@angular/router';
//importing messaging service
import { MessagingService } from '../../core/services/messaging-service';


@Component({
  selector: 'app-help-c',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './help-c.html',
  styleUrls: ['./help-c.css']
})
export class HelpC {
  flag = 0;
  orderId = '';
  email = '';
  response: {success: boolean, message: string, details?: string} | null = null;
  orderHistory:any[] = [];
  query:string = ''

  // Icons
  faPaperPlane = faPaperPlane;
  faSearch = faSearch;
  faUserCog = faUserCog;
  faTruck = faTruck;
  faChartLine = faChartLine;
  faHistory = faHistory;
  faLaptop = faLaptop;
  faMobile = faMobile;
  faTablet = faTablet;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  faMessage = faMessage;
  status: string | null = null;
  faHeadset: IconProp | undefined;

  constructor(
    private userMessagesService: UserMessagesService,
    private orderManagement: OrderManagement,
    private router: Router , 
    private messagingService: MessagingService
  ) {}

  setFlag(value: number) {
    this.flag = value;
    this.response = null; // Clear previous responses when changing option
  }

onTrack() {
  if (!this.orderId) {
    this.response = {
      success: false,
      message: 'Please enter an order ID'
    };
    return;
  }

  this.orderManagement.getOrderDetails(this.orderId)
    .then((result) => {
      this.status = result.data[0]?.status || null;

      if (this.status !== null) {
        this.response = {
          success: true,
          message: `Order #${this.orderId}`,
          details: `Status: ${this.status}`
        };
      } else {
        this.response = {
          success: false,
          message: `Order not found`,
          details: 'Please check your order ID and try again'
        };
      }
    })
    .catch((err) => {
      console.error(err);
      this.response = {
        success: false,
        message: 'Error retrieving order details',
        details: err.message || err.toString()
      };
    });
}

  async onGetHistory() {
    if (!this.email) {
      this.response = {
        success: false,
        message: 'Please enter a valid email address'
      };
      return;
    }

    // Simulate API call
    await this.orderManagement.getOrderHistory(this.email).then((result) => {
      this.orderHistory = result.data;
      console.log('Order history:', this.orderHistory);
    }).catch((err) => {
      console.error(err);
      this.response = {
        success: false,
        message: 'Error retrieving order history',
        details: err.message || err.toString()
      };
    });
  }

  navigateToAccount() {
    this.router.navigate(['/profile']);
  }

  onPostQuery(){
    this.messagingService.pushConvo(this.query);
    this.query = ''; // Clear the input after sending 
  }
}