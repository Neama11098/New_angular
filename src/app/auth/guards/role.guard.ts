import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getCurrentUser();
    const requiredRole = route.data['role'];

    if (user && user.role === requiredRole) {
      return true;
    }

    // Redirect to appropriate dashboard based on user role
    if (user) {
      this.router.navigate([`/${user.role}`]);
    } else {
      this.router.navigate(['/auth/login']);
    }
    return false;
  }
} 