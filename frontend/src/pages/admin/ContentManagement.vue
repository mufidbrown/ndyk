<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Content Management</h1>
      <p class="text-gray-600 mt-2">Manage images, files, and other media content</p>
    </div>

    <!-- Image Upload Section -->
    <div class="card mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Image Management</h3>
      </div>
      <div class="p-6">
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <PhotoIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 mb-4">Upload images or enter image URLs</p>
          
          <div class="max-w-md mx-auto">
            <input
              type="url"
              v-model="newImageUrl"
              placeholder="Enter image URL"
              class="form-input mb-4"
            />
            <button
              @click="addImage"
              :disabled="!newImageUrl"
              class="btn-primary w-full"
            >
              Add Image
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Gallery -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Image Gallery</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="relative group aspect-square"
          >
            <img
              :src="image.url"
              :alt="image.name"
              class="w-full h-full object-cover rounded-lg"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                <button
                  @click="copyImageUrl(image.url)"
                  class="p-2 bg-white rounded-full text-gray-600 hover:text-primary-600"
                >
                  <DocumentDuplicateIcon class="w-4 h-4" />
                </button>
                <button
                  @click="deleteImage(index)"
                  class="p-2 bg-white rounded-full text-gray-600 hover:text-red-600"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="absolute bottom-2 left-2 right-2">
              <p class="text-xs text-white bg-black bg-opacity-50 rounded px-2 py-1 truncate">
                {{ image.name }}
              </p>
            </div>
          </div>
        </div>
        
        <div v-if="images.length === 0" class="text-center py-12">
          <PhotoIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">No images uploaded yet</p>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
      <div class="flex items-center">
        <CheckIcon class="w-5 h-5 mr-2" />
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  PhotoIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

interface ImageItem {
  url: string
  name: string
  uploadedAt: string
}

const newImageUrl = ref('')
const showSuccess = ref(false)
const successMessage = ref('')

const images = ref<ImageItem[]>([
  {
    url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Modern Residential Complex',
    uploadedAt: new Date().toISOString()
  },
  {
    url: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Luxury Hotel Interior',
    uploadedAt: new Date().toISOString()
  },
  {
    url: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Executive Office Space',
    uploadedAt: new Date().toISOString()
  }
])

const addImage = () => {
  if (newImageUrl.value) {
    const newImage: ImageItem = {
      url: newImageUrl.value,
      name: `Image ${images.value.length + 1}`,
      uploadedAt: new Date().toISOString()
    }
    
    images.value.unshift(newImage)
    newImageUrl.value = ''
    showSuccessMessage('Image added successfully!')
  }
}

const deleteImage = (index: number) => {
  if (confirm('Are you sure you want to delete this image?')) {
    images.value.splice(index, 1)
    showSuccessMessage('Image deleted successfully!')
  }
}

const copyImageUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    showSuccessMessage('Image URL copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy URL:', error)
  }
}

const showSuccessMessage = (message: string) => {
  successMessage.value = message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>