import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'




// Public Layout and Pages
import PublicLayout from '../layouts/PublicLayout.vue'
import Home from '../pages/public/Home.vue'
import About from '../pages/public/About.vue'
import Services from '../pages/public/Services.vue'
import Portfolio from '../pages/public/Portfolio.vue'
import Contact from '../pages/public/Contact.vue'

// Admin Layout and Pages
import AdminLayout from '../layouts/AdminLayout.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import HomeContent from '../pages/admin/HomeContent.vue'
import AboutContent from '../pages/admin/AboutContent.vue'
import ServiceContent from '../pages/admin/ServiceContent.vue'
// import Content from '../pages/admin/Content.vue'
import PortfolioManagement from '../pages/admin/PortfolioManagement.vue'
import ContactManagement from '../pages/admin/ContactContent.vue'
import ContentManagement from '../pages/admin/ContentManagement.vue'
// import Portofolio from '../pages/admin/Portofolio.vue'
import Users from '../pages/admin/Users.vue'
import Settings from '../pages/admin/Settings.vue'

// Auth Pages
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import ForgotPassword from '../pages/auth/ForgotPassword.vue'
import ResetPassword from '../pages/auth/ResetPassword.vue'

const routes = [
  // Public Routes
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/services',
        name: 'Services',
        component: Services
      },
      {
        path: '/portfolio',
        name: 'Portfolio',
        component: Portfolio
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      }
    ]
  },
  
  // Auth Routes
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/auth/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  
  // Admin Routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true},
    // meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: Dashboard
      },
      {
        path: 'home-content',
        name: 'HomeContent',
        component: HomeContent
      },
      {
        path: 'about-content',
        name: 'AboutContent',
        component: AboutContent
      },
      {
        path: 'services-content',
        name: 'ServiceContent',
        component: ServiceContent
      },
      {
        path: 'portfolio',
        name: 'PortfolioManagement',
        component: PortfolioManagement
      },
      {
        path: 'contact-content',
        name: 'ContactContent',
        component: ContactManagement
      },
      // {
      //   path: 'contact',
      //   name: 'Contact',
      //   component: ContactManagement
      // },
      {
        path: 'content',
        name: 'ContentManagement',
        component: ContentManagement 
      },
      // {
      //   path: 'content',
      //   name: 'AdminContent',
      //   component: Content
      // },
      // {
      //   path: 'portofolio',
      //   name: 'AdminPortofolio',
      //   component: Portofolio
      // },
      {
        path: 'users',
        name: 'AdminUsers',
        component: Users
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: Settings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})


export default router