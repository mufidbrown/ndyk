<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Service Management</h1>
          <p class="text-gray-600">Manage all your service content, process steps, and features</p>
        </div>
        <div class="flex space-x-3">
          <button @click="saveAllChanges" class="btn-primary">
            <CheckIcon class="w-5 h-5 mr-2" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-8">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
        >
          <component :is="tab.icon" class="w-5 h-5 mr-2 inline" />
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Page Content Tab -->
    <div v-if="activeTab === 'content'" class="space-y-8">
      <div class="card p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-6">Page Content Settings</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Hero Section -->
          <div class="space-y-4">
            <h4 class="text-lg font-medium text-gray-900">Hero Section</h4>
            <div>
              <label class="form-label">Hero Title</label>
              <input
                v-model="editableContent.heroTitle"
                type="text"
                class="form-input"
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <label class="form-label">Hero Description</label>
              <textarea
                v-model="editableContent.heroDescription"
                rows="3"
                class="form-textarea"
                placeholder="Enter hero description"
              ></textarea>
            </div>
          </div>

          <!-- Process Section -->
          <div class="space-y-4">
            <h4 class="text-lg font-medium text-gray-900">Process Section</h4>
            <div>
              <label class="form-label">Process Title</label>
              <input
                v-model="editableContent.processTitle"
                type="text"
                class="form-input"
                placeholder="Enter process title"
              />
            </div>
            <div>
              <label class="form-label">Process Description</label>
              <textarea
                v-model="editableContent.processDescription"
                rows="3"
                class="form-textarea"
                placeholder="Enter process description"
              ></textarea>
            </div>
          </div>

          <!-- Features Section -->
          <div class="space-y-4">
            <h4 class="text-lg font-medium text-gray-900">Features Section</h4>
            <div>
              <label class="form-label">Features Title</label>
              <input
                v-model="editableContent.featuresTitle"
                type="text"
                class="form-input"
                placeholder="Enter features title"
              />
            </div>
            <div>
              <label class="form-label">Features Description</label>
              <textarea
                v-model="editableContent.featuresDescription"
                rows="3"
                class="form-textarea"
                placeholder="Enter features description"
              ></textarea>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="space-y-4">
            <h4 class="text-lg font-medium text-gray-900">Call to Action</h4>
            <div>
              <label class="form-label">CTA Title</label>
              <input
                v-model="editableContent.ctaTitle"
                type="text"
                class="form-input"
                placeholder="Enter CTA title"
              />
            </div>
            <div>
              <label class="form-label">CTA Description</label>
              <textarea
                v-model="editableContent.ctaDescription"
                rows="3"
                class="form-textarea"
                placeholder="Enter CTA description"
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Button Text</label>
                <input
                  v-model="editableContent.ctaButtonText"
                  type="text"
                  class="form-input"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label class="form-label">Phone Text</label>
                <input
                  v-model="editableContent.ctaPhoneText"
                  type="text"
                  class="form-input"
                  placeholder="Phone text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Tab -->
    <div v-if="activeTab === 'services'" class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-gray-900">Manage Services</h3>
        <button @click="showAddServiceModal = true" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Service
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <div v-for="service in servicesStore.services" :key="service.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <component :is="getIcon(service.icon)" class="w-8 h-8 text-primary-600 mr-3" />
                <h4 class="text-xl font-semibold text-gray-900">{{ service.title }}</h4>
                <span :class="service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ service.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <p class="text-gray-600 mb-4">{{ service.description }}</p>
              <div class="mb-4">
                <img :src="service.image" :alt="service.title" class="w-32 h-24 object-cover rounded-lg" />
              </div>
              <div class="space-y-2">
                <h5 class="font-medium text-gray-900">Services:</h5>
                <ul class="list-disc list-inside text-gray-600 space-y-1">
                  <li v-for="item in service.services" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
            <div class="flex space-x-2 ml-6">
              <button @click="editService(service)" class="btn-secondary">
                <PencilIcon class="w-4 h-4" />
              </button>
              <button @click="toggleServiceActive(service.id)" 
                      :class="service.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'"
                      class="inline-flex items-center p-2 border rounded-md text-sm font-medium transition-colors duration-200">
                <component :is="service.isActive ? EyeSlashIcon : EyeIcon" class="w-4 h-4" />
              </button>
              <button @click="deleteService(service.id)" class="text-red-600 hover:text-red-700 p-2">
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Process Steps Tab -->
    <div v-if="activeTab === 'process'" class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-gray-900">Manage Process Steps</h3>
        <button @click="showAddProcessModal = true" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Process Step
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="step in servicesStore.processSteps" :key="step.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-bold text-white">{{ step.order }}</span>
                </div>
                <h4 class="text-lg font-semibold text-gray-900">{{ step.title }}</h4>
                <span :class="step.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                      class="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ step.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <p class="text-gray-600">{{ step.description }}</p>
            </div>
            <div class="flex space-x-2 ml-4">
              <button @click="editProcessStep(step)" class="btn-secondary">
                <PencilIcon class="w-4 h-4" />
              </button>
              <button @click="toggleProcessActive(step.id)" 
                      :class="step.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'"
                      class="inline-flex items-center p-2 border rounded-md text-sm font-medium transition-colors duration-200">
                <component :is="step.isActive ? EyeSlashIcon : EyeIcon" class="w-4 h-4" />
              </button>
              <button @click="deleteProcessStep(step.id)" class="text-red-600 hover:text-red-700 p-2">
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Tab -->
    <div v-if="activeTab === 'features'" class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-gray-900">Manage Features</h3>
        <button @click="showAddFeatureModal = true" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Feature
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="feature in servicesStore.features" :key="feature.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <component :is="getIcon(feature.icon)" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">{{ feature.title }}</h4>
                  <span :class="feature.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                    {{ feature.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              <p class="text-gray-600 text-sm">{{ feature.description }}</p>
            </div>
            <div class="flex flex-col space-y-2 ml-4">
              <button @click="editFeature(feature)" class="btn-secondary p-1">
                <PencilIcon class="w-4 h-4" />
              </button>
              <button @click="toggleFeatureActive(feature.id)" 
                      :class="feature.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'"
                      class="inline-flex items-center p-1 border rounded-md text-sm font-medium transition-colors duration-200">
                <component :is="feature.isActive ? EyeSlashIcon : EyeIcon" class="w-4 h-4" />
              </button>
              <button @click="deleteFeature(feature.id)" class="text-red-600 hover:text-red-700 p-1">
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Service Modal -->
    <div v-if="showAddServiceModal || editingService" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingService ? 'Edit Service' : 'Add New Service' }}
          </h3>
          
          <form @submit.prevent="saveService" class="space-y-4">
            <div>
              <label class="form-label">Title</label>
              <input v-model="serviceForm.title" type="text" class="form-input" required />
            </div>
            
            <div>
              <label class="form-label">Description</label>
              <textarea v-model="serviceForm.description" rows="3" class="form-textarea" required></textarea>
            </div>
            
            <div>
              <label class="form-label">Icon</label>
              <select v-model="serviceForm.icon" class="form-input" required>
                <option value="">Select an icon</option>
                <option v-for="(icon, key) in availableIcons" :key="key" :value="key">{{ key }}</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Image URL</label>
              <input v-model="serviceForm.image" type="url" class="form-input" required />
            </div>

            <div>
              <label class="form-label">Services (one per line)</label>
              <textarea v-model="serviceServicesText" rows="5" class="form-textarea" required></textarea>
            </div>

            <div>
              <label class="form-label">Order</label>
              <input v-model.number="serviceForm.order" type="number" class="form-input" required />
            </div>

            <div class="flex items-center">
              <input v-model="serviceForm.isActive" type="checkbox" class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
              <label class="ml-2 text-sm text-gray-900">Active</label>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="cancelServiceEdit" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">
                {{ editingService ? 'Update' : 'Add' }} Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add/Edit Process Step Modal -->
    <div v-if="showAddProcessModal || editingProcessStep" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-lg shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingProcessStep ? 'Edit Process Step' : 'Add New Process Step' }}
          </h3>
          
          <form @submit.prevent="saveProcessStep" class="space-y-4">
            <div>
              <label class="form-label">Title</label>
              <input v-model="processForm.title" type="text" class="form-input" required />
            </div>
            
            <div>
              <label class="form-label">Description</label>
              <textarea v-model="processForm.description" rows="3" class="form-textarea" required></textarea>
            </div>

            <div>
              <label class="form-label">Order</label>
              <input v-model.number="processForm.order" type="number" class="form-input" required />
            </div>

            <div class="flex items-center">
              <input v-model="processForm.isActive" type="checkbox" class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
              <label class="ml-2 text-sm text-gray-900">Active</label>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="cancelProcessEdit" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">
                {{ editingProcessStep ? 'Update' : 'Add' }} Process Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add/Edit Feature Modal -->
    <div v-if="showAddFeatureModal || editingFeature" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-lg shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingFeature ? 'Edit Feature' : 'Add New Feature' }}
          </h3>
          
          <form @submit.prevent="saveFeature" class="space-y-4">
            <div>
              <label class="form-label">Title</label>
              <input v-model="featureForm.title" type="text" class="form-input" required />
            </div>
            
            <div>
              <label class="form-label">Description</label>
              <textarea v-model="featureForm.description" rows="3" class="form-textarea" required></textarea>
            </div>
            
            <div>
              <label class="form-label">Icon</label>
              <select v-model="featureForm.icon" class="form-input" required>
                <option value="">Select an icon</option>
                <option v-for="(icon, key) in availableIcons" :key="key" :value="key">{{ key }}</option>
              </select>
            </div>

            <div>
              <label class="form-label">Order</label>
              <input v-model.number="featureForm.order" type="number" class="form-input" required />
            </div>

            <div class="flex items-center">
              <input v-model="featureForm.isActive" type="checkbox" class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
              <label class="ml-2 text-sm text-gray-900">Active</label>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="cancelFeatureEdit" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">
                {{ editingFeature ? 'Update' : 'Add' }} Feature
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  DocumentTextIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/vue/24/outline'
import { useServicesStore } from '../../store/services'
import type { Service, ProcessStep, Feature } from '../../store/services'

