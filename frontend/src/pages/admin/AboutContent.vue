<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">About Page Content Management</h1>
      <p class="text-gray-600">
        Manage all content sections for the About page from one central location.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <button @click="saveContent" :disabled="saving" class="btn-primary">
        <span v-if="saving">Saving...</span>
        <span v-else>Save All Changes</span>
      </button>
      <button @click="resetContent" class="btn-secondary">
        Reset to Default
      </button>
      <router-link to="/about" class="btn-secondary">
        <EyeIcon class="w-5 h-5 mr-2" />
        Preview Page
      </router-link>
    </div>

    <div class="space-y-8">
      <!-- Hero Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <HomeIcon class="w-5 h-5 mr-2" />
            Hero Section
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="form-label">Hero Title</label>
            <input
              v-model="editableContent.hero.title"
              type="text"
              class="form-input"
              placeholder="Enter hero title"
            />
          </div>
          <div>
            <label class="form-label">Hero Subtitle</label>
            <textarea
              v-model="editableContent.hero.subtitle"
              rows="3"
              class="form-textarea"
              placeholder="Enter hero subtitle"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Our Story Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <DocumentTextIcon class="w-5 h-5 mr-2" />
            Our Story Section
          </h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="form-label">Section Title</label>
            <input
              v-model="editableContent.story.title"
              type="text"
              class="form-input"
              placeholder="Enter section title"
            />
          </div>
          <div>
            <label class="form-label">Story Image URL</label>
            <input
              v-model="editableContent.story.image"
              type="url"
              class="form-input"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label class="form-label">Story Paragraphs</label>
            <div class="space-y-3">
              <div v-for="(paragraph, index) in editableContent.story.paragraphs" :key="index" class="flex gap-2">
                <textarea
                  v-model="editableContent.story.paragraphs[index]"
                  rows="3"
                  class="form-textarea flex-1"
                  :placeholder="`Paragraph ${index + 1}`"
                ></textarea>
                <button
                  @click="removeStoryParagraph(index)"
                  class="btn-danger px-3 h-fit"
                  v-if="editableContent.story.paragraphs.length > 1"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
              <button @click="addStoryParagraph" class="btn-secondary">
                <PlusIcon class="w-4 h-4 mr-2" />
                Add Paragraph
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission & Vision -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <EyeIcon class="w-5 h-5 mr-2" />
            Mission & Vision
          </h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Mission -->
            <div class="space-y-4">
              <h4 class="text-md font-semibold text-gray-900">Mission</h4>
              <div>
                <label class="form-label">Title</label>
                <input
                  v-model="editableContent.mission.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter mission title"
                />
              </div>
              <div>
                <label class="form-label">Description</label>
                <textarea
                  v-model="editableContent.mission.description"
                  rows="4"
                  class="form-textarea"
                  placeholder="Enter mission description"
                ></textarea>
              </div>
              <div>
                <label class="form-label">Icon</label>
                <select v-model="editableContent.mission.icon" class="form-input">
                  <option value="HeartIcon">Heart Icon</option>
                  <option value="EyeIcon">Eye Icon</option>
                  <option value="StarIcon">Star Icon</option>
                  <option value="ShieldCheckIcon">Shield Check Icon</option>
                </select>
              </div>
            </div>

            <!-- Vision -->
            <div class="space-y-4">
              <h4 class="text-md font-semibold text-gray-900">Vision</h4>
              <div>
                <label class="form-label">Title</label>
                <input
                  v-model="editableContent.vision.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter vision title"
                />
              </div>
              <div>
                <label class="form-label">Description</label>
                <textarea
                  v-model="editableContent.vision.description"
                  rows="4"
                  class="form-textarea"
                  placeholder="Enter vision description"
                ></textarea>
              </div>
              <div>
                <label class="form-label">Icon</label>
                <select v-model="editableContent.vision.icon" class="form-input">
                  <option value="EyeIcon">Eye Icon</option>
                  <option value="HeartIcon">Heart Icon</option>
                  <option value="StarIcon">Star Icon</option>
                  <option value="ShieldCheckIcon">Shield Check Icon</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Company Values -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <StarIcon class="w-5 h-5 mr-2" />
            Company Values
          </h3>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <div v-for="(value, index) in editableContent.values" :key="index" class="border rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-md font-semibold text-gray-900">Value {{ index + 1 }}</h4>
                <button
                  @click="removeValue(index)"
                  class="btn-danger px-3 py-1 text-sm"
                  v-if="editableContent.values.length > 1"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="form-label">Title</label>
                  <input
                    v-model="value.title"
                    type="text"
                    class="form-input"
                    placeholder="Enter value title"
                  />
                </div>
                <div>
                  <label class="form-label">Icon</label>
                  <select v-model="value.icon" class="form-input">
                    <option value="ShieldCheckIcon">Shield Check</option>
                    <option value="UserGroupIcon">User Group</option>
                    <option value="ClockIcon">Clock</option>
                    <option value="StarIcon">Star</option>
                    <option value="HeartIcon">Heart</option>
                    <option value="EyeIcon">Eye</option>
                  </select>
                </div>
                <div class="md:col-span-3">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="value.description"
                    rows="2"
                    class="form-textarea"
                    placeholder="Enter value description"
                  ></textarea>
                </div>
              </div>
            </div>
            <button @click="addValue" class="btn-secondary">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Value
            </button>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <UsersIcon class="w-5 h-5 mr-2" />
            Team Members
          </h3>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <div v-for="(member, index) in editableContent.team" :key="index" class="border rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-md font-semibold text-gray-900">Team Member {{ index + 1 }}</h4>
                <button
                  @click="removeTeamMember(index)"
                  class="btn-danger px-3 py-1 text-sm"
                  v-if="editableContent.team.length > 1"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Name</label>
                  <input
                    v-model="member.name"
                    type="text"
                    class="form-input"
                    placeholder="Enter member name"
                  />
                </div>
                <div>
                  <label class="form-label">Role</label>
                  <input
                    v-model="member.role"
                    type="text"
                    class="form-input"
                    placeholder="Enter member role"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="member.description"
                    rows="2"
                    class="form-textarea"
                    placeholder="Enter member description"
                  ></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="form-label">Image URL</label>
                  <input
                    v-model="member.image"
                    type="url"
                    class="form-input"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>
            <button @click="addTeamMember" class="btn-secondary">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Team Member
            </button>
          </div>
        </div>
      </div>

      <!-- Awards Section -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 flex items-center">
            <TrophyIcon class="w-5 h-5 mr-2" />
            Awards & Certifications
          </h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(award, index) in editableContent.awards" :key="index" class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="form-label">Award Title</label>
                <input
                  v-model="award.title"
                  type="text"
                  class="form-input"
                  placeholder="Enter award title"
                />
              </div>
              <div class="w-32">
                <label class="form-label">Year</label>
                <input
                  v-model="award.year"
                  type="text"
                  class="form-input"
                  placeholder="Year"
                />
              </div>
              <button
                @click="removeAward(index)"
                class="btn-danger px-3 h-fit"
                v-if="editableContent.awards.length > 1"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
            <button @click="addAward" class="btn-secondary">
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Award
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Notification -->
    <div v-if="showSaveSuccess" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
      Content saved successfully!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeIcon,
  DocumentTextIcon,
  EyeIcon,
  StarIcon,
  UsersIcon,
  TrophyIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import { useAboutStore, type AboutContent } from '../../store/about'

