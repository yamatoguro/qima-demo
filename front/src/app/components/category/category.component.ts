import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogService } from '../../service/dialog.service';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category';
import { DialogComponent } from '../dialog/dialog.component';

var ELEMENT_DATA: Category[] = [];

@Component({
  selector: 'app-category',
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
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  selectedTab: any = 0;

  displayedColumns: string[] = ['position', 'name', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    private dialogService: DialogService,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((result) => {
      ELEMENT_DATA = result;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  close(): void {}

  newCategory(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'New Category',
        text: 'Create a new category for products',
        close: 'Cancel',
        save: 'Create',
        data: '',
        dialogType: 'INPUT',
      },
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirm) this.categoryService.newCategory(result.data).subscribe(() => this.getCategories());
    });
  }

  deleteCategory(element: Category) {
    let confirm = false;
    this.dialogService
      .openConfirmDialog(
        'Delete Category',
        'Are you sure you want to delete category ' + element.name + '?',
        'Cancel',
        'Confirm',
        confirm,
        (c: boolean) => (confirm = c)
      )
      .afterClosed()
      .subscribe((result) => {
        if (result.confirm)
          this.categoryService.deleteCategory(element.id_category).subscribe(() =>  this.getCategories());
      });
  }

  ngOnInit() {
    this.getCategories();
  }
}
