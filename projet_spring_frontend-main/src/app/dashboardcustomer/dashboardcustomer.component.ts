import { AfterViewInit, Component } from '@angular/core';
import {Chart,registerables } from "chart.js";
import {Customer} from "../model/customer.model";
import {Account} from "../model/customer-accounts";
import {async, catchError, combineLatest, map, Observable, throwError} from "rxjs";
import {CommonModule, DatePipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [NgIf,DatePipe,DecimalPipe,NgClass,CommonModule,],
  templateUrl: './dashboardcustomer.component.html',
  styleUrl: './dashboardcustomer.component.css'
})
export class DashboardCustomerComponent implements AfterViewInit {
  bankAccounts$!: Observable<Account[]>;
  customer$!: Observable<Customer>;
  customerId!:string;
  customer!: Customer;
  errorMessage!: Object;
  customers$!: Observable<Customer[]>;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }
  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }));
  }
  handleCustomerPageFromBankAccounts(customer: Customer) {
    this.router.navigateByUrl("/customers/" + customer.id, {state: customer}).then(r => {
    })
  }
  ngAfterViewInit(): void {
    Chart.register(...registerables);

    const ctx = (document.getElementById('dashboardcustomer') as HTMLCanvasElement).getContext('2d');

    if (ctx) {
      this.customers$.subscribe(accounts => {
        const CountsCustomers = accounts.length;
        console.log("Id",CountsCustomers);
        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Number of Customers'],
            datasets: [{
              label: 'Number of Customers',
              data: [accounts.length],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                type: 'linear',
                beginAtZero: true,
              },
            },
          },
        });
      });
    } else {
      console.error('Le contexte du canevas est null.');
    }
  }


}
