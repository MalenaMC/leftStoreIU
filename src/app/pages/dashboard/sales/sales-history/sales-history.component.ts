import { Component } from '@angular/core';
import { DashboardSubtitleComponent } from '../../../../components/dashboard/shared-components/dashboard-subtitle/dashboard-subtitle.component';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [DashboardSubtitleComponent],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent {

}
