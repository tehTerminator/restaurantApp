export const navItems: Array<MenuItems> = [
  {
    title: 'Orders',
    links: [
      { text: 'Create', routerLink: ['orders', 'create'] },
      { text: 'View', routerLink: ['orders', 'view'] },
    ],
  },
  {
    title: 'Products',
    links: [
      { text: 'Create', routerLink: ['products', 'create'] },
      { text: 'View', routerLink: ['products', 'view'] },
    ],
  },
  {
    title: 'Location',
    links: [
      { text: 'Create', routerLink: ['locations', 'create'] },
      { text: 'View', routerLink: ['locations', 'view'] },
    ],
  },
];

interface MenuItems {
  title: string;
  links: Array<{ text: string; routerLink: Array<string> }>;
  role?: string;
}
