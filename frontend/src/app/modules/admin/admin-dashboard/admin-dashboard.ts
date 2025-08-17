import { Component } from '@angular/core';
import { AdminNav } from './admin-nav/admin-nav';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { AdminSalesStats } from './admin-sales-stats/admin-sales-stats';
import { AdminOrderManagement } from './admin-order-management/admin-order-management';
import { AdminUserReviews } from './admin-user-reviews/admin-user-reviews';
import { AddForm } from './add-form/add-form'; // Assuming you have an AddForm component
import { UpdateForm } from './update-form/update-form'
import { ReplyBox } from './reply-box/reply-box';
import { InventoryService } from '../../../core/services/inventory-service';
import { UserMessagesService } from '../../../core/services/user-messages-service';
import { type PRO } from '../admin-dashboard/admin-type.model'
import { type UPRO } from '../admin-dashboard/admin-type.model'
import { HomeHeader } from '../../../shared/components/home-header/home-header';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminSidebar, AdminSalesStats, AdminOrderManagement, AdminUserReviews, AddForm, UpdateForm, AdminNav, ReplyBox],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  title = "Ecom website"

  isVisible = false;
  isUpdateVisible = false
  isReplyBoxVisible = false
  msg = ''
  reply =""
  id!:string;

  constructor(private inventoryService: InventoryService , private userMessagesService:UserMessagesService) { }

  setVisibility(visible: boolean) {
    this.isVisible = visible;
  }
  setIsUpdateVisible(visible: boolean) {
    this.isUpdateVisible = visible;
  }

  AddToInventory(product: any) {
    this.inventoryService.addItems(product)
  }
  UpdateToInventory(product: UPRO) {
  
      this.inventoryService.updateItem(product);
    
  }

  setReplyHeade(header:any){
    this.id = header.id;
    this.isReplyBoxVisible = header.isVisibleBox;
  }

  closeReplyBox(isReplyBoxVisible:boolean){
    this.isReplyBoxVisible = isReplyBoxVisible
  }

  setReply( reply:string ){
      this.userMessagesService.setReply(this.id ,reply)
      
  }
}

