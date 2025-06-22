<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">About Page Content</h1>
          <p class="text-gray-600">
            Manage all content sections of your About page
          </p>
        </div>
        <div class="flex space-x-3">
          <button @click="resetChanges" class="btn-secondary">
            Reset Changes
          </button>
          <button @click="saveAllChanges" :disabled="aboutStore.isLoading" class="btn-primary">
            <span v-if="aboutStore.isLoading" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save All Changes</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="showSuccessMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      Changes saved successfully!
    </div>
    
    <div v-if="aboutStore.error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ aboutStore.error }}
    </div>

    <!-- Navigation Tabs -->
    <div class="border-b border-gray-200 mb-8">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.key ? 'tab-active' : 'tab-inactive'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5 mr-2 inline" />
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="space-y-8">
      <!-- Hero Section -->
      <div v-if="activeTab === 'hero'" class="card p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Hero Section</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              v-model="editableContent.hero.title"
              type="text"
              class="form-input"
              placeholder="Enter page title"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <textarea
              v-model="editableContent.hero.subtitle"
              rows="3"
              class="form-textarea"
              placeholder="Enter subtitle"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Our Story Section -->
      <div v-if="activeTab === 'story'" class="card p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Our Story Section</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              v-model="editableContent.story.title"
              type="text"
              class="form-input"
              placeholder="Enter section title"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Story Paragraphs</label>
            <div class="space-y-3">
              <div v-for="(paragraph, index) in editableContent.story.paragraphs" :key="index" class="flex items-start space-x-2">
                <textarea
                  v-model="editableContent.story.paragraphs[index]"
                  rows="3"
                  class="form-textarea flex-1"
                  :placeholder="`Paragraph ${index + 1}`"
                ></textarea>
                <button
                  @click="removeStoryParagraph(index)"
                  class="btn-danger px-3 py-2 text-sm"
                  :disabled="editableContent.story.paragraphs.length <= 1"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
            <button @click="addStoryParagraph" class="mt-3 btn-secondary text-sm">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Paragraph
            </button>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Story Image URL</label>
            <input
              v-model="editableContent.story.image"
              type="url"
              class="form-input"
              placeholder="Enter image URL"
            />
            <div v-if="editableContent.story.image" class="mt-3">
              <img :src="editableContent.story.image" alt="Story preview" class="w-32 h-32 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mission & Vision Section -->
      <div v-if="activeTab === 'mission-vision'" class="card p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Mission & Vision</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Vision</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="editableContent.missionVision.vision.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter vision title"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="editableContent.missionVision.vision.description"
                  rows="4"
                  class="form-textarea"
                  placeholder="Enter vision description"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Mission</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="editableContent.missionVision.mission.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter mission title"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="editableContent.missionVision.mission.description"
                  rows="4"
                  class="form-textarea"
                  placeholder="Enter mission description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div v-if="activeTab === 'values'" class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Core Values</h2>
          <button @click="addValue" class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add Value
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(value, index) in editableContent.values" :key="value.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Value {{ index + 1 }}</h3>
              <button
                @click="removeValue(value.id)"
                class="btn-danger px-3 py-2 text-sm"
                :disabled="editableContent.values.length <= 1"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="value.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter value title"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="value.description"
                  rows="3"
                  class="form-textarea"
                  placeholder="Enter value description"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select v-model="value.icon" class="form-input">
                  <option value="ShieldCheckIcon">Shield Check (Quality)</option>
                  <option value="UserGroupIcon">User Group (Teamwork)</option>
                  <option value="ClockIcon">Clock (Reliability)</option>
                  <option value="StarIcon">Star (Excellence)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div v-if="activeTab === 'team'" class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Team Members</h2>
          <button @click="addTeamMember" class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add Team Member
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="(member, index) in editableContent.team" :key="member.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Member {{ index + 1 }}</h3>
              <button
                @click="removeTeamMember(member.id)"
                class="btn-danger px-3 py-2 text-sm"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  v-model="member.name"
                  type="text"
                  class="form-input"
                  placeholder="Enter member name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  v-model="member.role"
                  type="text"
                  class="form-input"
                  placeholder="Enter member role"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="member.description"
                  rows="3"
                  class="form-textarea"
                  placeholder="Enter member description"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                <input
                  v-model="member.image"
                  type="url"
                  class="form-input"
                  placeholder="Enter photo URL"
                />
                <div v-if="member.image" class="mt-3">
                  <img :src="member.image" alt="Member preview" class="w-16 h-16 object-cover rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Awards Section -->
      <div v-if="activeTab === 'awards'" class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Awards & Certifications</h2>
          <button @click="addAward" class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add Award
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(award, index) in editableContent.awards" :key="award.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Award {{ index + 1 }}</h3>
              <button
                @click="removeAward(award.id)"
                class="btn-danger px-3 py-2 text-sm"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  v-model="award.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter award title"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  v-model="award.year"
                  type="text"
                  class="form-input"
                  placeholder="Enter year"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import {
  HomeIcon,
  DocumentTextIcon,
  EyeIcon,
  HeartIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import { useAboutStore } from '../../store/about'
import type { AboutContent, AboutValue, AboutTeamMember, AboutAward } from '../../store/about'

const aboutStore = useAboutStore()
const activeTab = ref('hero')
const showSuccessMessage = ref(false)

// Create editable copy of the content
const editableContent = reactive<AboutContent>(JSON.parse(JSON.stringify(aboutStore.content)))

const tabs = [
  { key: 'hero', name: 'Hero Section', icon: HomeIcon },
  { key: 'story', name: 'Our Story', icon: DocumentTextIcon },
  { key: 'mission-vision', name: 'Mission & Vision', icon: EyeIcon },
  { key: 'values', name: 'Core Values', icon: StarIcon },
  { key: 'team', name: 'Team', icon: UsersIcon },
  { key: 'awards', name: 'Awards', icon: TrophyIcon }
]

// Story paragraphs management
const addStoryParagraph = () => {
  editableContent.story.paragraphs.push('')
}

const removeStoryParagraph = (index: number) => {
  if (editableContent.story.paragraphs.length > 1) {
    editableContent.story.paragraphs.splice(index, 1)
  }
}

// Values management
const addValue = () => {
  const newValue: AboutValue = {
    id: Date.now().toString(),
    title: '',
    description: '',
    icon: 'StarIcon'
  }
  editableContent.values.push(newValue)
}

const removeValue = (id: string) => {
  if (editableContent.values.length > 1) {
    const index = editableContent.values.findIndex(v => v.id === id)
    if (index > -1) {
      editableContent.values.splice(index, 1)
    }
  }
}

// Team management
const addTeamMember = () => {
  const newMember: AboutTeamMember = {
    id: Date.now().toString(),
    name: '',
    role: '',
    description: '',
    image: ''
  }
  editableContent.team.push(newMember)
}

const removeTeamMember = (id: string) => {
  const index = editableContent.team.findIndex(m => m.id === id)
  if (index > -1) {
    editableContent.team.splice(index, 1)
  }
}

// Awards management
const addAward = () => {
  const newAward: AboutAward = {
    id: Date.now().toString(),
    title: '',
    year: new Date().getFullYear().toString()
  }
  editableContent.awards.push(newAward)
}

const removeAward = (id: string) => {
  const index = editableContent.awards.findIndex(a => a.id === id)
  if (index > -1) {
    editableContent.awards.splice(index, 1)
  }
}

// Save changes
const saveAllChanges = async () => {
  try {
    // Update store with editable content
    aboutStore.updateHero(editableContent.hero)
    aboutStore.updateStory(editableContent.story)
    aboutStore.updateMissionVision(editableContent.missionVision)
    aboutStore.updateValues(editableContent.values)
    aboutStore.updateTeam(editableContent.team)
    aboutStore.updateAwards(editableContent.awards)
    
    await aboutStore.saveContent()
    
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to save changes:', error)
  }
}

// Reset changes
const resetChanges = () => {
  if (confirm('Are you sure you want to reset all changes? This action cannot be undone.')) {
    Object.assign(editableContent, JSON.parse(JSON.stringify(aboutStore.content)))
  }
}
</script>