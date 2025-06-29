<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Home Content Management</h1>
        <p class="text-gray-600 mt-1">Manage all content sections on your homepage</p>
      </div>
      <div class="flex space-x-3">
        <router-link to="/" target="_blank" class="btn-secondary">
          <EyeIcon class="w-5 h-5 mr-2" />
          Preview Changes
        </router-link>
        <button @click="saveAllChanges" class="btn-primary">
          <CheckIcon class="w-5 h-5 mr-2" />
          Save All Changes
        </button>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Hero Section</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="form-label">Main Title</label>
              <input
                v-model="heroForm.title"
                type="text"
                class="form-input"
                placeholder="Building Your Dreams Into"
              />
            </div>
            <div>
              <label class="form-label">Subtitle</label>
              <input
                v-model="heroForm.subtitle"
                type="text"
                class="form-input"
                placeholder="Reality"
              />
            </div>
            <div>
              <label class="form-label">Description</label>
              <textarea
                v-model="heroForm.description"
                rows="4"
                class="form-textarea"
                placeholder="Professional construction services..."
              ></textarea>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="form-label">Primary Button Text</label>
              <input
                v-model="heroForm.primaryButtonText"
                type="text"
                class="form-input"
                placeholder="Get Free Quote"
              />
            </div>
            <div>
              <label class="form-label">Secondary Button Text</label>
              <input
                v-model="heroForm.secondaryButtonText"
                type="text"
                class="form-input"
                placeholder="View Our Work"
              />
            </div>
            <div>
              <label class="form-label">Hero Image URL</label>
              <input
                v-model="heroForm.heroImage"
                type="url"
                class="form-input"
                placeholder="https://..."
              />
              <p class="text-sm text-gray-500 mt-1">
                Recommended: High-quality landscape image (16:9 aspect ratio, minimum 800x450px)
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Stats Value</label>
                <input
                  v-model="heroForm.statsValue"
                  type="text"
                  class="form-input"
                  placeholder="500+"
                />
              </div>
              <div>
                <label class="form-label">Stats Label</label>
                <input
                  v-model="heroForm.statsLabel"
                  type="text"
                  class="form-input"
                  placeholder="Projects Completed"
                />
              </div>
            </div>
            
            <!-- Hero Image Preview -->
            <div v-if="heroForm.heroImage" class="mt-4">
              <label class="form-label">Image Preview</label>
              <div class="w-full h-48 rounded-lg shadow-md overflow-hidden bg-gray-200 border-2 border-dashed border-gray-300">
                <img
                  :src="heroForm.heroImage"
                  alt="Hero image preview"
                  class="w-full h-full object-cover"
                  @error="handlePreviewError"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="updateHero" class="btn-primary">
            Update Hero Section
          </button>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Services Section</h2>
      </div>
      <div class="p-6">
        <!-- Services Header -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <label class="form-label">Section Title</label>
            <input
              v-model="servicesHeaderForm.title"
              type="text"
              class="form-input"
              placeholder="Our Core Services"
            />
          </div>
          <div>
            <label class="form-label">Section Description</label>
            <textarea
              v-model="servicesHeaderForm.description"
              rows="3"
              class="form-textarea"
              placeholder="We specialize in three key areas..."
            ></textarea>
          </div>
        </div>
        
        <!-- Services List -->
        <div class="space-y-6">
          <div v-for="(service, index) in servicesForm" :key="service.id" class="border rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Service {{ index + 1 }}</h3>
              <button
                @click="removeService(service.id)"
                class="text-red-600 hover:text-red-700"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Title</label>
                <input
                  v-model="service.title"
                  type="text"
                  class="form-input"
                  placeholder="Service Title"
                />
              </div>
              <div>
                <label class="form-label">Icon</label>
                <select v-model="service.icon" class="form-input">
                  <option value="BuildingOfficeIcon">Building Office</option>
                  <option value="WrenchScrewdriverIcon">Wrench Screwdriver</option>
                  <option value="HomeIcon">Home</option>
                </select>
              </div>
              <div class="lg:col-span-2">
                <label class="form-label">Description</label>
                <textarea
                  v-model="service.description"
                  rows="2"
                  class="form-textarea"
                  placeholder="Service description"
                ></textarea>
              </div>
              <div class="lg:col-span-2">
                <label class="form-label">Features (one per line)</label>
                <textarea
                  :value="service.features.join('\n')"
                  @input="updateServiceFeatures(service.id, $event)"
                  rows="4"
                  class="form-textarea"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-between">
          <button @click="addService" class="btn-secondary">
            <PlusIcon class="w-5 h-5 mr-2" />
            Add Service
          </button>
          <button @click="updateServices" class="btn-primary">
            Update Services
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Statistics Section</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(stat, index) in statsForm" :key="stat.id" class="border rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Stat {{ index + 1 }}</h3>
              <button
                @click="removeStat(stat.id)"
                class="text-red-600 hover:text-red-700"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="space-y-4">
              <div>
                <label class="form-label">Value</label>
                <input
                  v-model="stat.value"
                  type="text"
                  class="form-input"
                  placeholder="500+"
                />
              </div>
              <div>
                <label class="form-label">Label</label>
                <input
                  v-model="stat.label"
                  type="text"
                  class="form-input"
                  placeholder="Projects Completed"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-between">
          <button @click="addStat" class="btn-secondary">
            <PlusIcon class="w-5 h-5 mr-2" />
            Add Stat
          </button>
          <button @click="updateStats" class="btn-primary">
            Update Statistics
          </button>
        </div>
      </div>
    </div>

    <!-- Gallery Images Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Gallery Images</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(image, index) in galleryForm" :key="image.id" class="border rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Image {{ index + 1 }}</h3>
              <button
                @click="removeGalleryImage(image.id)"
                class="text-red-600 hover:text-red-700"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="space-y-4">
              <div>
                <label class="form-label">Image URL</label>
                <input
                  v-model="image.url"
                  type="url"
                  class="form-input"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label class="form-label">Alt Text</label>
                <input
                  v-model="image.alt"
                  type="text"
                  class="form-input"
                  placeholder="Image description"
                />
              </div>
              <!-- Image Preview -->
              <div v-if="image.url" class="mt-2">
                <div class="w-full h-32 rounded-lg shadow-sm overflow-hidden bg-gray-200 border border-gray-300">
                  <img
                    :src="image.url"
                    :alt="image.alt"
                    class="w-full h-full object-cover"
                    @error="handleGalleryPreviewError"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-between">
          <button @click="addGalleryImage" class="btn-secondary">
            <PlusIcon class="w-5 h-5 mr-2" />
            Add Image
          </button>
          <button @click="updateGallery" class="btn-primary">
            Update Gallery
          </button>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Call-to-Action Section</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="form-label">CTA Title</label>
            <input
              v-model="ctaForm.title"
              type="text"
              class="form-input"
              placeholder="Ready to Start Your Project?"
            />
          </div>
          <div>
            <label class="form-label">CTA Description</label>
            <textarea
              v-model="ctaForm.description"
              rows="3"
              class="form-textarea"
              placeholder="Get in touch with us today..."
            ></textarea>
          </div>
          <div>
            <label class="form-label">Primary Button Text</label>
            <input
              v-model="ctaForm.primaryButtonText"
              type="text"
              class="form-input"
              placeholder="Get Free Quote"
            />
          </div>
          <div>
            <label class="form-label">Secondary Button Text</label>
            <input
              v-model="ctaForm.secondaryButtonText"
              type="text"
              class="form-input"
              placeholder="View Portfolio"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="updateCTA" class="btn-primary">
            Update CTA Section
          </button>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50">
      <div class="flex items-center">
        <CheckIcon class="w-5 h-5 mr-2" />
        Changes saved successfully!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import {
  EyeIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import { useHomeStore, type Service, type Stat, type GalleryImage } from '../../store/home'

const homeStore = useHomeStore()
const showSuccess = ref(false)

// Forms
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

const servicesHeaderForm = reactive({
  title: '',
  description: ''
})

const servicesForm = ref<Service[]>([])
const statsForm = ref<Stat[]>([])
const galleryForm = ref<GalleryImage[]>([])

const ctaForm = reactive({
  title: '',
  description: '',
  primaryButtonText: '',
  secondaryButtonText: ''
})

// Initialize forms
onMounted(() => {
  loadCurrentContent()
})

const loadCurrentContent = () => {
  // Load hero content
  Object.assign(heroForm, homeStore.heroContent)
  
  // Load services content
  Object.assign(servicesHeaderForm, homeStore.servicesSection)
  servicesForm.value = [...homeStore.services]
  
  // Load stats
  statsForm.value = [...homeStore.stats]
  
  // Load gallery
  galleryForm.value = [...homeStore.galleryImages]
  
  // Load CTA content
  Object.assign(ctaForm, homeStore.ctaContent)
}

// Hero section methods
const updateHero = () => {
  homeStore.updateHeroContent(heroForm)
  showSuccessMessage()
}

const handlePreviewError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800'
}

