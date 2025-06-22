<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Contact Content Management</h1>
        <p class="mt-1 text-sm text-gray-600">
          Manage all content displayed on your contact page
        </p>
      </div>
      <button
        @click="saveAllChanges"
        :disabled="!hasChanges"
        class="btn-primary"
        :class="{ 'opacity-50 cursor-not-allowed': !hasChanges }"
      >
        <CheckIcon class="w-4 h-4 mr-2" />
        Save All Changes
      </button>
    </div>

    <!-- Hero Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <GlobeAltIcon class="w-5 h-5 mr-2 text-primary-600" />
          Hero Section
        </h3>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Page Title
          </label>
          <input
            v-model="editableContent.hero.title"
            type="text"
            class="input-field"
            placeholder="Enter hero title"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            v-model="editableContent.hero.description"
            rows="3"
            class="input-field"
            placeholder="Enter hero description"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Contact Form Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <DocumentTextIcon class="w-5 h-5 mr-2 text-primary-600" />
          Contact Form Settings
        </h3>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Form Title
          </label>
          <input
            v-model="editableContent.form.title"
            type="text"
            class="input-field"
            placeholder="Enter form title"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Form Description
          </label>
          <textarea
            v-model="editableContent.form.description"
            rows="2"
            class="input-field"
            placeholder="Enter form description"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <InformationCircleIcon class="w-5 h-5 mr-2 text-primary-600" />
          Contact Information
        </h3>
      </div>
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              v-model="editableContent.contactInfo.title"
              type="text"
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Section Description
            </label>
            <textarea
              v-model="editableContent.contactInfo.description"
              rows="2"
              class="input-field"
            ></textarea>
          </div>
        </div>

        <!-- Phone Info -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
            <PhoneIcon class="w-4 h-4 mr-2" />
            Phone Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="editableContent.contactInfo.phone.title"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                v-model="editableContent.contactInfo.phone.details"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
              <input
                v-model="editableContent.contactInfo.phone.extra"
                type="text"
                class="input-field"
              />
            </div>
          </div>
        </div>

        <!-- Email Info -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
            <EnvelopeIcon class="w-4 h-4 mr-2" />
            Email Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="editableContent.contactInfo.email.title"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                v-model="editableContent.contactInfo.email.details"
                type="email"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
              <input
                v-model="editableContent.contactInfo.email.extra"
                type="text"
                class="input-field"
              />
            </div>
          </div>
        </div>

        <!-- Address Info -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
            <MapPinIcon class="w-4 h-4 mr-2" />
            Address Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="editableContent.contactInfo.address.title"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                v-model="editableContent.contactInfo.address.details"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City, State, ZIP</label>
              <input
                v-model="editableContent.contactInfo.address.extra"
                type="text"
                class="input-field"
              />
            </div>
          </div>
        </div>

        <!-- Service Hours Info -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
            <ClockIcon class="w-4 h-4 mr-2" />
            Service Hours Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="editableContent.contactInfo.serviceHours.title"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Weekday Hours</label>
              <input
                v-model="editableContent.contactInfo.serviceHours.details"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Weekend Hours</label>
              <input
                v-model="editableContent.contactInfo.serviceHours.extra"
                type="text"
                class="input-field"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Business Hours -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <ClockIcon class="w-5 h-5 mr-2 text-primary-600" />
          Business Hours
        </h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="(hour, index) in editableContent.businessHours"
            :key="index"
            class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Day(s)</label>
              <input
                v-model="hour.day"
                type="text"
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input
                v-model="hour.hours"
                type="text"
                class="input-field"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Emergency Contact -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <ExclamationTriangleIcon class="w-5 h-5 mr-2 text-accent-600" />
          Emergency Contact
        </h3>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Emergency Section Title
          </label>
          <input
            v-model="editableContent.emergency.title"
            type="text"
            class="input-field"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Emergency Description
          </label>
          <textarea
            v-model="editableContent.emergency.description"
            rows="2"
            class="input-field"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Emergency Phone Number
          </label>
          <input
            v-model="editableContent.emergency.phone"
            type="text"
            class="input-field"
          />
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 flex items-center">
          <MapPinIcon class="w-5 h-5 mr-2 text-primary-600" />
          Map Section
        </h3>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Map Section Title
          </label>
          <input
            v-model="editableContent.map.title"
            type="text"
            class="input-field"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Map Description
          </label>
          <textarea
            v-model="editableContent.map.description"
            rows="2"
            class="input-field"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Map Address Display
          </label>
          <input
            v-model="editableContent.map.address"
            type="text"
            class="input-field"
          />
        </div>
      </div>
    </div>

    <!-- Preview Button -->
    <div class="flex justify-center pt-8">
      <router-link
        to="/"
        target="_blank"
        class="btn-secondary"
      >
        <EyeIcon class="w-4 h-4 mr-2" />
        Preview Contact Page
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import {
  CheckIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'
import { useContactStore, type ContactContent } from '../../store/contact'

const contactStore = useContactStore()
const toast = useToast()

// Create a reactive copy of the content for editing
const editableContent = ref<ContactContent>(JSON.parse(JSON.stringify(contactStore.content)))

// Track if there are unsaved changes
const hasChanges = computed(() => {
  return JSON.stringify(editableContent.value) !== JSON.stringify(contactStore.content)
})

// Auto-save functionality (optional)
let saveTimeout: NodeJS.Timeout

watch(editableContent, () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  // Auto-save after 3 seconds of no changes
  saveTimeout = setTimeout(() => {
    if (hasChanges.value) {
      saveAllChanges()
    }
  }, 3000)
}, { deep: true })

const saveAllChanges = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update the store
    contactStore.updateContent(editableContent.value)
    
    toast.success('Contact content updated successfully!')
  } catch (error) {
    toast.error('Failed to save changes. Please try again.')
  }
}

// Watch for external changes to the store and update editable content
watch(() => contactStore.content, (newContent) => {
  editableContent.value = JSON.parse(JSON.stringify(newContent))
}, { deep: true })
</script>