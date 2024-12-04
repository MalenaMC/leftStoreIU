import { Component } from '@angular/core';
import { DashboardTitleComponent } from '../../../components/dashboard/shared-components/dashboard-title/dashboard-title.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [RouterOutlet, DashboardTitleComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

}
