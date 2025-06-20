<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900">ContractorPro</span>
          </router-link>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="{ 'text-primary-600': $route.path === item.href }"
            >
              {{ item.name }}
            </router-link>
            
            <!-- Auth Buttons -->
            <!-- <div class="flex items-center space-x-4">
              <template v-if="!authStore.isAuthenticated">
                <router-link to="/auth/login" class="btn-secondary">
                  Login
                </router-link>
                <router-link to="/auth/register" class="btn-primary">
                  Get Started
                </router-link>
              </template>
              <template v-else>
                <router-link
                  v-if="authStore.isAdmin"
                  to="/admin"
                  class="btn-secondary"
                >
                  Admin Panel
                </router-link>
                <button @click="authStore.logout" class="btn-primary">
                  Logout
                </button>
              </template>
            </div> -->
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-700 hover:text-primary-600 p-2"
            >
              <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
          <div class="flex flex-col space-y-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click="mobileMenuOpen = false"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              :class="{ 'text-primary-600': $route.path === item.href }"
            >
              {{ item.name }}
            </router-link>
            
            <!-- <div class="pt-4 border-t">
              <template v-if="!authStore.isAuthenticated">
                <router-link
                  to="/auth/login"
                  @click="mobileMenuOpen = false" 
                  class="block w-full text-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Login
                </router-link>
                <router-link
                  to="/auth/register"
                  @click="mobileMenuOpen = false"
                  class="block w-full text-center py-2 px-4 mt-2 btn-primary"
                >
                  Get Started
                </router-link>
              </template>
              <template v-else>
                <router-link
                  v-if="authStore.isAdmin"
                  to="/admin"
                  @click="mobileMenuOpen = false"
                  class="block w-full text-center py-2 px-4 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Admin Panel
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-center py-2 px-4 mt-2 btn-primary"
                >
                  Logout
                </button>
              </template>
            </div> -->
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto section-padding py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <BuildingOfficeIcon class="w-6 h-6 text-white" />
              </div>
              <span class="text-xl font-bold">ContractorPro</span>
            </div>
            <p class="text-gray-300 mb-4">
              Professional construction services specializing in civil, plumbing, and interior work.
              Building dreams with quality and expertise.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-primary-400 transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.338-1.297C3.595 14.135 3.017 12.283 3.017 10.017c0-2.266.578-4.118 1.094-5.674.89-.807 2.041-1.297 3.338-1.297 1.297 0 2.448.49 3.338 1.297.516 1.556 1.094 3.408 1.094 5.674 0 2.266-.578 4.118-1.094 5.674-.89.807-2.041 1.297-3.338 1.297z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="item in navigation" :key="item.name">
                <router-link
                  :to="item.href"
                  class="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
          
          <!-- Services -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Our Services</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Civil Construction</li>
              <li>Plumbing Services</li>
              <li>Interior Design</li>
              <li>Project Management</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {{ new Date().getFullYear() }} ContractorPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BuildingOfficeIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' }
]

const handleLogout = () => {
  mobileMenuOpen.value = false
  authStore.logout()
}
</script>