const servicesStore = useServicesStore()

const activeTab = ref('content')
const showAddServiceModal = ref(false)
const showAddProcessModal = ref(false)
const showAddFeatureModal = ref(false)
const editingService = ref<Service | null>(null)
const editingProcessStep = ref<ProcessStep | null>(null)
const editingFeature = ref<Feature | null>(null)

// Reactive content for editing
const editableContent = reactive({ ...servicesStore.serviceContent })

// Watch for changes in store content
watch(() => servicesStore.serviceContent, (newContent) => {
  Object.assign(editableContent, newContent)
}, { deep: true })

const tabs = [
  { id: 'content', name: 'Page Content', icon: DocumentTextIcon },
  { id: 'services', name: 'Services', icon: WrenchScrewdriverIcon },
  { id: 'process', name: 'Process Steps', icon: BuildingOfficeIcon },
  { id: 'features', name: 'Features', icon: ShieldCheckIcon }
]

const availableIcons = {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon
}

const iconMap = {
  ...availableIcons
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || HomeIcon
}

// Service form
const serviceForm = reactive({
  title: '',
  description: '',
  icon: '',
  image: '',
  services: [] as string[],
  order: 1,
  isActive: true
})

const serviceServicesText = ref('')

watch(() => serviceForm.services, (newServices) => {
  serviceServicesText.value = newServices.join('\n')
})

