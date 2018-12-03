import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/customers/login/login.component';
import { RegisterComponent } from './components/customers/register/register.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { CheckoutComponent } from './components/orders/checkout/checkout.component';
import { CartComponent } from './components/orders/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmComponent } from './components/customers/confirm/confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './components/customers/home/home.component';
import { SubCategoriesComponent } from './components/products/sub-categories/sub-categories.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { ProductPageNavComponent } from './components/products/product-page/product-page-nav/product-page-nav.component';
import { SpinnerComponent } from './components/layout/spinner/spinner.component';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'user', 'categories', 'cart'],
    rehydrate: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CheckoutComponent,
    CartComponent,
    ConfirmComponent,
    HomeComponent,
    SubCategoriesComponent,
    ProductPageComponent,
    ProductPageNavComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),

    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
