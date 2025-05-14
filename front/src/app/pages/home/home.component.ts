import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  HostListener,
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
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  data: Product[] = [];
  categories: Category[] = [];
  valueFilter: any;
  sort: string = 'name,asc'; // default sort
  lastSort: string = 'name,asc';
  categoryFilter: any;

  // Infinite scroll state
  page = 0;
  size = 12;
  loading = false;
  lastPage = false;

  sortOptions = [
    { label: 'Name', value: 'name,asc' },
    { label: 'Category', value: 'category,asc' },
    { label: 'Price', value: 'price,asc' },
    { label: 'Available', value: 'available,desc' },
  ];

  constructor(
    private dialogService: DialogService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.resetAndLoadProducts();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !this.loading &&
      !this.lastPage
    ) {
      this.loadMoreProducts();
    }
  }

  private getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((result) => (this.categories = result));
  }

  private resetAndLoadProducts() {
    this.data = [];
    this.page = 0;
    this.lastPage = false;
    this.loadMoreProducts();
  }

  private loadMoreProducts() {
    this.loading = true;
    this.productService
      .getProducts(this.page, this.size, this.valueFilter, this.sort)
      .subscribe((result) => {
        this.data = [...this.data, ...result.content];
        this.lastPage = result.last;
        this.loading = false;
        this.page++;
      });
  }

  productDialog(p?: Product) {
    this.productService.openProductDialog(p);
  }

  getCategoryName(id: number) {
    let label = '';
    label =
      this.categories.filter((e) => e.id_category === id).at(0)?.name || '';
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
            .deleteProduct(element.id_product)
            .subscribe(() => location.reload());
      });
  }

  applyFilter() {
    this.categoryFilter = '';
    this.resetAndLoadProducts();
  }

  filterByCategory() {
    this.data = [];
    this.page = 0;
    this.lastPage = false;
    this.loading = true;
    this.productService
      .getProductsByCategory(this.page, this.size, this.categoryFilter, this.valueFilter, this.sort)
      .subscribe((result) => {
        this.data = [...this.data, ...result.content];
        this.lastPage = result.last;
        this.loading = false;
        this.page++;
      });
  }

  clearFilter() {
    this.valueFilter = '';
    this.categoryFilter = '';
    this.resetAndLoadProducts();
    this.sort = 'name,asc';
  }

  sortProducts(sortValue: string) {
    this.sort = sortValue;
    this.resetAndLoadProducts();
  }
}
