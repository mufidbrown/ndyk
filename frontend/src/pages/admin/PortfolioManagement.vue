<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Portfolio Management</h1>
        <p class="text-gray-600 mt-2">Manage your portfolio projects and categories</p>
      </div>
      <button
        @click="showProjectModal = true"
        class="btn-primary"
      >
        <PlusIcon class="w-5 h-5 mr-2" />
        Add New Project
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center">
          <DocumentTextIcon class="w-8 h-8 text-blue-600" />
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ portfolioStore.projects.length }}</p>
            <p class="text-sm text-gray-500">Total Projects</p>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <div class="flex items-center">
          <CheckIcon class="w-8 h-8 text-green-600" />
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ activeProjects }}</p>
            <p class="text-sm text-gray-500">Active Projects</p>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <div class="flex items-center">
          <TagIcon class="w-8 h-8 text-purple-600" />
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ portfolioStore.categories.length - 1 }}</p>
            <p class="text-sm text-gray-500">Categories</p>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <div class="flex items-center">
          <EyeIcon class="w-8 h-8 text-orange-600" />
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">1,234</p>
            <p class="text-sm text-gray-500">Total Views</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-6 mb-8">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            v-model="searchQuery"
            class="form-input"
          />
        </div>
        <div>
          <select v-model="filterCategory" class="form-select">
            <option value="all">All Categories</option>
            <option v-for="category in portfolioStore.categories.slice(1)" :key="category.key" :value="category.key">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="filterStatus" class="form-select">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Projects Table -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Projects</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="project in filteredProjects" :key="project.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img class="h-12 w-12 rounded-lg object-cover" :src="project.image" :alt="project.title" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ project.title }}</div>
                    <div class="text-sm text-gray-500">{{ project.year }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {{ project.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ project.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ project.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(project.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="editProject(project)"
                    class="text-primary-600 hover:text-primary-900"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(project)"
                    class="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Project Modal -->
    <div v-if="showProjectModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeModal">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        
        <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full" @click.stop>
          <form @submit.prevent="saveProject">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {{ editingProject ? 'Edit Project' : 'Add New Project' }}
                  </h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        v-model="projectForm.title"
                        required
                        class="form-input"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select v-model="projectForm.categoryKey" required class="form-select">
                        <option value="">Select Category</option>
                        <option v-for="category in portfolioStore.categories.slice(1)" :key="category.key" :value="category.key">
                          {{ category.name }}
                        </option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select v-model="projectForm.status" required class="form-select">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        v-model="projectForm.location"
                        required
                        class="form-input"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      <input
                        type="text"
                        v-model="projectForm.year"
                        required
                        class="form-input"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        v-model="projectForm.duration"
                        required
                        class="form-input"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <input
                        type="url"
                        v-model="projectForm.image"
                        required
                        class="form-input"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                      <textarea
                        v-model="projectForm.description"
                        required
                        rows="3"
                        class="form-textarea"
                      ></textarea>
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                      <textarea
                        v-model="projectForm.fullDescription"
                        required
                        rows="4"
                        class="form-textarea"
                      ></textarea>
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        v-model="featuresText"
                        rows="4"
                        class="form-textarea"
                        placeholder="Enter features, one per line"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                class="btn-primary sm:ml-3"
              >
                {{ editingProject ? 'Update Project' : 'Add Project' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="btn-secondary mt-3 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="projectToDelete" class="fixed inset-0 z-50 overflow-y-auto" @click="projectToDelete = null">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        
        <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Delete Project
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete "{{ projectToDelete.title }}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteProjectConfirmed"
              class="btn-danger sm:ml-3"
            >
              Delete
            </button>
            <button
              type="button"
              @click="projectToDelete = null"
              class="btn-secondary mt-3 sm:mt-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  CheckIcon,
  TagIcon,
  EyeIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { usePortfolioStore, type Project } from '../../store/portfolio'

const portfolioStore = usePortfolioStore()

const searchQuery = ref('')
const filterCategory = ref('all')
const filterStatus = ref('all')
const showProjectModal = ref(false)
const editingProject = ref<Project | null>(null)
const projectToDelete = ref<Project | null>(null)

const projectForm = reactive({
  title: '',
  description: '',
  fullDescription: '',
  categoryKey: '',
  category: '',
  image: '',
  location: '',
  year: '',
  duration: '',
  status: 'active' as 'active' | 'inactive'
})

const featuresText = ref('')

const activeProjects = computed(() => {
  return portfolioStore.projects.filter(p => p.status === 'active').length
})

const filteredProjects = computed(() => {
  let projects = portfolioStore.projects

  if (searchQuery.value) {
    projects = projects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterCategory.value !== 'all') {
    projects = projects.filter(p => p.categoryKey === filterCategory.value)
  }

  if (filterStatus.value !== 'all') {
    projects = projects.filter(p => p.status === filterStatus.value)
  }

  return projects
})

const resetForm = () => {
  Object.assign(projectForm, {
    title: '',
    description: '',
    fullDescription: '',
    categoryKey: '',
    category: '',
    image: '',
    location: '',
    year: '',
    duration: '',
    status: 'active' as 'active' | 'inactive'
  })
  featuresText.value = ''
  editingProject.value = null
}

const editProject = (project: Project) => {
  editingProject.value = project
  Object.assign(projectForm, {
    title: project.title,
    description: project.description,
    fullDescription: project.fullDescription,
    categoryKey: project.categoryKey,
    category: project.category,
    image: project.image,
    location: project.location,
    year: project.year,
    duration: project.duration,
    status: project.status
  })
  featuresText.value = project.features.join('\n')
  showProjectModal.value = true
}

const saveProject = () => {
  const categoryObj = portfolioStore.categories.find(c => c.key === projectForm.categoryKey)
  const features = featuresText.value.split('\n').filter(f => f.trim().length > 0)
  
  const projectData = {
    ...projectForm,
    category: categoryObj?.name || '',
    features
  }

  if (editingProject.value) {
    portfolioStore.updateProject(editingProject.value.id, projectData)
  } else {
    portfolioStore.addProject(projectData)
  }

  closeModal()
}

const closeModal = () => {
  showProjectModal.value = false
  resetForm()
}

const confirmDelete = (project: Project) => {
  projectToDelete.value = project
}

const deleteProjectConfirmed = () => {
  if (projectToDelete.value) {
    portfolioStore.deleteProject(projectToDelete.value.id)
    projectToDelete.value = null
  }
}
</script>