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
        <h2 class="text-3xl font-bold text-gray-900">Reset your password</h2>
        <p class="mt-2 text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input-field pr-10"
                placeholder="Enter your new password"
                minlength="6"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="showPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">Must be at least 6 characters</p>
          </div>
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="input-field pr-10"
                placeholder="Confirm your new password"
                :class="{ 'border-red-300': form.confirmPassword && form.password !== form.confirmPassword }"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="showConfirmPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="mt-1 text-sm text-red-600">
              Passwords do not match
            </p>
          </div>
        </div>
        
        <button
          type="submit"
          :disabled="authStore.isLoading || !isFormValid"
          class="btn-primary w-full justify-center"
        >
          <span v-if="!authStore.isLoading">Reset Password</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Resetting...
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { BuildingOfficeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../store/auth'

const route = useRoute()
const authStore = useAuthStore()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  password: '',
  confirmPassword: '',
  token: ''
})

const isFormValid = computed(() => {
  return form.value.password &&
         form.value.password === form.value.confirmPassword &&
         form.value.token
})

onMounted(() => {
  form.value.token = route.query.token as string || ''
})

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  try {
    await authStore.resetPassword(form.value.token, form.value.password)
  } catch (error) {
    // Error handling is done in the store
  }
}
</script>