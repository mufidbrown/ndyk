<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Home Content Management</h2>
      <div class="flex space-x-3">
        <button @click="previewChanges" class="btn-secondary">
          <EyeIcon class="w-5 h-5 mr-2" />
          Preview
        </button>
        <button @click="resetContent" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Reset to Default
        </button>
      </div>
    </div>

    <!-- Hero Section Management -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Hero Section</h3>
      <form @submit.prevent="saveHeroContent" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Main Title</label>
            <input type="text" v-model="heroForm.title" class="form-input" required>
          </div>
          <div>
            <label class="form-label">Highlighted Word</label>
            <input type="text" v-model="heroForm.subtitle" class="form-input" required>
          </div>
        </div>
        
        <div>
          <label class="form-label">Description</label>
          <textarea v-model="heroForm.description" class="form-input" rows="4" required></textarea>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Primary Button Text</label>
            <input type="text" v-model="heroForm.primaryButtonText" class="form-input" required>
          </div>
          <div>
            <label class="form-label">Secondary Button Text</label>
            <input type="text" v-model="heroForm.secondaryButtonText" class="form-input" required>
          </div>
        </div>
        
        <div>
          <label class="form-label">Hero Image URL</label>
          <input type="url" v-model="heroForm.heroImage" class="form-input" required>
          <div v-if="heroForm.heroImage" class="mt-2">
            <img :src="heroForm.heroImage" alt="Hero preview" class="w-32 h-20 object-cover rounded">
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Stats Value</label>
            <input type="text" v-model="heroForm.statsValue" class="form-input" required>
          </div>
          <div>
            <label class="form-label">Stats Label</label>
            <input type="text" v-model="heroForm.statsLabel" class="form-input" required>
          </div>
        </div>
        
        <button type="submit" class="btn-primary">Save Hero Content</button>
      </form>
    </div>

    <!-- Services Management -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Services</h3>
        <button @click="showServiceModal = true" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Service
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="service in homeContentStore.content.services" :key="service.id" class="border border-gray-200 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 mb-2">{{ service.title }}</h4>
          <p class="text-gray-600 text-sm mb-3">{{ service.description }}</p>
          <div class="flex justify-end space-x-2">
            <button @click="editService(service)" class="text-primary-600 hover:text-primary-900 text-sm">
              Edit
            </button>
            <button @click="deleteServiceItem(service.id)" class="text-red-600 hover:text-red-900 text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Management -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Statistics</h3>
        <button @click="showStatModal = true" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Stat
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="stat in homeContentStore.content.stats" :key="stat.id" class="border border-gray-200 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-primary-600 mb-1">{{ stat.value }}</div>
          <div class="text-gray-600 text-sm mb-3">{{ stat.label }}</div>
          <div class="flex justify-center space-x-2">
            <button @click="editStat(stat)" class="text-primary-600 hover:text-primary-900 text-sm">
              Edit
            </button>
            <button @click="deleteStatItem(stat.id)" class="text-red-600 hover:text-red-900 text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Choose Us Management -->
    <div class="card">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Why Choose Us</h3>
        <button @click="showWhyChooseUsModal = true" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Item
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="item in homeContentStore.content.whyChooseUs" :key="item.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">{{ item.title }}</h4>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
            </div>
            <div class="flex space-x-2">
              <button @click="editWhyChooseUsItem(item)" class="text-primary-600 hover:text-primary-900 text-sm">
                Edit
              </button>
              <button @click="deleteWhyChooseUsItem(item.id)" class="text-red-600 hover:text-red-900 text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section Management -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Call-to-Action Section</h3>
      <form @submit.prevent="saveCTAContent" class="space-y-6">
        <div>
          <label class="form-label">CTA Title</label>
          <input type="text" v-model="ctaForm.title" class="form-input" required>
        </div>
        
        <div>
          <label class="form-label">CTA Description</label>
          <textarea v-model="ctaForm.description" class="form-input" rows="3" required></textarea>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Primary Button Text</label>
            <input type="text" v-model="ctaForm.primaryButtonText" class="form-input" required>
          </div>
          <div>
            <label class="form-label">Secondary Button Text</label>
            <input type="text" v-model="ctaForm.secondaryButtonText" class="form-input" required>
          </div>
        </div>
        
        <button type="submit" class="btn-primary">Save CTA Content</button>
      </form>
    </div>

    <!-- Gallery Images Management -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Gallery Images</h3>
      <div class="space-y-4">
        <div v-for="(image, index) in galleryImages" :key="index" class="flex items-center space-x-4">
          <img :src="image" alt="Gallery image" class="w-20 h-12 object-cover rounded">
          <input type="url" v-model="galleryImages[index]" class="form-input flex-1" placeholder="Image URL">
          <button @click="removeGalleryImage(index)" class="text-red-600 hover:text-red-900">
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
        <div class="flex space-x-3">
          <button @click="addGalleryImage" class="btn-secondary">
            <PlusIcon class="w-5 h-5 mr-2" />
            Add Image
          </button>
          <button @click="saveGalleryImages" class="btn-primary">Save Gallery</button>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <div v-if="showServiceModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingService ? 'Edit Service' : 'Add New Service' }}
          </h3>
          <form @submit.prevent="saveService">
            <div class="space-y-4">
              <div>
                <label class="form-label">Service Title</label>
                <input type="text" v-model="serviceForm.title" class="form-input" required>
              </div>
              <div>
                <label class="form-label">Description</label>
                <textarea v-model="serviceForm.description" class="form-input" rows="3" required></textarea>
              </div>
              <div>
                <label class="form-label">Icon</label>
                <select v-model="serviceForm.icon" class="form-input">
                  <option value="BuildingOfficeIcon">Building Office</option>
                  <option value="WrenchScrewdriverIcon">Wrench Screwdriver</option>
                  <option value="HomeIcon">Home</option>
                  <option value="CogIcon">Cog</option>
                  <option value="UserGroupIcon">User Group</option>
                </select>
              </div>
              <div>
                <label class="form-label">Features (one per line)</label>
                <textarea v-model="featuresText" class="form-input" rows="4" placeholder="Feature 1&#10;Feature 2&#10;Feature 3"></textarea>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="closeServiceModal" class="px-4 py-2 text-gray-500 hover:text-gray-700">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                {{ editingService ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Stat Modal -->
    <div v-if="showStatModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingStat ? 'Edit Statistic' : 'Add New Statistic' }}
          </h3>
          <form @submit.prevent="saveStat">
            <div class="space-y-4">
              <div>
                <label class="form-label">Value</label>
                <input type="text" v-model="statForm.value" class="form-input" required>
              </div>
              <div>
                <label class="form-label">Label</label>
                <input type="text" v-model="statForm.label" class="form-input" required>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="closeStatModal" class="px-4 py-2 text-gray-500 hover:text-gray-700">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                {{ editingStat ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Why Choose Us Modal -->
    <div v-if="showWhyChooseUsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingWhyChooseUs ? 'Edit Item' : 'Add New Item' }}
          </h3>
          <form @submit.prevent="saveWhyChooseUs">
            <div class="space-y-4">
              <div>
                <label class="form-label">Title</label>
                <input type="text" v-model="whyChooseUsForm.title" class="form-input" required>
              </div>
              <div>
                <label class="form-label">Description</label>
                <textarea v-model="whyChooseUsForm.description" class="form-input" rows="3" required></textarea>
              </div>
              <div>
                <label class="form-label">Icon</label>
                <select v-model="whyChooseUsForm.icon" class="form-input">
                  <option value="UserGroupIcon">User Group</option>
                  <option value="ShieldCheckIcon">Shield Check</option>
                  <option value="ClockIcon">Clock</option>
                  <option value="CheckBadgeIcon">Check Badge</option>
                  <option value="StarIcon">Star</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="closeWhyChooseUsModal" class="px-4 py-2 text-gray-500 hover:text-gray-700">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                {{ editingWhyChooseUs ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  PlusIcon, 
  EyeIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'
import { useHomeContentStore } from '../../store/homeContent'
import type { Service, Stat, WhyChooseUsItem } from '../../store/homeContent'

const router = useRouter()
const homeContentStore = useHomeContentStore()

// Hero form
const heroForm = reactive({
  title: '',
  subtitle: '',
  description: '',
  primaryButtonText: '',
  secondaryButtonText: '',
  heroImage: '',
  statsValue: '',
  statsLabel: ''
})

// CTA form
const ctaForm = reactive({
  title: '',
  description: '',
  primaryButtonText: '',
  secondaryButtonText: ''
})

// Service management
const showServiceModal = ref(false)
const editingService = ref<Service | null>(null)
const serviceForm = reactive({
  title: '',
  description: '',
  icon: 'BuildingOfficeIcon',
  features: [] as string[]
})
const featuresText = ref('')

// Stat management
const showStatModal = ref(false)
const editingStat = ref<Stat | null>(null)
const statForm = reactive({
  value: '',
  label: ''
})

// Why Choose Us management
const showWhyChooseUsModal = ref(false)
const editingWhyChooseUs = ref<WhyChooseUsItem | null>(null)
const whyChooseUsForm = reactive({
  title: '',
  description: '',
  icon: 'UserGroupIcon'
})

// Gallery management
const galleryImages = ref<string[]>([])

onMounted(() => {
  loadFormData()
})

const loadFormData = () => {
  const content = homeContentStore.content
  
  // Load hero data
  Object.assign(heroForm, content.hero)
  
  // Load CTA data
  Object.assign(ctaForm, content.cta)
  
  // Load gallery images
  galleryImages.value = [...content.galleryImages]
}

const saveHeroContent = () => {
  homeContentStore.updateHeroContent(heroForm)
  alert('Hero content saved successfully!')
}

const saveCTAContent = () => {
  homeContentStore.updateCTAContent(ctaForm)
  alert('CTA content saved successfully!')
}

// Service management methods
const editService = (service: Service) => {
  editingService.value = service
  Object.assign(serviceForm, service)
  featuresText.value = service.features.join('\n')
  showServiceModal.value = true
}

const saveService = () => {
  const features = featuresText.value.split('\n').filter(f => f.trim())
  const serviceData = {
    ...serviceForm,
    features,
    id: editingService.value?.id || Date.now()
  }
  
  homeContentStore.updateService(serviceData)
  closeServiceModal()
  alert('Service saved successfully!')
}

const deleteServiceItem = (id: number) => {
  if (confirm('Are you sure you want to delete this service?')) {
    homeContentStore.deleteService(id)
  }
}

const closeServiceModal = () => {
  showServiceModal.value = false
  editingService.value = null
  Object.assign(serviceForm, { title: '', description: '', icon: 'BuildingOfficeIcon', features: [] })
  featuresText.value = ''
}

// Stat management methods
const editStat = (stat: Stat) => {
  editingStat.value = stat
  Object.assign(statForm, stat)
  showStatModal.value = true
}

const saveStat = () => {
  const statData = {
    ...statForm,
    id: editingStat.value?.id || Date.now()
  }
  
  homeContentStore.updateStat(statData)
  closeStatModal()
  alert('Statistic saved successfully!')
}

const deleteStatItem = (id: number) => {
  if (confirm('Are you sure you want to delete this statistic?')) {
    homeContentStore.deleteStat(id)
  }
}

const closeStatModal = () => {
  showStatModal.value = false
  editingStat.value = null
  Object.assign(statForm, { value: '', label: '' })
}

// Why Choose Us management methods
const editWhyChooseUsItem = (item: WhyChooseUsItem) => {
  editingWhyChooseUs.value = item
  Object.assign(whyChooseUsForm, item)
  showWhyChooseUsModal.value = true
}

const saveWhyChooseUs = () => {
  const itemData = {
    ...whyChooseUsForm,
    id: editingWhyChooseUs.value?.id || Date.now()
  }
  
  homeContentStore.updateWhyChooseUs(itemData)
  closeWhyChooseUsModal()
  alert('Item saved successfully!')
}

const deleteWhyChooseUsItem = (id: number) => {
  if (confirm('Are you sure you want to delete this item?')) {
    homeContentStore.deleteWhyChooseUs(id)
  }
}

const closeWhyChooseUsModal = () => {
  showWhyChooseUsModal.value = false
  editingWhyChooseUs.value = null
  Object.assign(whyChooseUsForm, { title: '', description: '', icon: 'UserGroupIcon' })
}

// Gallery management methods
const addGalleryImage = () => {
  galleryImages.value.push('')
}

const removeGalleryImage = (index: number) => {
  galleryImages.value.splice(index, 1)
}

const saveGalleryImages = () => {
  const validImages = galleryImages.value.filter(img => img.trim())
  homeContentStore.updateGalleryImages(validImages)
  alert('Gallery images saved successfully!')
}

// Utility methods
const previewChanges = () => {
  window.open('/', '_blank')
}

const resetContent = () => {
  if (confirm('Are you sure you want to reset all content to default values? This action cannot be undone.')) {
    homeContentStore.resetToDefaults()
    loadFormData()
    alert('Content reset to default values!')
  }
}
</script>