import { Component } from '@angular/core';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { Carousal } from '../../shared/components/carousal/carousal';
import { FeatureProductList } from '../../shared/components/feature-product-list/feature-product-list';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [NavBar, Carousal, FeatureProductList, Footer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
