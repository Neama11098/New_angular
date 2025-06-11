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

    if (!user) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (user.role === requiredRole) {
      return true;
    }

    // If user has a different role, redirect to their dashboard
    this.router.navigate([`/${user.role}`]);
    return false;
  }
} 