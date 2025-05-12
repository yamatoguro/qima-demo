import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Handle successful login (e.g., store token, redirect)
      },
      (error) => {
        // Handle login error
      }
    );
  }
}
