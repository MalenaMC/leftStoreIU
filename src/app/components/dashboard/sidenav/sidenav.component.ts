import { Component } from '@angular/core';
import { SidenavService } from '../dashboard.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  list = [
    {
      ruta: 'home',
      name: 'Inicio',
      icon: 'icon-inicio'
    },
    {
      ruta: 'internments',
      name: 'Internamiento',
      icon: 'icon-internamiento'
    },
    {
      ruta: 'customers',
      name: 'Clientes',
      icon: 'icon-cliente'
    },
    {
      ruta: 'pets',
      name: 'Mascotas',
      icon: 'icon-mascota'
    },
    
    {
      ruta: 'diary',
      name: 'Agenda',
      icon: 'icon-agenda'
    },
    {
      ruta: 'reports',
      name: 'Reportes',
      icon: 'icon-reporte'
    }
  ]

  constructor(public sidenavService: SidenavService) {}

  closeSidenav(): void {
    this.sidenavService.setCollapsed(false);
    this.sidenavService.onToggleSideNav.emit({collapsed : this.sidenavService.collapsed, screenWidth: this.sidenavService.screenWidth});
  }
}
