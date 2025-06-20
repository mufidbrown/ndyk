<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <router-link to="/" class="flex items-center justify-center space-x-3 mb-6">
          <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <BuildingOfficeIcon class="w-8 h-8 text-white" />
          </div>
          <span class="text-2xl font-bold text-gray-900">ContractorPro</span>
        </router-link>
        <h2 class="text-3xl font-bold text-gray-900">Forgot your password?</h2>
        <p class="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input-field mt-1"
            placeholder="Enter your email address"
          />
        </div>
        
        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="btn-primary w-full justify-center"
        >
          <span v-if="!authStore.isLoading">Send Reset Link</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        </button>
        
        <div class="text-center">
          <router-link to="/auth/login" class="text-sm font-medium text-primary-600 hover:text-primary-500">
            ← Back to sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BuildingOfficeIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../store/auth'

const authStore = useAuthStore()
const email = ref('')

const handleSubmit = async () => {
  try {
    await authStore.forgotPassword(email.value)
  } catch (error) {
    // Error handling is done in the store
  }
}
</script>