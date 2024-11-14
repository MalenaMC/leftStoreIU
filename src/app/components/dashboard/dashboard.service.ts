import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  collapsed = false;
  screenWidth = 0;
  
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  constructor() {}

  setCollapsed(collapsed: boolean): void {
    this.collapsed = collapsed;
  }
}