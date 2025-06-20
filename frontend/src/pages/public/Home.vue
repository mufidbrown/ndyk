<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto section-padding py-24 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Building Your Dreams Into
              <span class="text-accent-400">Reality</span>
            </h1>
            <p class="text-xl text-primary-100 mb-8 leading-relaxed">
              Professional construction services specializing in civil engineering, 
              plumbing solutions, and stunning interior designs. Quality workmanship 
              guaranteed.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <router-link to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600 border-accent-500">
                Get Free Quote
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </router-link>
              <router-link to="/portfolio" class="btn-secondary bg-white text-primary-600 hover:bg-primary-50">
                View Our Work
              </router-link>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Construction site"
              class="rounded-lg shadow-2xl"
            />
            <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
              <div class="flex items-center space-x-4">
                <div class="bg-primary-100 p-3 rounded-full">
                  <CheckBadgeIcon class="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-900">500+</p>
                  <p class="text-gray-600">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in three key areas to provide comprehensive construction solutions for your projects.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title" class="group">
            <div class="card p-8 hover:shadow-xl transition-shadow duration-300">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <component :is="service.icon" class="w-8 h-8 text-primary-600" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ service.title }}</h3>
                <p class="text-gray-600 mb-6">{{ service.description }}</p>
                <ul class="text-left text-gray-600 space-y-2">
                  <li v-for="feature in service.features" :key="feature" class="flex items-center">
                    <CheckIcon class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-primary-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-600 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose ContractorPro?
            </h2>
            <p class="text-lg text-gray-600 mb-8">
              With years of experience and a commitment to excellence, we deliver 
              construction projects that exceed expectations.
            </p>
            
            <div class="space-y-6">
              <div v-for="feature in whyChooseUs" :key="feature.title" class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <component :is="feature.icon" class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
                  <p class="text-gray-600">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Construction work"
              class="rounded-lg shadow-lg"
            />
            <img
              src="https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Interior design"
              class="rounded-lg shadow-lg mt-8"
            />
            <img
              src="https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Plumbing work"
              class="rounded-lg shadow-lg -mt-8"
            />
            <img
              src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Project completion"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-900">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Start Your Project?
        </h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get in touch with us today for a free consultation and quote. 
          Let's bring your construction dreams to life.
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600">
            Get Free Quote
          </router-link>
          <router-link to="/portfolio" class="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
            View Portfolio
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  CheckBadgeIcon,
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const services = [
  {
    title: 'Civil Construction',
    description: 'Complete civil engineering solutions for residential and commercial projects.',
    icon: BuildingOfficeIcon,
    features: [
      'Foundation & Structural Work',
      'Road & Infrastructure',
      'Site Development',
      'Project Management'
    ]
  },
  {
    title: 'Plumbing Services',
    description: 'Professional plumbing installation, repair, and maintenance services.',
    icon: WrenchScrewdriverIcon,
    features: [
      'Installation & Repairs',
      'Drainage Systems',
      'Water Supply Systems',
      'Emergency Services'
    ]
  },
  {
    title: 'Interior Design',
    description: 'Transform your spaces with our expert interior design and renovation services.',
    icon: HomeIcon,
    features: [
      'Space Planning',
      'Custom Furniture',
      'Lighting Design',
      'Complete Renovations'
    ]
  }
]

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Expert Team' },
  { value: '100%', label: 'Client Satisfaction' }
]

const whyChooseUs = [
  {
    title: 'Expert Team',
    description: 'Our skilled professionals bring years of experience to every project.',
    icon: UserGroupIcon
  },
  {
    title: 'Quality Guarantee',
    description: 'We stand behind our work with comprehensive warranties and guarantees.',
    icon: ShieldCheckIcon
  },
  {
    title: 'On-Time Delivery',
    description: 'We respect your time and complete projects within agreed timelines.',
    icon: ClockIcon
  }
]
</script>