import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBar } from '../side-bar/side-bar';

@Component({
  selector: 'app-scrollable-menu-bar',
  standalone: true,
  imports: [SideBar, CommonModule],
  templateUrl: './scrollable-menu-bar.html',
  styleUrls: ['./scrollable-menu-bar.css']
})
export class ScrollableMenuBar implements AfterViewInit {
  @ViewChild(SideBar) sidebarComponent!: SideBar;
  @ViewChild('messageWrapper', { static: false }) messageWrapperRef!: ElementRef<HTMLElement>;

  toggleSidebar(): void {
    if (this.sidebarComponent) {
      this.sidebarComponent.isSidebarOpen
        ? this.sidebarComponent.closeSidebar()
        : this.sidebarComponent.openSidebar();
    }
  }

  ngAfterViewInit(): void {
    const wrapper = this.messageWrapperRef?.nativeElement;
    if (wrapper) {
      // Restart animation immediately on load
      wrapper.classList.remove('message-wrapper');
      void wrapper.offsetWidth; // triggers reflow
      wrapper.classList.add('message-wrapper');
    }
  }
}
