import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryComponent } from '../components/category/category.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogService } from './dialog.service';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.baseUrl + '/category';

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryComponent, {
      width: '600px',
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  getCategories(): Observable<Category[]> {
    const token = localStorage.getItem('jwt');
    return this.http.get<Category[]>(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCategory(id: number) {
    const token = localStorage.getItem('jwt');
    return this.http.delete(this.url + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  newCategory(name: string) {
    const token = localStorage.getItem('jwt');
    const params = new HttpParams().append('name', name);
    return this.http.request('POST', this.url, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
