import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import Swal from 'sweetalert2';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit{
  updateCustomerFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private serviceCustomer: CustomerService, private router: ActivatedRoute,
              private routerNav: Router) {
  }

  ngOnInit(): void {
    this.updateCustomerFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.email]],
      id: [null],
    });
    this.getCustomer();
  }

  updateCustomer() {
    let customer: Customer = this.updateCustomerFormGroup.value;
    customer.id = this.router.snapshot.params['id'];
    this.serviceCustomer.updateCustomer(customer).subscribe(
      {
        next: data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "The customer has been successfully updated !",
            showConfirmButton: false,
            timer: 1500
          });
          this.goBack();
        },
        error: err => {
          // Gérer les erreurs ici
        }
      }
    );
  }

  private getCustomer() {
    this.serviceCustomer.getCustomerById(this.router.snapshot.params['id']).subscribe(
      {
        next: data => {
          let customer: Customer = data;
          this.updateCustomerFormGroup.patchValue({
            email: customer.email,
            name: customer.name,
            id: customer.id,
          });
        },
        error: err => {
          // Gérer les erreurs ici
        }
      }
    );
  }

  goBack() {
    this.routerNav.navigate(['/admin/customers']);

  }
}
