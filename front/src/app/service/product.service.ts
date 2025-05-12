import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from './../model/product';
import { ProductComponent } from '../components/product/product.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.baseUrl + '/product';

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  openProductDialog(p?: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '600px',
      data: {
        id: p?.idProduct
      }
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  getProduct(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().append('X-API-KEY', environment.apikey);
    return this.http.get<Product[]>(this.url);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  newProduct(p: Product) {
    if (this.isEmpty(p.description)) p.description = '';
    const params = new HttpParams()
      .append('name', p.name)
      .append('price', p.price)
      .append('available', p.available)
      .append('description', p.description!)
      .append('category', p.category + '');
    return this.http.post(this.url, null, { params: params });
  }

  updateProduct(p: Product) {
    if (this.isEmpty(p.description)) p.description = '';
    const params = new HttpParams()
      .append('name', p.name)
      .append('price', p.price)
      .append('available', p.available)
      .append('description', p.description!)
      .append('category', p.category + '');
    return this.http.put(this.url + '/' + p.idProduct, null, {
      params: params,
    });
  }

  isEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str === '';
  }
}
