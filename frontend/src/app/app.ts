import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
//import { Carousal } from './shared/components/carousal/carousal';
// import { NavBar } from './shared/components/nav-bar/nav-bar';
// import { FeatureProductList } from './shared/components/feature-product-list/feature-product-list';
// import { Footer } from './shared/components/footer/footer';
// import{HomeHeader} from './shared/components/home-header/home-header';
// import { ScrollableMenuBar } from "./shared/components/scrollable-menu-bar/scrollable-menu-bar";
//import { SideBar } from './shared/components/side-bar/side-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'Ecommerce';
}
