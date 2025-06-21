<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex items-center justify-center h-16 px-4 bg-primary-600">
        <div class="flex items-center space-x-3">
          <BuildingOfficeIcon class="w-8 h-8 text-white" />
          <span class="text-xl font-bold text-white">Admin Panel</span>
        </div>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
            :class="$route.path === item.href ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </router-link>
        </div>
        
        <div class="px-4 mt-8 pt-8 border-t border-gray-200">
          <button
            @click="logout"
            class="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </div>
    
    <!-- Main Content -->
    <div class="lg:ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-4 py-4">
          <div class="flex items-center">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Bars3Icon class="w-6 h-6" />
            </button>
            <h1 class="ml-4 text-2xl font-semibold text-gray-900">
              {{ pageTitle }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              class="btn-secondary"
            >
              <HomeIcon class="w-5 h-5 mr-2" />
              View Site
            </router-link>

            <!-- User menu -->
            <div class="relative" v-click-outside="closeUserMenu">
              <button @click="userMenuOpen = !userMenuOpen" class="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
                <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <span class="text-sm font-medium text-white">
                    {{ authStore.user?.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="hidden md:block text-gray-700">{{ authStore.user?.name }}</span>
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </button>
              
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
    
    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BuildingOfficeIcon,
  Bars3Icon,
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  PhotoIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../store/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const userMenuOpen = ref(false)

// WrenchScrewdriverIcon
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Home Content', href: '/admin/home-content', icon: GlobeAltIcon },
  { name: 'About Content', href: '/admin/about-content', icon: InformationCircleIcon },
  { name: 'Services', href: '/admin/services-content', icon: InformationCircleIcon }, 
  { name: 'Content', href: '/admin/content', icon: PhotoIcon },
  { name: 'Portofolio', href: '/admin/portofolio', icon: PhotoIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon }
]

const pageTitle = computed(() => {
  const currentRoute = navigation.find(item => item.href === route.path)
  return currentRoute?.name || 'Admin'
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

// Custom directive for click outside
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>