import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public CONFIRM_DIALOG = 'CONFIRM';
  public INPUT_DIALOG = 'INPUT';
  public ALERT_DIALOG = 'ALERT';
  public SIMPLE_DIALOG = 'SIMPLE';
  constructor(public dialog: MatDialog) {}

  openConfirmDialog(
    title: any,
    content: any,
    buttonClose: any,
    buttonSave: any,
    data: any,
    method: Function
  ) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: title,
        text: content,
        close: buttonClose,
        save: buttonSave,
        data: '',
        dialogType: this.CONFIRM_DIALOG,
        confirm: data,
      },
    });
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe((result) => {
      data = result.confirm;
      method(data);
    });
    return dialogRef;
  }

  openInputDialog(
    title: any,
    content: any,
    buttonClose: any,
    buttonSave: any,
    data: any,
    method: Function
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: title,
        text: content,
        close: buttonClose,
        save: buttonSave,
        data: data,
        dialogType: this.INPUT_DIALOG,
      },
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      data = result.data;
      if (result.confirm) {
        method(result.data);
      }
    });
  }

  openAlertDialog(
    title: any,
    content: any,
    buttonSave: any,
    method: Function
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: title,
        text: content,
        close: '',
        save: buttonSave,
        data: '',
        dialogType: this.ALERT_DIALOG,
      },
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openSimpleDialog(title: any, content: any, method: Function): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: title,
        text: content,
        close: '',
        save: '',
        data: '',
        dialogType: this.SIMPLE_DIALOG,
      },
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      method();
    });
  }
}
