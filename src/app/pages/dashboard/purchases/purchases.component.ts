import { Component } from '@angular/core';
import { DashboardTitleComponent } from '../../../components/dashboard/shared-components/dashboard-title/dashboard-title.component';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [DashboardTitleComponent],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {

}
