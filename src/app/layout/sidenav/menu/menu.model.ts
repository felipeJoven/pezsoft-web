export interface MenuItem {  
  parent?: string;
  label?: string;
  icon?: string;
  routerLink?: string;      
  children?: MenuItem[];   
  expanded?: boolean;
//   rol?: ('Administrador' | 'Usuario')[];
}
