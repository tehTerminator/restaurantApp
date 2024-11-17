export const navItems = [
  {
    title: 'Orders',
    links: [
      { text: 'Create', routerLink: ['orders', 'create'] },
      { text: 'View', routerLink: ['orders', 'view'] },
    ],
    role: '',
  },
  {
    title: 'Invoices',
    links: [
      { text: 'Create', routerLink: ['invoices', 'create'] },
      { text: 'View', routerLink: ['invoices', 'view'] },
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
