<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          {{ servicesStore.serviceContent.heroTitle }}
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          {{ servicesStore.serviceContent.heroDescription }}
        </p>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div v-for="service in servicesStore.activeServices" :key="service.id" class="group">
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
                  <component :is="getIcon(service.icon)" class="w-8 h-8 text-primary-600 mr-3" />
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
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ servicesStore.serviceContent.processTitle }}</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ servicesStore.serviceContent.processDescription }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, index) in servicesStore.activeProcessSteps" :key="step.id" class="text-center">
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-xl font-bold text-white">{{ index + 1 }}</span>
              </div>
              <div v-if="index < servicesStore.activeProcessSteps.length - 1" class="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary-200 transform translate-x-1/2"></div>
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
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ servicesStore.serviceContent.featuresTitle }}</h2>
          <p class="text-lg text-gray-600">
            {{ servicesStore.serviceContent.featuresDescription }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in servicesStore.activeFeatures" :key="feature.id" class="flex items-start">
            <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <component :is="getIcon(feature.icon)" class="w-6 h-6 text-primary-600" />
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
          {{ servicesStore.serviceContent.ctaTitle }}
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          {{ servicesStore.serviceContent.ctaDescription }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600">
            {{ servicesStore.serviceContent.ctaButtonText }}
          </router-link>
          <a href="tel:+1234567890" class="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
            {{ servicesStore.serviceContent.ctaPhoneText }}
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
import { useServicesStore } from '../../store/services'


const servicesStore = useServicesStore()

const iconMap = {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || HomeIcon
}
</script>