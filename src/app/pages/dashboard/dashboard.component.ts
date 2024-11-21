import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/dashboard/header/header.component';
import { FooterComponent } from '../../components/dashboard/footer/footer.component';
import { SidenavComponent } from "../../components/dashboard/sidenav/sidenav.component";
import { BodyComponent } from "../../components/dashboard/body/body.component";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidenavComponent, BodyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;

  @Input() collapsed = false;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
