import { Component } from '@angular/core';
import { DashboardTitleComponent } from '../../../components/dashboard/shared-components/dashboard-title/dashboard-title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardTitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