watch(serviceServicesText, (newText) => {
  serviceForm.services = newText.split('\n').filter(s => s.trim() !== '')
})

// Process form
const processForm = reactive({
  title: '',
  description: '',
  order: 1,
  isActive: true
})

// Feature form
const featureForm = reactive({
  title: '',
  description: '',
  icon: '',
  order: 1,
  isActive: true
})

// Actions
const saveAllChanges = () => {
  servicesStore.updateServiceContent(editableContent)
  // Show success message
  alert('All changes saved successfully!')
}

const editService = (service: Service) => {
  editingService.value = service
  Object.assign(serviceForm, service)
  serviceServicesText.value = service.services.join('\n')
}

const saveService = () => {
  serviceForm.services = serviceServicesText.value.split('\n').filter(s => s.trim() !== '')
  
  if (editingService.value) {
    servicesStore.updateService(editingService.value.id, serviceForm)
  } else {
    servicesStore.addService(serviceForm)
  }
  
  cancelServiceEdit()
}

const cancelServiceEdit = () => {
  showAddServiceModal.value = false
  editingService.value = null
  Object.assign(serviceForm, {
    title: '',
    description: '',
    icon: '',
    image: '',
    services: [],
    order: 1,
    isActive: true
  })
  serviceServicesText.value = ''
}

const deleteService = (id: string) => {
  if (confirm('Are you sure you want to delete this service?')) {
    servicesStore.deleteService(id)
  }
}

const toggleServiceActive = (id: string) => {
  const service = servicesStore.services.find(s => s.id === id)
  if (service) {
    servicesStore.updateService(id, { isActive: !service.isActive })
  }
}

// Process step actions
const editProcessStep = (step: ProcessStep) => {
  editingProcessStep.value = step
  Object.assign(processForm, step)
}

const saveProcessStep = () => {
  if (editingProcessStep.value) {
    servicesStore.updateProcessStep(editingProcessStep.value.id, processForm)
  } else {
    servicesStore.addProcessStep(processForm)
  }
  
  cancelProcessEdit()
}

const cancelProcessEdit = () => {
  showAddProcessModal.value = false
  editingProcessStep.value = null
  Object.assign(processForm, {
    title: '',
    description: '',
    order: 1,
    isActive: true
  })
}

const deleteProcessStep = (id: string) => {
  if (confirm('Are you sure you want to delete this process step?')) {
    servicesStore.deleteProcessStep(id)
  }
}

const toggleProcessActive = (id: string) => {
  const step = servicesStore.processSteps.find(p => p.id === id)
  if (step) {
    servicesStore.updateProcessStep(id, { isActive: !step.isActive })
  }
}

// Feature actions
const editFeature = (feature: Feature) => {
  editingFeature.value = feature
  Object.assign(featureForm, feature)
}

const saveFeature = () => {
  if (editingFeature.value) {
    servicesStore.updateFeature(editingFeature.value.id, featureForm)
  } else {
    servicesStore.addFeature(featureForm)
  }
  
  cancelFeatureEdit()
}

const cancelFeatureEdit = () => {
  showAddFeatureModal.value = false
  editingFeature.value = null
  Object.assign(featureForm, {
    title: '',
    description: '',
    icon: '',
    order: 1,
    isActive: true
  })
}

const deleteFeature = (id: string) => {
  if (confirm('Are you sure you want to delete this feature?')) {
    servicesStore.deleteFeature(id)
  }
}

const toggleFeatureActive = (id: string) => {
  const feature = servicesStore.features.find(f => f.id === id)
  if (feature) {
    servicesStore.updateFeature(id, { isActive: !feature.isActive })
  }
}
</script>