import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'latest',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      },
      {
        path: '/resources',
        name: 'resources',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Resources.vue')
      },
      {
        path: '/latest',
        name: 'latest',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Latest.vue')
      },
      {
        path: '/selected',
        name: 'selected',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Selected.vue')
      },
      {
        path: '/licenses',
        name: 'licenses',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Licenses.vue')
      },
      {
        path: '/consulting',
        name: 'consulting',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Consulting.vue')
      },
      {
        path: '/thanks',
        name: 'thanks',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Thanks.vue')
      },
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
