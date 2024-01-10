import {CommonModule, DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {async, catchError, map, Observable, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {Account} from "../model/customer-accounts";
@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    DecimalPipe,
    NgClass,
    CommonModule,
  ],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css'
})
export class BankAccountComponent implements OnInit {
  bankAccounts$!: Observable<Account[]>;
  customer$!: Observable<Customer>;
  customerId!:string;
  customer!: Customer;
  errorMessage!: Object;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.bankAccounts$ = this.customerService.getAllBankAccounts().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }));
  }

  handleCustomerPageFromBankAccounts(customer: Customer) {
    this.router.navigateByUrl("/customers/" + customer.id, {state: customer}).then(r => {
    })
  }

}

