import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from './../model/product';
import { ProductComponent } from '../components/product/product.component';

const token = localStorage.getItem('jwt');

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
        id: p?.id_product,
      },
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
    return this.http.get<Product[]>(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(this.url + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  newProduct(p: Product) {
    if (this.isEmpty(p.description)) p.description = '';
    const params = new HttpParams()
      .append('name', p.name)
      .append('price', p.price)
      .append('available', p.available)
      .append('description', p.description!)
      .append('category', p.category + '');
    return this.http.post(this.url, null, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateProduct(p: Product) {
    if (this.isEmpty(p.description)) p.description = '';
    const params = new HttpParams()
      .append('name', p.name)
      .append('price', p.price)
      .append('available', p.available)
      .append('description', p.description!)
      .append('category', p.category + '');
    return this.http.put(this.url + '/' + p.id_product, null, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  isEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str === '';
  }
}
