import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
    selector: 'app-admin-template',
    standalone: true,
    templateUrl: './admin-template.component.html',
    styleUrl: './admin-template.component.css',
  imports: [NavbarComponent, RouterOutlet, DashboardComponent]
})
export class AdminTemplateComponent {

}
