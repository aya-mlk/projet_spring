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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
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
  ngAfterViewInit(): void {
    Chart.register(...registerables);

    const ctx = (document.getElementById('dashboard') as HTMLCanvasElement).getContext('2d');

    if (ctx) {
      this.bankAccounts$.subscribe(accounts => {
        const accountCounts = this.countAccountTypes(accounts);
        const accountTypes = Object.keys(accountCounts);
        const accountTypeCounts = Object.values(accountCounts);

        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: accountTypes,
            datasets: [{
              label: 'Monthly Sales',
              data: accountTypeCounts,
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
  countAccountTypes(accounts: Account[]): { [key: string]: number } {
    return accounts.reduce((counts, account) => {
      counts[account.type] = (counts[account.type] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
  }
}
