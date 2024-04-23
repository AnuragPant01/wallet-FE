import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isWalletSetup:boolean = false;
  showLoader!: boolean;
  base_url:string = 'https://wallet-be-production-6afe.up.railway.app'

  constructor(private http:HttpClient) { }

  public getWallet(wallet_id:any){
    return this.http.get(`${this.base_url}/wallet/${wallet_id}`)
  }

  public setupWallet(body:any){
    body.balance = body.balance ? body.balance : 0
    return this.http.post(`${this.base_url}/setup`, body)
  }

  public addTransactions(wallet_id:any,body:any){
    return this.http.post(`${this.base_url}/transact/${wallet_id}`, body)
  }

  public fetchTransactions(body:any){
    if(body.transaction_type >=0){
      return this.http.get(`${this.base_url}/transactions?walletId=${body.wallet_id}&skip=${body.skip}&limit=${body.limit}&transaction_type=${body.transaction_type}`)
    }else{
      return this.http.get(`${this.base_url}/transactions?walletId=${body.wallet_id}&skip=${body.skip}&limit=${body.limit}`)
    }
  }

  public exportTransactions(wallet_id:any){
    return this.http.get(`${this.base_url}/export_transactions/${wallet_id}`,{ responseType: 'blob'})
  }
}
