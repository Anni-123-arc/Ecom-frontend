import { Component } from '@angular/core';
import { Carousal } from '../../shared/components/carousal/carousal';
import { HomeHeader } from '../../shared/components/home-header/home-header';
import { Footer } from '../../shared/components/footer/footer';
import { ScrollableMenuBar } from '../../shared/components/scrollable-menu-bar/scrollable-menu-bar';
import { FeatureProductList } from '../../shared/components/feature-product-list/feature-product-list';
import { SideBar } from '../../shared/components/side-bar/side-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Carousal, HomeHeader, Footer, ScrollableMenuBar, FeatureProductList, SideBar, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home{

}
