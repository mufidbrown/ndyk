<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          Our Services
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Comprehensive construction solutions tailored to meet your specific needs and requirements.
        </p>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div v-for="service in mainServices" :key="service.title" class="group">
            <div class="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div class="h-48 overflow-hidden">
                <img
                  :src="service.image"
                  :alt="service.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-8">
                <div class="flex items-center mb-4">
                  <component :is="service.icon" class="w-8 h-8 text-primary-600 mr-3" />
                  <h3 class="text-2xl font-bold text-gray-900">{{ service.title }}</h3>
                </div>
                <p class="text-gray-600 mb-6">{{ service.description }}</p>
                
                <div class="space-y-3 mb-6">
                  <h4 class="font-semibold text-gray-900">Key Services:</h4>
                  <ul class="space-y-2">
                    <li v-for="item in service.services" :key="item" class="flex items-center text-gray-600">
                      <CheckIcon class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                      {{ item }}
                    </li>
                  </ul>
                </div>
                
                <router-link to="/contact" class="btn-primary w-full justify-center">
                  Get Quote
                  <ArrowRightIcon class="w-5 h-5 ml-2" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Work Process</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We follow a systematic approach to ensure every project is completed successfully and on time.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in process" :key="step.title" class="text-center">
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-xl font-bold text-white">{{ index + 1 }}</span>
              </div>
              <div v-if="index < process.length - 1" class="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary-200 transform translate-x-1/2"></div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
          <p class="text-lg text-gray-600">
            We provide more than just construction - we deliver peace of mind.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="flex items-start">
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
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to Start Your Project?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Contact us today for a free consultation and detailed quote for your construction needs.
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600">
            Get Free Consultation
          </router-link>
          <a href="tel:+1234567890" class="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
            Call Now: (123) 456-7890
          </a>
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
  CheckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon
} from '@heroicons/vue/24/outline'

const mainServices = [
  {
    title: 'Civil Construction',
    description: 'Complete civil engineering and construction services for residential and commercial projects.',
    icon: BuildingOfficeIcon,
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      'Foundation & Structural Work',
      'Road & Infrastructure Development',
      'Site Preparation & Excavation',
      'Concrete Work & Masonry',
      'Project Management & Supervision'
    ]
  },
  {
    title: 'Plumbing Services',
    description: 'Professional plumbing solutions including installation, repair, and maintenance services.',
    icon: WrenchScrewdriverIcon,
    image: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      'Water Supply System Installation',
      'Drainage & Sewage Systems',
      'Pipe Installation & Repairs',
      'Bathroom & Kitchen Plumbing',
      '24/7 Emergency Services'
    ]
  },
  {
    title: 'Interior Design',
    description: 'Transform your spaces with our expert interior design and renovation services.',
    icon: HomeIcon,
    image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
    services: [
      'Space Planning & Design',
      'Custom Furniture & Fixtures',
      'Lighting Design & Installation',
      'Complete Home Renovations',
      'Commercial Interior Solutions'
    ]
  }
]

const process = [
  {
    title: 'Consultation',
    description: 'We meet with you to understand your needs, budget, and timeline.'
  },
  {
    title: 'Planning',
    description: 'Our team creates detailed plans and provides accurate cost estimates.'
  },
  {
    title: 'Execution',
    description: 'We begin work with regular updates and quality checkpoints.'
  },
  {
    title: 'Completion',
    description: 'Final inspection and handover with warranty and support.'
  }
]

const features = [
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed contractors with comprehensive insurance coverage.',
    icon: ShieldCheckIcon
  },
  {
    title: 'On-Time Delivery',
    description: 'We respect deadlines and deliver projects on schedule.',
    icon: ClockIcon
  },
  {
    title: 'Competitive Pricing',
    description: 'Fair and transparent pricing with no hidden costs.',
    icon: CurrencyDollarIcon
  },
  {
    title: 'Expert Team',
    description: 'Skilled professionals with years of industry experience.',
    icon: UserGroupIcon
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer support for emergencies.',
    icon: ChatBubbleLeftRightIcon
  },
  {
    title: 'Quality Materials',
    description: 'We use only premium materials from trusted suppliers.',
    icon: TruckIcon
  }
]
</script>