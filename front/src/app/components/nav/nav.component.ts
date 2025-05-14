import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private router: Router, private authService: AuthService) {}

  backToHomePage() {
    this.router.navigateByUrl('/');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
