import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

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
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  registerForm: FormGroup;
  isRegistering = false;
  loginError = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    // private dialogRef: MatDialogRef<RegisterDialogComponent>,
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      roles: [[], Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.isRegistering = false;
      });
    }
  }

  onLogin(): void {
    this.loginError = '';
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loginError = 'Usuário ou senha inválidos';
      }
    });
  }

  login() {
    this.isRegistering = false;
  }
  signup() {
    this.isRegistering = true;
  }
}
