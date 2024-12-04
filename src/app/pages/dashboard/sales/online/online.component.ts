import { Component } from '@angular/core';
import { DashboardSubtitleComponent } from '../../../../components/dashboard/shared-components/dashboard-subtitle/dashboard-subtitle.component';

@Component({
  selector: 'app-online',
  standalone: true,
  imports: [DashboardSubtitleComponent],
  templateUrl: './online.component.html',
  styleUrl: './online.component.css'
})
export class OnlineComponent {

}
