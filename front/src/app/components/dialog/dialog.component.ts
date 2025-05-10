import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  title: string;
  text: string;
  close: string;
  save: string;
  data: string;
  dialogType: string;
  confirm: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, MatInputModule, MatDialogModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public CONFIRM_DIALOG = 'CONFIRM';
  public INPUT_DIALOG = 'INPUT';
  public ALERT_DIALOG = 'ALERT';
  public SIMPLE_DIALOG = 'SIMPLE';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.data.confirm = false;
  }

  onNoClick(): void {
    this.data.confirm = false;
  }

  onYesClick(): void {
    this.data.confirm = true;
  }

  ngOnInit() {}
}
