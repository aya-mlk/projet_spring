import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import {Account} from "../model/customer-accounts";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backendHost:string="http://localhost:8085";
  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backendHost+"/customers")
  }
  public searchCustomers(keyword:string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backendHost+"/customers/search?keyword=" + keyword)
  }
  public saveCustomers(customer:Customer): Observable<Customer> {
    return this.http.post<Customer>(this.backendHost+"/customers",customer)
  }
  public deleteCustomer(id:number) {
    return this.http.delete(this.backendHost+"/customers/"+id)
  }

  updateCustomer(customer: Customer): Observable<Array<Customer>> {
    return this.http.put<Array<Customer>>(this.backendHost + "/customer/" + customer.id, customer);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.backendHost + "/customers/" + id);
  }
  public getAllBankAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(this.backendHost + "/accounts");
  }

  public getAccountsByCustomer(customerId: number): Observable<Account[]> {

    return  this.http.get<Account[]>(this.backendHost + "/customers/" + customerId + "/accounts");
  }
}
