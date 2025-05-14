import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';
import { MatSelectModule } from '@angular/material/select';
import { DialogRef } from '@angular/cdk/dialog';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product: Product = {
    id_product: 0,
    name: '',
    available: 0,
    price: 0.01,
    category: 0,
    description: '',
  };

  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) data: DialogData
  ) {
    this.categoryService
      .getCategories()
      .subscribe((r) => (this.categories = r));
    if (data.id != 0)
      this.productService
        .getProduct(data.id)
        .subscribe((e: any) => (this.product = e));
  }

  newProduct(product: Product) {
    this.productService.newProduct(product).subscribe(() => location.reload());
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(() => location.reload());
  }
}
