export const navItems: Array<MenuItems> = [
  {
    title: 'Products',
    links: [
      { text: 'Create', routerLink: ['products', 'create'] },
      { text: 'View', routerLink: ['products', 'view'] },
    ],
  },
  {
    title: 'Categories',
    links: [
      {
        text: 'Create',
        routerLink: ['products', 'category', 'create'],
      },
      { text: 'View', routerLink: ['products', 'category', 'view'] },
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
    links: [{ text: 'View', routerLink: ['invoice', 'search'] }],
  },
  {
    title: 'Reports',
    links: [
      { text: 'Day Report', routerLink: ['report', 'day-view'] },
      { text: 'Monthly View', routerLink: ['report', 'monthly-view'] },
    ],
  },
  {
    title: 'Users',
    links: [
      {text: 'Create', routerLink: ['users', 'create-user']},
    ],
    role: 'admin'
  }
];

interface MenuItems {
  title: string;
  links: Array<{ text: string; routerLink: Array<string> }>;
  role?: string;
}
