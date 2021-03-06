import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/customers/login/login.component';
import { ConfirmComponent } from './components/customers/confirm/confirm.component';
import { RegisterComponent } from './components/customers/register/register.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './components/orders/cart/cart.component';
import { HomeComponent } from './components/customers/home/home.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { SubCategoriesComponent } from './components/products/sub-categories/sub-categories.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { ProfileComponent } from './components/customers/profile/profile.component';
import { CheckoutComponent } from './components/orders/checkout/checkout.component';
const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'sub-categories/:id',
    component: SubCategoriesComponent
  },
  {
    path: 'product-page/:id',
    component: ProductPageComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
