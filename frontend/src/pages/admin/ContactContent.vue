<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Contact Content Management</h1>
      <p class="text-gray-600">
        Manage all content sections for the contact page from this dashboard.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="mb-6 flex justify-between">
      <button @click="resetToDefault" class="btn-secondary">
        <ArrowPathIcon class="w-5 h-5 mr-2" />
        Reset to Default
      </button>
      <div class="flex space-x-3">
        <button @click="previewChanges" class="btn-secondary">
          <EyeIcon class="w-5 h-5 mr-2" />
          Preview Changes
        </button>
        <button @click="saveChanges" :disabled="isSaving" class="btn-primary">
          <CheckIcon v-if="!isSaving" class="w-5 h-5 mr-2" />
          <svg v-else class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSaving ? 'Saving...' : 'Save All Changes' }}
        </button>
      </div>
    </div>

    <!-- Save Status -->
    <div v-if="lastSaved" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center">
        <CheckCircleIcon class="w-5 h-5 text-green-600 mr-2" />
        <span class="text-green-800">Last saved: {{ lastSaved }}</span>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Hero Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <HomeIcon class="w-6 h-6 mr-2 text-primary-600" />
            Hero Section
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="localContent.hero.title"
              type="text"
              class="input-field"
              placeholder="Hero section title"
              @input="markAsChanged"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="localContent.hero.description"
              rows="3"
              class="input-field"
              placeholder="Hero section description"
              @input="markAsChanged"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <DocumentTextIcon class="w-6 h-6 mr-2 text-primary-600" />
            Contact Form Section
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
            <input
              v-model="localContent.form.title"
              type="text"
              class="input-field"
              placeholder="Contact form title"
              @input="markAsChanged"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Form Description</label>
            <textarea
              v-model="localContent.form.description"
              rows="3"
              class="input-field"
              placeholder="Contact form description"
              @input="markAsChanged"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <PhoneIcon class="w-6 h-6 mr-2 text-primary-600" />
            Contact Information
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              v-model="localContent.contactInfo.title"
              type="text"
              class="input-field"
              placeholder="Contact information section title"
              @input="markAsChanged"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
            <textarea
              v-model="localContent.contactInfo.description"
              rows="3"
              class="input-field"
              placeholder="Contact information section description"
              @input="markAsChanged"
            ></textarea>
          </div>

          <!-- Phone -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <PhoneIcon class="w-5 h-5 mr-2 text-gray-600" />
              Phone Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="localContent.contactInfo.phone.title"
                  type="text"
                  class="input-field"
                  placeholder="Phone section title"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  v-model="localContent.contactInfo.phone.details"
                  type="text"
                  class="input-field"
                  placeholder="Phone number"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
                <input
                  v-model="localContent.contactInfo.phone.extra"
                  type="text"
                  class="input-field"
                  placeholder="Additional phone info"
                  @input="markAsChanged"
                />
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <EnvelopeIcon class="w-5 h-5 mr-2 text-gray-600" />
              Email Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="localContent.contactInfo.email.title"
                  type="text"
                  class="input-field"
                  placeholder="Email section title"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  v-model="localContent.contactInfo.email.details"
                  type="email"
                  class="input-field"
                  placeholder="Email address"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
                <input
                  v-model="localContent.contactInfo.email.extra"
                  type="text"
                  class="input-field"
                  placeholder="Additional email info"
                  @input="markAsChanged"
                />
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPinIcon class="w-5 h-5 mr-2 text-gray-600" />
              Address Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="localContent.contactInfo.address.title"
                  type="text"
                  class="input-field"
                  placeholder="Address section title"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  v-model="localContent.contactInfo.address.details"
                  type="text"
                  class="input-field"
                  placeholder="Physical address"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
                <input
                  v-model="localContent.contactInfo.address.extra"
                  type="text"
                  class="input-field"
                  placeholder="Additional address info"
                  @input="markAsChanged"
                />
              </div>
            </div>
          </div>

          <!-- Service Hours -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ClockIcon class="w-5 h-5 mr-2 text-gray-600" />
              Service Hours Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="localContent.contactInfo.serviceHours.title"
                  type="text"
                  class="input-field"
                  placeholder="Service hours section title"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                <input
                  v-model="localContent.contactInfo.serviceHours.details"
                  type="text"
                  class="input-field"
                  placeholder="Service hours"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
                <input
                  v-model="localContent.contactInfo.serviceHours.extra"
                  type="text"
                  class="input-field"
                  placeholder="Additional service hours info"
                  @input="markAsChanged"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Hours -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <ClockIcon class="w-6 h-6 mr-2 text-primary-600" />
            Business Hours
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(hour, index) in localContent.businessHours" :key="index" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <input
                  v-model="hour.day"
                  type="text"
                  class="input-field"
                  placeholder="Day of week"
                  @input="markAsChanged"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                <input
                  v-model="hour.hours"
                  type="text"
                  class="input-field"
                  placeholder="Business hours"
                  @input="markAsChanged"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Emergency Contact -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <ExclamationTriangleIcon class="w-6 h-6 mr-2 text-accent-600" />
            Emergency Contact
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="localContent.emergency.title"
              type="text"
              class="input-field"
              placeholder="Emergency section title"
              @input="markAsChanged"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="localContent.emergency.description"
              rows="3"
              class="input-field"
              placeholder="Emergency section description"
              @input="markAsChanged"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <input
              v-model="localContent.emergency.phone"
              type="text"
              class="input-field"
              placeholder="Emergency phone number"
              @input="markAsChanged"
            />
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <MapPinIcon class="w-6 h-6 mr-2 text-primary-600" />
            Map Section
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="localContent.map.title"
              type="text"
              class="input-field"
              placeholder="Map section title"
              @input="markAsChanged"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="localContent.map.description"
              rows="3"
              class="input-field"
              placeholder="Map section description"
              @input="markAsChanged"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              v-model="localContent.map.address"
              type="text"
              class="input-field"
              placeholder="Map address"
              @input="markAsChanged"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Save Button -->
    <div class="mt-8 flex justify-end sticky bottom-4">
      <button @click="saveChanges" :disabled="isSaving" class="btn-primary shadow-lg">
        <CheckIcon v-if="!isSaving" class="w-5 h-5 mr-2" />
        <svg v-else class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isSaving ? 'Saving Changes...' : 'Save All Changes' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  CheckIcon,
  ArrowPathIcon,
  EyeIcon,
  HomeIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { useContactStore, type ContactContent } from '../../store/contact'
