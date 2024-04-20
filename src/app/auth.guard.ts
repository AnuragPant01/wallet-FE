import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    if (!localStorage.getItem('wallet_id')) {
      this.toastr.error('Please Add Wallet');
      this.router.navigate(['/wallet']);
      return false;
    }
    return true;
  }
}