// Services section methods
const updateServiceFeatures = (serviceId: string, event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const features = target.value.split('\n').filter(f => f.trim())
  const service = servicesForm.value.find(s => s.id === serviceId)
  if (service) {
    service.features = features
  }
}

const addService = () => {
  const newService: Service = {
    id: Date.now().toString(),
    title: 'New Service',
    description: 'Service description',
    icon: 'HomeIcon',
    features: ['Feature 1', 'Feature 2']
  }
  servicesForm.value.push(newService)
}

const removeService = (serviceId: string) => {
  servicesForm.value = servicesForm.value.filter(s => s.id !== serviceId)
}

const updateServices = () => {
  homeStore.updateServicesSection(servicesHeaderForm)
  
  // Update each service
  servicesForm.value.forEach(service => {
    homeStore.updateService(service.id, service)
  })
  
  // Remove services that were deleted
  homeStore.services.forEach(existingService => {
    if (!servicesForm.value.find(s => s.id === existingService.id)) {
      homeStore.removeService(existingService.id)
    }
  })
  
  // Add new services
  servicesForm.value.forEach(service => {
    if (!homeStore.services.find(s => s.id === service.id)) {
      homeStore.addService(service)
    }
  })
  
  showSuccessMessage()
}

// Stats section methods
const addStat = () => {
  const newStat: Stat = {
    id: Date.now().toString(),
    value: '0',
    label: 'New Stat'
  }
  statsForm.value.push(newStat)
}

