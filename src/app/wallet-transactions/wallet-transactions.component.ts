import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { LazyLoadEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.scss']
})
export class WalletTransactionsComponent {

  currentTab: string = 'all';
  tableData:any = [];
  @ViewChild('dt') dt!: any; 
  columns = [];
  wallet_id:any;
  rows:number = 10;
  private offsetRows: any = 0;
  prevLazyLoadEvent!: LazyLoadEvent;
  infotext!: string;
  transaction_type:any = null;
  totalRecords!: number;


  constructor(private router:Router,private commonService:CommonService,private toastr: ToastrService){}

  ngOnInit(){
    this.wallet_id = localStorage.getItem('wallet_id')
  }

  ngAfterViewInit() {
    this.getTransactions();
  }

  getTransactions(){
    this.commonService.showLoader = true
    const body:any = {
      wallet_id :this.wallet_id,
      skip : this.offsetRows,
      limit: this.rows
    }
    if(this.currentTab == 'credit' || this.currentTab == 'debit'){
      body['transaction_type'] = this.currentTab == 'credit' ? 1 : 0
    }
    this.commonService.showLoader = true
    this.commonService.fetchTransactions(body).subscribe((data:any)=>{
      this.commonService.showLoader = false
      if(data && data.data.transactions){
        this.tableData = data.data.transactions;
        if(data.data.total_count){
          this.totalRecords = data.data.total_count
          this.setInfoText(this.totalRecords)
        }
      }else{
        this.tableData = []
        this.totalRecords = 0;
        this.setInfoText(this.totalRecords)
      }
      this.toastr.show(data.message)
    },(err)=>{
      this.commonService.showLoader = false;
      this.toastr.error(err.message)
      console.log(err)
    })
  }

  setInfoText(totalRecords:any) {
    let count = +this.dt.rows + (+this.dt.first) > totalRecords ? totalRecords : +this.dt.rows + (+this.dt.first);
    let first = this.dt.first > totalRecords ? totalRecords : this.dt.first;
    this.infotext = `Showing ${first + 1} - ${count} of ${totalRecords} entries`

  }

  exportTransactions(){
    this.commonService.exportTransactions(this.wallet_id).subscribe((data: any) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove()
    },
    error => {
      this.toastr.error(error.message)
      console.log(error)
    })
  }

  OnSelectWalletOpts(tab: string){
    this.currentTab = tab;
    this.dt.reset();
    this.tableData = [];
    this.getTransactions()
  }

  goToWallet(){
    this.router.navigateByUrl('/wallet')
  }

}
