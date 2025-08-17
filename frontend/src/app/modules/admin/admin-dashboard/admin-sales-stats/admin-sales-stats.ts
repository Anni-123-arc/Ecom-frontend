import { Component } from '@angular/core';
import { AdminSale } from '../../../../core/services/admin-sale';
@Component({
  selector: 'app-admin-sales-stats',
  imports: [],
  templateUrl: './admin-sales-stats.html',
  styleUrl: './admin-sales-stats.css'
})
export class AdminSalesStats {
    ActiveUserCount:number = 0;
    constructor(private adminSales:AdminSale){
      this.ActiveUserCount = this.getActiveUsers();
    }

    getTotalSales(){
      return this.adminSales.getTotalRevenue()
    }

    ngOnInit(){
        setInterval(()=>{
              this.ActiveUserCount+10
            },20000)
    }

    

    getActiveUsers():number{
     return this.adminSales.getActiveUsers()
    }

    getOrderPlace(){
      return this.adminSales.getOrderPlace()
    }

    
}
