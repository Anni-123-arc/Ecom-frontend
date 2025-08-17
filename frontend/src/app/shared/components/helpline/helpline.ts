import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';
import { HomeHeader } from '../home-header/home-header';

@Component({
  selector: 'app-helpline',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeHeader, Footer],
  templateUrl: './helpline.html',
  styleUrls: ['./helpline.css']
})
export class HelplineComponent {
  openCategory: string | null = null;

  toggleCategory(category: string) {
    this.openCategory = this.openCategory === category ? null : category;
  }
}
