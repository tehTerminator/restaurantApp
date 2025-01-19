export const navItems: Array<MenuItems> = [
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
  {
    title: 'Invoice',
    links: [{ text: 'View', routerLink: ['invoice', 'view'] }],
  },
  {
    title: 'Reports',
    links: [
      { text: 'Day Report', routerLink: ['report', 'day-view'] },
      { text: 'Monthly View', routerLink: ['report', 'monthly-view'] },
    ],
  },
];

interface MenuItems {
  title: string;
  links: Array<{ text: string; routerLink: Array<string> }>;
  role?: string;
}
