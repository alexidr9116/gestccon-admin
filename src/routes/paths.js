// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  registeration: {
    root: path(ROOTS_DASHBOARD, '/registeration'),
    environment: path(ROOTS_DASHBOARD, '/registeration/environment'),
    condominium: path(ROOTS_DASHBOARD, '/registeration/condominium'),
    user: path(ROOTS_DASHBOARD, '/registeration/user'),

  },
  master: {
    root: path(ROOTS_DASHBOARD, '/master-panel'),
    block: path(ROOTS_DASHBOARD, '/master-panel/block'),
    access: path(ROOTS_DASHBOARD, '/master-panel/access-configuration'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  control: {
    root: path(ROOTS_DASHBOARD, '/control'),
    visitor: path(ROOTS_DASHBOARD, '/control/visitor-auth'),
    gym: path(ROOTS_DASHBOARD, '/control/gym-access'),
    lostFound: path(ROOTS_DASHBOARD, '/control/lostFound'),
    warehouse: path(ROOTS_DASHBOARD, '/control/warehouse'),
    virtual: path(ROOTS_DASHBOARD, '/control/virtual-assembly'),
    certificate: path(ROOTS_DASHBOARD, '/control/medical-certificate'),
    notice: path(ROOTS_DASHBOARD, '/control/home-portal-notice'),
    condo: path(ROOTS_DASHBOARD, '/control/condo-classifieds'),    
    classified: path(ROOTS_DASHBOARD, '/control/residents-classfieds'),
    water: path(ROOTS_DASHBOARD, '/control/water-consumption'),
    correspond: path(ROOTS_DASHBOARD, '/control/correspondence'),
    document: path(ROOTS_DASHBOARD, '/control/documents-atas'),
    polls: path(ROOTS_DASHBOARD, '/control/polls-surveys'),
    space: path(ROOTS_DASHBOARD, '/control/pet-space'),
    token: path(ROOTS_DASHBOARD, '/control/token'),
    mail: path(ROOTS_DASHBOARD, '/control/mail-queue'),
    information: path(ROOTS_DASHBOARD, '/control/condominium-information'),
    guest: path(ROOTS_DASHBOARD, '/control/guest-list'),
    pouch: path(ROOTS_DASHBOARD, '/control/pouch'),
    maintenance: path(ROOTS_DASHBOARD, '/control/maintenance'),
    resident: path(ROOTS_DASHBOARD, '/control/resident-message'),
    change: path(ROOTS_DASHBOARD, '/control/change'),
    property: path(ROOTS_DASHBOARD, '/control/property-equipment'),
    bracelets: path(ROOTS_DASHBOARD, '/control/bracelets'),
    record: path(ROOTS_DASHBOARD, '/control/occurrence-record'),
    reservation: path(ROOTS_DASHBOARD, '/control/reservation-env'),
    vehicle: path(ROOTS_DASHBOARD, '/control/vehicle'),
    services: path(ROOTS_DASHBOARD, '/control/services'),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
