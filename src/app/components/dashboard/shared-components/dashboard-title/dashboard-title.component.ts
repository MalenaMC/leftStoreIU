import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-title',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-title.component.html',
  styleUrl: './dashboard-title.component.css'
})
export class DashboardTitleComponent {
  @Input({required : true}) icon_title!: string;
  @Input({required : true}) title!: string;
}
