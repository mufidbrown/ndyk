<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p class="text-gray-600">Manage your website settings and configurations.</p>
    </div>

    <div class="space-y-8">
      <!-- General Settings -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">General Settings</h3>
        </div>
        <form @submit.prevent="saveGeneralSettings" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
              <input v-model="generalSettings.siteTitle" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Site Tagline</label>
              <input v-model="generalSettings.siteTagline" type="text" class="input-field" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
            <textarea v-model="generalSettings.siteDescription" rows="3" class="input-field"></textarea>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input v-model="generalSettings.contactEmail" type="email" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input v-model="generalSettings.contactPhone" type="tel" class="input-field" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea v-model="generalSettings.address" rows="2" class="input-field"></textarea>
          </div>
          
          <div class="flex justify-end">
            <button type="submit" class="btn-primary">Save General Settings</button>
          </div>
        </form>
      </div>

      <!-- SEO Settings -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">SEO Settings</h3>
        </div>
        <form @submit.prevent="saveSeoSettings" class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
            <input v-model="seoSettings.metaTitle" type="text" class="input-field" />
            <p class="mt-1 text-sm text-gray-500">Recommended: 50-60 characters</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea v-model="seoSettings.metaDescription" rows="3" class="input-field"></textarea>
            <p class="mt-1 text-sm text-gray-500">Recommended: 150-160 characters</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
            <input v-model="seoSettings.keywords" type="text" class="input-field" />
            <p class="mt-1 text-sm text-gray-500">Separate keywords with commas</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
              <input v-model="seoSettings.googleAnalyticsId" type="text" class="input-field" placeholder="GA-XXXXXXXXX-X" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Google Search Console</label>
              <input v-model="seoSettings.googleSearchConsole" type="text" class="input-field" />
            </div>
          </div>
          
          <div class="flex justify-end">
            <button type="submit" class="btn-primary">Save SEO Settings</button>
          </div>
        </form>
      </div>

      <!-- Social Media Settings -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Social Media</h3>
        </div>
        <form @submit.prevent="saveSocialSettings" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input v-model="socialSettings.facebook" type="url" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input v-model="socialSettings.instagram" type="url" class="input-field" />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
              <input v-model="socialSettings.twitter" type="url" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
              <input v-model="socialSettings.linkedin" type="url" class="input-field" />
            </div>
          </div>
          
          <div class="flex justify-end">
            <button type="submit" class="btn-primary">Save Social Settings</button>
          </div>
        </form>
      </div>

      <!-- Email Settings -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Email Settings</h3>
        </div>
        <form @submit.prevent="saveEmailSettings" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
              <input v-model="emailSettings.smtpHost" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
              <input v-model="emailSettings.smtpPort" type="number" class="input-field" />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
              <input v-model="emailSettings.smtpUsername" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
              <input v-model="emailSettings.smtpPassword" type="password" class="input-field" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From Email</label>
            <input v-model="emailSettings.fromEmail" type="email" class="input-field" />
          </div>
          
          <div class="flex items-center">
            <input v-model="emailSettings.enableSsl" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label class="ml-2 block text-sm text-gray-900">Enable SSL</label>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button type="button" @click="testEmail" class="btn-secondary">Test Email</button>
            <button type="submit" class="btn-primary">Save Email Settings</button>
          </div>
        </form>
      </div>

      <!-- Backup & Maintenance -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Backup & Maintenance</h3>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Database Backup</h4>
              <p class="text-sm text-gray-600">Create a backup of your database and content.</p>
              <button @click="createBackup" class="btn-secondary">
                <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
                Create Backup
              </button>
            </div>
            
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Cache Management</h4>
              <p class="text-sm text-gray-600">Clear website cache to improve performance.</p>
              <button @click="clearCache" class="btn-secondary">
                <TrashIcon class="w-5 h-5 mr-2" />
                Clear Cache
              </button>
            </div>
          </div>
          
          <div class="border-t pt-6">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                <p class="text-sm text-gray-600">Enable maintenance mode to perform updates.</p>
              </div>
              <div class="flex items-center">
                <input v-model="maintenanceMode" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label class="ml-2 block text-sm text-gray-900">Enable</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDownTrayIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useToast } from 'vue-toastification'

const toast = useToast()

const generalSettings = ref({
  siteTitle: 'ContractorPro',
  siteTagline: 'Building Dreams Into Reality',
  siteDescription: 'Professional construction services specializing in civil engineering, plumbing solutions, and stunning interior designs.',
  contactEmail: 'info@contractorpro.com',
  contactPhone: '(123) 456-7890',
  address: '123 Construction Avenue\nBuilder City, BC 12345'
})

const seoSettings = ref({
  metaTitle: 'ContractorPro - Professional Construction Services',
  metaDescription: 'Professional construction services specializing in civil engineering, plumbing, and interior design. Quality workmanship guaranteed.',
  keywords: 'construction, civil engineering, plumbing, interior design, contractor',
  googleAnalyticsId: '',
  googleSearchConsole: ''
})

const socialSettings = ref({
  facebook: '',
  instagram: '',
  twitter: '',
  linkedin: ''
})

const emailSettings = ref({
  smtpHost: '',
  smtpPort: 587,
  smtpUsername: '',
  smtpPassword: '',
  fromEmail: 'noreply@contractorpro.com',
  enableSsl: true
})

const maintenanceMode = ref(false)

const saveGeneralSettings = () => {
  toast.success('General settings saved successfully!')
}

const saveSeoSettings = () => {
  toast.success('SEO settings saved successfully!')
}

const saveSocialSettings = () => {
  toast.success('Social media settings saved successfully!')
}

const saveEmailSettings = () => {
  toast.success('Email settings saved successfully!')
}

const testEmail = () => {
  toast.info('Test email sent! Check your inbox.')
}

const createBackup = () => {
  toast.success('Database backup created successfully!')
}

const clearCache = () => {
  toast.success('Cache cleared successfully!')
}
</script>