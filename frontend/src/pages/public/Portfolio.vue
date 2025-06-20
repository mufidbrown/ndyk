<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          Our Portfolio
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Discover our completed projects and see the quality of work that sets us apart.
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="flex flex-wrap justify-center space-x-1">
          <button
            v-for="category in categories"
            :key="category.key"
            @click="activeCategory = category.key"
            class="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
            :class="activeCategory === category.key 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group cursor-pointer"
            @click="selectedProject = project"
          >
            <div class="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div class="relative h-64 overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <EyeIcon class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="inline-block px-3 py-1 text-xs font-medium bg-primary-100 text-primary-600 rounded-full">
                    {{ project.category }}
                  </span>
                  <span class="text-sm text-gray-500">{{ project.year }}</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ project.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-900">{{ project.location }}</span>
                  <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Load More Button -->
        <div class="text-center mt-12">
          <button class="btn-primary">
            Load More Projects
            <ArrowDownIcon class="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Project Statistics</h2>
          <p class="text-lg text-gray-600">Numbers that showcase our expertise and commitment.</p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-4xl font-bold text-primary-600 mb-2">{{ stat.value }}</div>
            <div class="text-gray-600 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Detail Modal -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="selectedProject = null"
    >
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <div
          class="relative bg-white rounded-lg max-w-4xl w-full shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between p-6 border-b">
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedProject.title }}</h3>
            <button
              @click="selectedProject = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  :src="selectedProject.image"
                  :alt="selectedProject.title"
                  class="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <div class="space-y-4">
                  <div class="flex items-center space-x-4">
                    <span class="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-600 rounded-full">
                      {{ selectedProject.category }}
                    </span>
                    <span class="text-gray-500">{{ selectedProject.year }}</span>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Project Details</h4>
                    <p class="text-gray-600">{{ selectedProject.fullDescription }}</p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul class="space-y-1">
                      <li v-for="feature in selectedProject.features" :key="feature" class="flex items-center text-gray-600">
                        <CheckIcon class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <h5 class="font-medium text-gray-900">Location</h5>
                      <p class="text-gray-600">{{ selectedProject.location }}</p>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Duration</h5>
                      <p class="text-gray-600">{{ selectedProject.duration }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'

const activeCategory = ref('all')
const selectedProject = ref(null)

const categories = [
  { key: 'all', name: 'All Projects' },
  { key: 'civil', name: 'Civil Construction' },
  { key: 'plumbing', name: 'Plumbing' },
  { key: 'interior', name: 'Interior Design' }
]

const projects = [
  {
    id: 1,
    title: 'Modern Residential Complex',
    description: 'Complete construction of a 50-unit residential complex with modern amenities.',
    fullDescription: 'This project involved the complete construction of a modern residential complex featuring 50 units across 5 buildings. The project included foundation work, structural construction, plumbing, electrical, and interior finishing.',
    category: 'Civil Construction',
    categoryKey: 'civil',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Downtown District',
    year: '2023',
    duration: '18 months',
    features: [
      'Reinforced concrete structure',
      'Modern architectural design',
      'Energy-efficient systems',
      'Underground parking',
      'Landscaped gardens'
    ]
  },
  {
    id: 2,
    title: 'Luxury Hotel Plumbing System',
    description: 'Complete plumbing installation for a 200-room luxury hotel.',
    fullDescription: 'Comprehensive plumbing system installation for a luxury hotel including water supply, drainage, fire protection systems, and spa facilities. The project required precision and adherence to hospitality industry standards.',
    category: 'Plumbing',
    categoryKey: 'plumbing',
    image: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Business District',
    year: '2023',
    duration: '12 months',
    features: [
      'Multi-zone water systems',
      'Advanced drainage solutions',
      'Fire suppression systems',
      'Spa facility plumbing',
      'Emergency backup systems'
    ]
  },
  {
    id: 3,
    title: 'Executive Office Interior',
    description: 'Complete interior design and renovation of a corporate headquarters.',
    fullDescription: 'Full interior design and renovation project for a corporate headquarters spanning 10,000 sq ft. The design focused on creating a modern, functional workspace that promotes productivity and collaboration.',
    category: 'Interior Design',
    categoryKey: 'interior',
    image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Financial District',
    year: '2022',
    duration: '8 months',
    features: [
      'Open concept workspace',
      'Executive meeting rooms',
      'Modern lighting systems',
      'Custom furniture design',
      'Smart building integration'
    ]
  },
  {
    id: 4,
    title: 'Infrastructure Development',
    description: 'Road construction and utility installation for new development.',
    fullDescription: 'Major infrastructure project involving road construction, utility installation, and drainage systems for a new residential development. The project required coordination with multiple municipal departments.',
    category: 'Civil Construction',
    categoryKey: 'civil',
    image: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Suburban Area',
    year: '2022',
    duration: '24 months',
    features: [
      'Road construction',
      'Utility installation',
      'Storm drainage systems',
      'Street lighting',
      'Landscaping'
    ]
  },
  {
    id: 5,
    title: 'Restaurant Kitchen Systems',
    description: 'Commercial kitchen plumbing and utility installation.',
    fullDescription: 'Specialized plumbing and utility installation for a high-end restaurant kitchen. The project included grease traps, commercial dishwasher connections, and specialized drainage systems.',
    category: 'Plumbing',
    categoryKey: 'plumbing',
    image: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Entertainment District',
    year: '2022',
    duration: '6 months',
    features: [
      'Grease trap systems',
      'Commercial dishwasher plumbing',
      'Specialized drainage',
      'Gas line installation',
      'Water filtration systems'
    ]
  },
  {
    id: 6,
    title: 'Luxury Home Interior',
    description: 'Complete interior renovation of a luxury family home.',
    fullDescription: 'Comprehensive interior renovation of a 5,000 sq ft luxury home including kitchen, bathrooms, living areas, and bedrooms. The design emphasized elegance, comfort, and functionality.',
    category: 'Interior Design',
    categoryKey: 'interior',
    image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Upscale Neighborhood',
    year: '2021',
    duration: '10 months',
    features: [
      'Gourmet kitchen renovation',
      'Master suite redesign',
      'Custom built-ins',
      'Luxury bathroom fixtures',
      'Smart home integration'
    ]
  }
]

const stats = [
  { value: '500+', label: 'Completed Projects' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Expert Team Members' }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects
  }
  return projects.filter(project => project.categoryKey === activeCategory.value)
})
</script>