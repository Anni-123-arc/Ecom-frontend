import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
//import { HttpClientModule } from '@angular/common/http';
//import { Routes } from '@angular/router';

// Import components
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { ProductDetailComponent } from './modules/products/product-detail/product-detail.component';
import { AdminDashboard } from './modules/admin/admin-dashboard/admin-dashboard';
import { CartPageComponent } from './modules/cart/pages/cart-page/cart-page.component';
import { WishlistPageComponent } from './modules/cart/pages/wishlist-page/wishlist-page.component';
import { OrderSummary } from './modules/orders/order-summary/order-summary';
import { CheckoutPageComponent } from './modules/cart/pages/checkout-page/checkout-page.component';
import { OrderDetails } from './modules/orders/order-details/order-details';
import { Login } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register';
import { Bio } from './shared/components/bio/bio';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password';
import { LandingPage } from './modules/landing-page/landing-page';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password';
import { HomeHeader } from './shared/components/home-header/home-header';
import { ScrollableMenuBar } from './shared/components/scrollable-menu-bar/scrollable-menu-bar';
import { SideBar } from './shared/components/side-bar/side-bar';
import { Home } from './modules/home/home';
import { HelplineComponent } from './shared/components/helpline/helpline';
import { ProfileComponent } from './modules/profile/profile';
import { AccountInfoComponent } from './shared/components/account-info/account-info';
import { Address } from './shared/components/address/address';
import { HelpC } from './modules/help-c/help-c';
import { ReturnOrderComponent } from './modules/orders/return-order/return-order';
import { CancelOrderComponent } from './modules/orders/cancel-order/cancel-order';
import { TrackOrder } from './modules/orders/track-order/track-order';
import { HelpL } from './shared/components/help-l/help-l';
// Import AuthGuard
import { AuthGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'admin', component: AdminDashboard },
  { path: 'cart', component: CartPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Protected routes with AuthGuard
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'address', component: Address, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'account-info', component: AccountInfoComponent, canActivate: [AuthGuard] },

  { path: 'bio', component: Bio },
  { path: 'orders', component: OrderSummary },
  { path: 'orders/:id', component: OrderDetails },
  { path: 'home-header', component: HomeHeader },
  { path: 'scrollable-menu-bar', component: ScrollableMenuBar },
  { path: 'side-bar', component: SideBar },
  { path: 'home', component: Home },
  { path: 'helpline', component: HelplineComponent },
  { path: 'help', component: HelpC },
  {path: 'orders/:id/cancel',component:CancelOrderComponent},
  {path:'orders/:id/return',component:ReturnOrderComponent},
  {path:'orders/:id/track-order', component:TrackOrder},
  {path: 'help-l', component: HelpL},

  // Wildcard route for 404 or redirect to home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
