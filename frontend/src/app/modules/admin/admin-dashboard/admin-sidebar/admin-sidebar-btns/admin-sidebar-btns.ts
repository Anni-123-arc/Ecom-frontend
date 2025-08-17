import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar-btns',
  imports: [CommonModule],
  templateUrl: './admin-sidebar-btns.html',
  styleUrl: './admin-sidebar-btns.css'
})
export class AdminSidebarBtns {
      btnText = input('');
      btnStyle = input({backgroundColor: '' , color:''});

}
