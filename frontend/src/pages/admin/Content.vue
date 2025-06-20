<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
        <p class="text-gray-600">Manage all website content from this central dashboard.</p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">
        <PlusIcon class="w-5 h-5 mr-2" />
        Add Content
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-4 mb-6">
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search content..."
            class="input-field"
          />
        </div>
        <div>
          <select v-model="selectedType" class="input-field">
            <option value="">All Types</option>
            <option value="hero">Hero Sections</option>
            <option value="about">About Content</option>
            <option value="service">Services</option>
            <option value="portfolio">Portfolio</option>
            <option value="testimonial">Testimonials</option>
          </select>
        </div>
        <div>
          <select v-model="selectedStatus" class="input-field">
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Content Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredContent" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div v-if="item.imageUrl" class="flex-shrink-0 h-12 w-12">
                    <img :src="item.imageUrl" :alt="item.title" class="h-12 w-12 rounded-lg object-cover" />
                  </div>
                  <div :class="item.imageUrl ? 'ml-4' : ''">
                    <div class="text-sm font-medium text-gray-900">{{ item.title }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ item.content }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getTypeColor(item.type)">
                  {{ formatType(item.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ item.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(item.updatedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button @click="editContent(item)" class="text-primary-600 hover:text-primary-900">
                  <PencilIcon class="w-4 h-4" />
                </button>
                <button @click="toggleStatus(item)" class="text-yellow-600 hover:text-yellow-900">
                  <EyeIcon v-if="!item.isActive" class="w-4 h-4" />
                  <EyeSlashIcon v-else class="w-4 h-4" />
                </button>
                <button @click="deleteContent(item)" class="text-red-600 hover:text-red-900">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingContent" class="fixed inset-0 z-50 overflow-y-auto" @click="closeModal">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <div class="relative bg-white rounded-lg max-w-2xl w-full shadow-xl" @click.stop>
          <div class="flex items-center justify-between p-6 border-b">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingContent ? 'Edit Content' : 'Create New Content' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
          
          <form @submit.prevent="saveContent" class="p-6 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select v-model="contentForm.type" required class="input-field">
                  <option value="">Select type</option>
                  <option value="hero">Hero Section</option>
                  <option value="about">About Content</option>
                  <option value="service">Service</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="testimonial">Testimonial</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input v-model.number="contentForm.order" type="number" min="0" class="input-field" />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input v-model="contentForm.title" type="text" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea v-model="contentForm.content" rows="4" required class="input-field"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input v-model="contentForm.imageUrl" type="url" class="input-field" />
            </div>
            
            <div class="flex items-center">
              <input v-model="contentForm.isActive" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label class="ml-2 block text-sm text-gray-900">Active</label>
            </div>
            
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeModal" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" :disabled="contentStore.isLoading" class="btn-primary">
                {{ editingContent ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useContentStore, type ContentItem } from '../../store/content'
import { useToast } from 'vue-toastification'

const contentStore = useContentStore()
const toast = useToast()

const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const showCreateModal = ref(false)
const editingContent = ref<ContentItem | null>(null)

const contentForm = ref({
  type: '',
  title: '',
  content: '',
  imageUrl: '',
  order: 0,
  isActive: true
})

const mockContent: ContentItem[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Welcome to ContractorPro',
    content: 'Building dreams with quality and expertise',
    imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
    order: 1,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    type: 'service',
    title: 'Civil Construction',
    content: 'Complete civil engineering solutions for residential and commercial projects',
    imageUrl: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
    order: 1,
    isActive: true,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    type: 'portfolio',
    title: 'Modern Residential Complex',
    content: 'Complete construction of a 50-unit residential complex',
    imageUrl: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=400',
    order: 1,
    isActive: true,
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-15T13:20:00Z'
  }
]

const filteredContent = computed(() => {
  let filtered = mockContent

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(item => item.type === selectedType.value)
  }

  if (selectedStatus.value !== '') {
    filtered = filtered.filter(item => item.isActive.toString() === selectedStatus.value)
  }

  return filtered.sort((a, b) => a.order - b.order)
})

const getTypeColor = (type: string) => {
  const colors = {
    hero: 'bg-blue-100 text-blue-800',
    about: 'bg-green-100 text-green-800',
    service: 'bg-purple-100 text-purple-800',
    portfolio: 'bg-yellow-100 text-yellow-800',
    testimonial: 'bg-pink-100 text-pink-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const formatType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const editContent = (content: ContentItem) => {
  editingContent.value = content
  contentForm.value = {
    type: content.type,
    title: content.title,
    content: content.content,
    imageUrl: content.imageUrl || '',
    order: content.order,
    isActive: content.isActive
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingContent.value = null
  contentForm.value = {
    type: '',
    title: '',
    content: '',
    imageUrl: '',
    order: 0,
    isActive: true
  }
}

const saveContent = async () => {
  try {
    if (editingContent.value) {
      // Update existing content
      toast.success('Content updated successfully!')
    } else {
      // Create new content
      toast.success('Content created successfully!')
    }
    closeModal()
  } catch (error) {
    toast.error('Failed to save content')
  }
}

const toggleStatus = async (content: ContentItem) => {
  try {
    toast.success(`Content ${content.isActive ? 'deactivated' : 'activated'} successfully!`)
  } catch (error) {
    toast.error('Failed to update content status')
  }
}

const deleteContent = async (content: ContentItem) => {
  if (confirm('Are you sure you want to delete this content?')) {
    try {
      toast.success('Content deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete content')
    }
  }
}

onMounted(() => {
  // In real implementation, fetch content from store
  // contentStore.fetchContent()
})
</script>