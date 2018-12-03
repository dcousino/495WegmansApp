import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories';
import { Category } from '../models/category';
import { ProductPage } from '../models/product-page/product-page';
import { Store } from '@ngrx/store';
import { ApplicatonState } from '../store';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  currentPage: string;
  currentPageNumber: number;

  pages: ProductPage[];
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private store: Store<ApplicatonState>
  ) {
    this.store.select('products').subscribe(page => {
      this.currentPage = page.pages.length.toString();
      this.currentPageNumber = page.currentPage;
      this.pages = page.pages;
    });
  }

  getMainCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      'https://fs4rs4fpcj.execute-api.us-east-1.amazonaws.com/latest/product-categories',
      {
        headers: new HttpHeaders({
          Authorization: this.auth.getToken()
        })
      }
    );
  }

  getFirstProductPage(categoryId: string): Observable<ProductPage> {
    return this.httpClient.get<ProductPage>(
      `https://fs4rs4fpcj.execute-api.us-east-1.amazonaws.com/latest/walmart/v1/paginated/items?count=25&category=${categoryId}`,
      {
        headers: new HttpHeaders({
          Authorization: this.auth.getToken()
        })
      }
    );
  }

  getNextProductPage(pathParams: string): Observable<ProductPage> {
    if (this.pages.length > this.currentPageNumber + 1) {
      return of(this.pages[this.currentPageNumber + 1]);
    }
    return this.httpClient
      .get<ProductPage>(
        `https://fs4rs4fpcj.execute-api.us-east-1.amazonaws.com/latest/walmart/${pathParams}`,
        {
          headers: new HttpHeaders({
            Authorization: this.auth.getToken()
          })
        }
      )
      .pipe(
        map(res => {
          res.pageNumber = this.currentPage;
          return res;
        })
      );
  }
}
