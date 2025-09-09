import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu/menu.service';
import { MenuItem } from './menu/menu.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  collapsed = true;
  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'fa-solid fa-house', routerLink: '/inicio' },
    {
      label: 'Producción',
      icon: 'fa-solid fa-fish',
      children: [],
      expanded: false
    },
    {
      label: 'Catálogo',
      icon: 'fa-solid fa-box-open',
      children: [],
      expanded: false
    },
    {
      label: 'Persona',
      icon: 'fa-solid fa-user',
      children: [],
      expanded: false
    },
    {
      label: 'Usuario',
      icon: 'fa-solid fa-users-cog',
      children: [],
      expanded: false
    }
  ];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.obtenerMenu('usuario').subscribe({
      next: (items) => {
        console.log("Menú: ", items);
        items.forEach(child => {
          const parent = this.menuItems.find(p => p.label === child.parent);
          if (parent) {
            parent.children?.push({
              label: child.label,
              routerLink: child.routerLink
            });
          }
        });
        this.menuItems = this.menuItems.filter(item => !item.children || item.children.length > 0);
      },
      error: (error) => console.log('Error cargando el menú', error)
    });
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;

    if (this.collapsed) {
    this.menuItems.forEach(item => {
      item.expanded = false;
      if (item.children) {
        item.children.forEach(child => (child.expanded = false));
      }
    });
  }
  }

  toggleSubmenu(item: MenuItem): void {
    if (this.collapsed) {
      this.collapsed = false;
    }

    item.expanded = !item.expanded;

    if (!item.expanded && item.children) {
      item.children.forEach(child => (child.expanded = false));
    }
  }
}
