import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletSetupComponent } from './wallet-setup/wallet-setup.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'wallet', pathMatch:'full'},
  {path: 'wallet', component: WalletSetupComponent},
  {path:'transactions', component:WalletTransactionsComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: 'wallet' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