const removeStat = (statId: string) => {
  statsForm.value = statsForm.value.filter(s => s.id !== statId)
}

const updateStats = () => {
  // Update each stat
  statsForm.value.forEach(stat => {
    homeStore.updateStat(stat.id, stat)
  })
  
  // Remove stats that were deleted
  homeStore.stats.forEach(existingStat => {
    if (!statsForm.value.find(s => s.id === existingStat.id)) {
      homeStore.removeStat(existingStat.id)
    }
  })
  
  // Add new stats
  statsForm.value.forEach(stat => {
    if (!homeStore.stats.find(s => s.id === stat.id)) {
      homeStore.addStat(stat)
    }
  })
  
  showSuccessMessage()
}

// Gallery methods
const addGalleryImage = () => {
  const newImage: GalleryImage = {
    id: Date.now().toString(),
    url: '',
    alt: 'New image'
  }
  galleryForm.value.push(newImage)
}

const removeGalleryImage = (imageId: string) => {
  galleryForm.value = galleryForm.value.filter(img => img.id !== imageId)
}

const updateGallery = () => {
  // Update each image
  galleryForm.value.forEach(image => {
    homeStore.updateGalleryImage(image.id, image)
  })
  
  // Remove images that were deleted
  homeStore.galleryImages.forEach(existingImage => {
    if (!galleryForm.value.find(img => img.id === existingImage.id)) {
      homeStore.removeGalleryImage(existingImage.id)
    }
  })
  
  // Add new images
  galleryForm.value.forEach(image => {
    if (!homeStore.galleryImages.find(img => img.id === image.id)) {
      homeStore.addGalleryImage(image)
    }
  })
  
  showSuccessMessage()
}

const handleGalleryPreviewError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400'
}

// CTA section methods
const updateCTA = () => {
  homeStore.updateCTAContent(ctaForm)
  showSuccessMessage()
}

// General methods
const saveAllChanges = () => {
  updateHero()
  updateServices()
  updateStats()
  updateGallery()
  updateCTA()
  showSuccessMessage()
}

const showSuccessMessage = () => {
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

// Watch for changes in store to update forms
watch(() => homeStore.heroContent, loadCurrentContent, { deep: true })
</script>