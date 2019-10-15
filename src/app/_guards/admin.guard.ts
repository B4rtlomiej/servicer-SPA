import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from '../_services/toastr.service';
import { AdminModeService } from '../_services/admin-mode.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  subscription: Subscription;
  browserRefresh = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,
    private adminMode: AdminModeService) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
  }

  canActivate(): boolean {
    if (!this.authService.loggedIn() || !this.authService.isAdmin()) {
      this.toastr.error('Brak dostępu.<br/>Zaloguj się jako administrator,<br/>aby uzyskać dostęp.');
      this.router.navigate(['/']);
      return false;
    }

    this.adminMode.isAdminMode = true;
    return true;
  }
}
