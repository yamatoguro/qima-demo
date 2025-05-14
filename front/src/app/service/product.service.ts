import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from './../model/product';
import { ProductComponent } from '../components/product/product.component';
import { map } from 'rxjs/operators';

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
    const token = localStorage.getItem('jwt');
    return this.http.get(this.url + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Busca produtos paginados, com filtro e ordenação.
   * @param page número da página
   * @param size tamanho da página
   * @param valueFilter filtro de texto
   * @param sort campo de ordenação (ex: 'name,asc' ou 'price,desc')
   */
  getProducts(page: number, size: number, valueFilter?: string, sort: string = 'name,asc') {
    const token = localStorage.getItem('jwt');
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    let endpoint = this.url;

    if (valueFilter && valueFilter.trim() !== '') {
      params = params.set('term', valueFilter);
      endpoint = this.url + '/search';
    }

    return this.http.get<any>(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Busca produtos paginados por categoria, com filtro e ordenação.
   * @param page número da página
   * @param size tamanho da página
   * @param categoryId id da categoria
   * @param valueFilter filtro de texto
   * @param sort campo de ordenação (ex: 'name,asc' ou 'price,desc')
   */
  getProductsByCategory(page: number, size: number, categoryId: number, valueFilter?: string, sort: string = 'name,asc') {
    const token = localStorage.getItem('jwt');
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    let endpoint = this.url + '/category/' + categoryId;

    if (valueFilter && valueFilter.trim() !== '') {
      params = params.set('term', valueFilter);
    }

    return this.http.get<any>(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteProduct(id: number) {
    const token = localStorage.getItem('jwt');
    return this.http.delete(this.url + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  newProduct(p: Product) {
    const token = localStorage.getItem('jwt');
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
    const token = localStorage.getItem('jwt');
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
