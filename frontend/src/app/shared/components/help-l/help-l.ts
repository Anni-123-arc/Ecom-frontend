import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Footer } from '../footer/footer';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-help-l',
  imports: [CommonModule, RouterModule, NavBar, Footer, NavBar],
  templateUrl: './help-l.html',
   styleUrl: './help-l.css'
 })
export class HelpL {
  openCategory: string | null = null;

  toggleCategory(category: string) {
    this.openCategory = this.openCategory === category ? null : category;
  }
}