import { useToast } from 'vue-toastification'

const contactStore = useContactStore()
const toast = useToast()
const router = useRouter()

const isSaving = ref(false)
const hasChanges = ref(false)
const lastSaved = ref('')

const localContent = ref<ContactContent>({
  hero: { title: '', description: '' },
  form: { title: '', description: '' },
  contactInfo: {
    title: '',
    description: '',
    phone: { title: '', details: '', extra: '' },
    email: { title: '', details: '', extra: '' },
    address: { title: '', details: '', extra: '' },
    serviceHours: { title: '', details: '', extra: '' }
  },
  businessHours: [],
  emergency: { title: '', description: '', phone: '' },
  map: { title: '', description: '', address: '' }
})

onMounted(() => {
  // Load current content
  localContent.value = JSON.parse(JSON.stringify(contactStore.content))
})

const markAsChanged = () => {
  hasChanges.value = true
}

const saveChanges = async () => {
  try {
    isSaving.value = true
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update the store
    contactStore.updateContent(localContent.value)
    
    // Update last saved time
    lastSaved.value = new Date().toLocaleString()
    hasChanges.value = false
    
    toast.success('Content updated successfully! Changes are now live.')
  } catch (error) {
    toast.error('Failed to save changes. Please try again.')
    console.error('Save error:', error)
  } finally {
    isSaving.value = false
  }
}

const resetToDefault = () => {
  if (confirm('Are you sure you want to reset all content to default values? This action cannot be undone.')) {
    contactStore.resetContent()
    localContent.value = JSON.parse(JSON.stringify(contactStore.content))
    hasChanges.value = false
    toast.info('Content has been reset to default values.')
  }
}

const previewChanges = () => {
  // Temporarily save changes for preview
  contactStore.updateContent(localContent.value)
  // Open contact page in new tab
  window.open('/', '_blank')
}

// Watch for unsaved changes before leaving
watch(hasChanges, (newValue) => {
  if (newValue) {
    window.addEventListener('beforeunload', handleBeforeUnload)
  } else {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
})

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (hasChanges.value) {
    e.preventDefault()
    e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
  }
}
</script>