import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-subtitle',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-subtitle.component.html',
  styleUrl: './dashboard-subtitle.component.css'
})
export class DashboardSubtitleComponent {
  @Input({required : true}) icon_title!: string;
  @Input({required : true}) title!: string;

}