const router = useRouter()
const aboutStore = useAboutStore()

const saving = ref(false)
const showSaveSuccess = ref(false)

const editableContent = reactive<AboutContent>({
  hero: { title: '', subtitle: '' },
  story: { title: '', paragraphs: [''], image: '' },
  mission: { title: '', description: '', icon: 'HeartIcon' },
  vision: { title: '', description: '', icon: 'EyeIcon' },
  values: [],
  team: [],
  awards: []
})

onMounted(() => {
  aboutStore.loadAboutContent()
  Object.assign(editableContent, JSON.parse(JSON.stringify(aboutStore.aboutContent)))
})

const saveContent = async () => {
  saving.value = true
  try {
    aboutStore.updateAboutContent(editableContent)
    showSaveSuccess.value = true
    setTimeout(() => {
      showSaveSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to save content:', error)
  } finally {
    saving.value = false
  }
}

const resetContent = () => {
  if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
    aboutStore.loadAboutContent()
    Object.assign(editableContent, JSON.parse(JSON.stringify(aboutStore.aboutContent)))
  }
}

// Story paragraphs management
const addStoryParagraph = () => {
  editableContent.story.paragraphs.push('')
}

const removeStoryParagraph = (index: number) => {
  editableContent.story.paragraphs.splice(index, 1)
}

// Values management
const addValue = () => {
  editableContent.values.push({
    title: '',
    description: '',
    icon: 'StarIcon'
  })
}

const removeValue = (index: number) => {
  editableContent.values.splice(index, 1)
}

// Team management
const addTeamMember = () => {
  editableContent.team.push({
    name: '',
    role: '',
    description: '',
    image: ''
  })
}

const removeTeamMember = (index: number) => {
  editableContent.team.splice(index, 1)
}

// Awards management
const addAward = () => {
  editableContent.awards.push({
    title: '',
    year: new Date().getFullYear().toString()
  })
}

const removeAward = (index: number) => {
  editableContent.awards.splice(index, 1)
}
</script>