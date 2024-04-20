import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet-setup',
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.scss']
})
export class WalletSetupComponent {

  addTransactionForm!:FormGroup;
  addWalletForm!:FormGroup
  walletPopup:boolean = false;
  transactionPopup:boolean = false;
  currentTab: string = 'wallet';
  walletSubmitted: boolean = false;
  transactionsSubmitted: boolean = false;
  balance:any;
  wallet_id:any;


  constructor(public commonService:CommonService, private fb:FormBuilder,private toastr: ToastrService){}

  ngOnInit(){
    this.initWalletForm()
    this.initTransactionsForm()
    let walletId = localStorage.getItem('wallet_id')
    if(walletId && JSON.parse(walletId)){
      this.commonService.isWalletSetup = true
      this.getWalletData(walletId)
    }
  }

  getWalletData(walletId:any){
    this.commonService.showLoader = true
      this.commonService.getWallet(JSON.parse(walletId)).subscribe((data:any)=>{
        this.commonService.showLoader = false;
        if(data && data.data){
          if(data.data.balance && data.data.id){
            this.balance = data.data.balance;
            this.wallet_id = data.data.id;
          }
          this.toastr.show(data.message)
        }else{
          this.toastr.error(data.message)
        }
      },(err)=>{
        console.log(err)
        this.toastr.error(err.message)
      })
  }

  initWalletForm(){
    this.addWalletForm = this.fb.group({
      'name' : new FormControl('',Validators.required),
      'balance' : new FormControl('')
    })
  }

  initTransactionsForm(){
    this.addTransactionForm = this.fb.group({
      'amount' : new FormControl('', Validators.required),
      'transaction_type' : new FormControl('', Validators.required),
      'description' : new FormControl('')
    })
  }

  selectTab(tab: string){
    this.currentTab = tab;
    if(this.currentTab == 'logs' && !this.commonService.isWalletSetup){
      this.currentTab = 'wallet'
    }
  }

  openModal(id:number){
    if(id==1){
      this.walletPopup = true
    }else{
      this.transactionPopup = true
    }
    id == 1 ? this.walletPopup = true : this.transactionPopup = true
  }

  closePopup(){
    this.walletPopup = false
    this.transactionPopup = false
    this.walletSubmitted = false
    this.transactionsSubmitted = false
  }

  addWallet(){
    this.walletSubmitted = true;
    if(!this.addWalletForm.valid){
      return;
    }
    this.commonService.showLoader = true;
    this.commonService.setupWallet(this.addWalletForm.value).subscribe((data:any)=>{
      this.commonService.showLoader = false;
      if(data && data.data){
        if(data.data.balance && data.data.id){
          this.balance = data.data.balance;
          this.wallet_id = data.data.id;
          localStorage.setItem('wallet_id',this.wallet_id);
          this.commonService.isWalletSetup = true
        }
        this.toastr.show(data.message)
      }else{
        this.toastr.error(data.message)
      }
      this.closePopup();
    },(err)=>{
      console.log(err)
      this.commonService.showLoader = false;
      this.toastr.error(err.message)
    })
  }

  addTransactions(){
    this.transactionsSubmitted = true;
    if(!this.addTransactionForm.valid){
      return;
    }
    this.commonService.showLoader = true
    this.commonService.addTransactions(this.wallet_id,this.addTransactionForm.value).subscribe((data:any)=>{
      this.commonService.showLoader = false
      if(data && data.data){
        this.balance = data.data.balance;
        this.toastr.show(data.message)
      }else{
        this.toastr.error(data.message)
      }
      this.closePopup();
    },(err)=>{
      console.log(err)
      this.toastr.show(err.message)
      this.commonService.showLoader = false;
    })
  }
}
