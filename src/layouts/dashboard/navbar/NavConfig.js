// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      { title: 'Home', path: '/dashboard/home', icon: 'file-icons:dashboard' },
      { title: 'Financial', path: '/dashboard/financial', icon: 'icon-park-outline:financing-one' },
      { title: 'Logout', path: '/logout', icon: 'ri:logout-circle-line' },

    ],
    
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Management',
    items: [
      // Master Panel
      {
        title: 'Master Panel',
        path: PATH_DASHBOARD.master.root,
        icon: 'bi:card-checklist',
        children: [
          { title: 'Block', path: PATH_DASHBOARD.master.block},
          { title: 'Access Configuration', path: PATH_DASHBOARD.master.access},
          { title: 'Quotes', path: PATH_DASHBOARD.user.new },
          
        ],
      },
      // Master Panel
      {
        title: 'Registeration',
        path: PATH_DASHBOARD.registeration.root,
        icon: 'bi:shield-lock-fill',
        children: [
          { title: 'Environment', path: PATH_DASHBOARD.registeration.environment },
          { title: 'Condominium', path: PATH_DASHBOARD.registeration.condominium },
          { title: 'User', path: PATH_DASHBOARD.registeration.user },
        ],
      },
      // Report
      {
        title: 'Report',
        path: PATH_DASHBOARD.user.root,
        icon: 'codicon:report',
        children: [
          { title: 'Hits', path: PATH_DASHBOARD.user.profile },
          { title: 'Bike', path: PATH_DASHBOARD.user.cards },
          { title: 'Gym Recipes', path: PATH_DASHBOARD.user.list },
          { title: 'Logs', path: PATH_DASHBOARD.user.new },
          { title: 'General', path: PATH_DASHBOARD.user.new },
          { title: 'Reservations', path: PATH_DASHBOARD.user.new },
          { title: 'Vehicle', path: PATH_DASHBOARD.user.new },
        ],
      },
      // Control
      {
        title: 'Controls',
        path: PATH_DASHBOARD.control.root,
        icon: 'ep:setting',
        children: [
          { title: 'Visitor Authorization', path: PATH_DASHBOARD.control.visitor },
          { title: 'Gym access', path: PATH_DASHBOARD.control.gym },
          { title: 'Lost and Found', path: PATH_DASHBOARD.control.lostFound },
          { title: 'Warehouse', path: PATH_DASHBOARD.control.warehouse },
          { title: 'Virtual Assembly', path: PATH_DASHBOARD.control.virtual },
          { title: 'Medical Certificate', path: PATH_DASHBOARD.control.certificate },
          { title: 'Home portal notice', path: PATH_DASHBOARD.control.notice },
          { title: 'Condo classifieds', path: PATH_DASHBOARD.control.condo },
          { title: 'Residents classifieds', path: PATH_DASHBOARD.control.classified },
          { title: 'Water consumption', path: PATH_DASHBOARD.control.water },
          { title: 'Correspondence', path: PATH_DASHBOARD.control.correspond },
          { title: 'Documents and ATAs', path: PATH_DASHBOARD.control.document },
          { title: 'Polls and Surveys', path: PATH_DASHBOARD.control.polls },
          { title: 'Pet Space', path: PATH_DASHBOARD.control.space },
          { title: 'Token', path: PATH_DASHBOARD.control.token },
          { title: 'Mail Queue', path: PATH_DASHBOARD.control.mail },
          { title: 'Condominium Information', path: PATH_DASHBOARD.control.information },
          { title: 'Guest list', path: PATH_DASHBOARD.control.guest },
          { title: 'Pouch', path: PATH_DASHBOARD.control.pouch },
          { title: 'Maintenance', path: PATH_DASHBOARD.control.maintenance },
          { title: 'Resident Message', path: PATH_DASHBOARD.control.resident },
          { title: 'Change', path: PATH_DASHBOARD.control.change },
          { title: 'Property and equipment', path: PATH_DASHBOARD.control.property },
          { title: 'Bracelets', path: PATH_DASHBOARD.control.bracelets },
          { title: 'Occurrence Record', path: PATH_DASHBOARD.control.record },
          { title: 'Reservation of environments', path: PATH_DASHBOARD.control.reservation },
          { title: 'Vehicle', path: PATH_DASHBOARD.control.vehicle },
          { title: 'Other Services', path: PATH_DASHBOARD.control.services },
        ],
      },

       // Portal website
       {
        title: 'Portalwebsite',
        path: PATH_DASHBOARD.user.root,
        icon: 'ic:twotone-web',
        children: [
          { title: 'Banner', path: PATH_DASHBOARD.user.profile },
          { title: 'Contents', path: PATH_DASHBOARD.user.cards },
          { title: 'Layout', path: PATH_DASHBOARD.user.list },
        ],
      },
     
    ],
  },
 
];

export default navConfig;
