import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryService } from '../../service/category.service';
import { DialogService } from '../../service/dialog.service';
import { ProductService } from '../../service/product.service';
import { Category } from '../../model/category';
import { Product } from '../../model/product';

@Component({
  selector: 'app-home',
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @ViewChild('filter') filterInput?: ElementRef;
  data: Product[] = [];
  unfiltered: Product[] = [];
  categories: Category[] = [];
  value: any;
  sort: any = 'name';
  lastSort: any = 'name';

  constructor(
    private dialogService: DialogService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.getCategories();
    this.getProducts();
  }

  ngOnInit(): void {
    this.filterInput!.nativeElement.click(); // intentional error to force show refreshed list of products.
  }

  productDialog(p?: Product) {
    this.productService.openProductDialog(p);
  }

  private getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((result) => (this.categories = result));
  }

  private getProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.unfiltered = result;
      this.unfiltered.sort((e0, e1) => e0.name.localeCompare(e1.name));
      this.data = result;
    });
  }

  getCategoryName(id: number) {
    let label = '';
    label = this.categories.filter((e) => e.idCategory === id).at(0)!.name;
    return label;
  }

  onCategories() {
    this.categoryService.openCategoryDialog();
  }

  deleteProduct(element: Product) {
    let confirm = false;
    this.dialogService
      .openConfirmDialog(
        'Delete Product',
        'Are you sure you want to delete product ' + element.name + '?',
        'Cancel',
        'Confirm',
        confirm,
        (c: boolean) => (confirm = c)
      )
      .afterClosed()
      .subscribe((result) => {
        if (result.confirm)
          this.productService
            .deleteProduct(element.idProduct)
            .subscribe(() => location.reload());
      });
  }

  applyFilter() {
    this.data = this.unfiltered.filter(
      (e) =>
        e.name.includes(this.value) ||
        this.getCategoryName(e.category).includes(this.value) ||
        e.description?.includes(this.value) ||
        (e.price + '').includes(this.value) ||
        (e.price + '').includes(this.value) ||
        (e.available + '').includes(this.value)
    );
  }

  clearFilter() {
    this.value = '';
    this.data = this.unfiltered;
    this.sort = 'name';
  }

  sortProducts(method: string) {
    switch (this.sort) {
      case 'name':
        if (this.sort == this.lastSort) {
          this.data = this.unfiltered.sort((e0, e1) =>
            e1.name.localeCompare(e0.name)
          );
          this.lastSort = "reset";
        } else {
          this.data = this.unfiltered.sort((e0, e1) =>
            e0.name.localeCompare(e1.name)
          );
          this.lastSort = this.sort;
        }
        break;
      case 'category':
        if (this.sort == this.lastSort) {
          this.data = this.unfiltered.sort((e0, e1) =>
            this.getCategoryName(e1.category).localeCompare(
              this.getCategoryName(e0.category)
            )
          );
          this.lastSort = "reset";
        } else {
          this.data = this.unfiltered.sort((e0, e1) =>
            this.getCategoryName(e0.category).localeCompare(
              this.getCategoryName(e1.category)
            )
          );
          this.lastSort = this.sort;
        }
        break;
      case 'price':
        if (this.sort == this.lastSort) {
          this.data = this.unfiltered.sort((e0, e1) =>
            e1.price.toPrecision(21).localeCompare(e0.price.toPrecision(21))
          );
          this.lastSort = "reset";
        } else {
          this.data = this.unfiltered.sort((e0, e1) =>
            e0.price.toPrecision(21).localeCompare(e1.price.toPrecision(21))
          );
          this.lastSort = this.sort;
        }
        break;
      case 'available':
        if (this.sort == this.lastSort) {
          this.data = this.unfiltered.sort(
            (e0, e1) => e1.available - e0.available
          );
          this.lastSort = "reset";
        } else {
          this.data = this.unfiltered.sort(
            (e0, e1) => e0.available - e1.available
          );
          this.lastSort = this.sort;
        }
        break;

      default:
        break;
    }
  }
}
