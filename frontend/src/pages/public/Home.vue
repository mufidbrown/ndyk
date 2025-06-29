<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto section-padding py-24 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h1 class="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {{ homeStore.heroContent.title }}
              <span class="text-accent-400">{{ homeStore.heroContent.subtitle }}</span>
            </h1>
            <p class="text-xl text-primary-100 mb-8 leading-relaxed">
              {{ homeStore.heroContent.description }}
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <router-link to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600 border-accent-500">
                {{ homeStore.heroContent.primaryButtonText }}
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </router-link>
              <router-link to="/portfolio" class="btn-secondary bg-white text-primary-600 hover:bg-primary-50">
                {{ homeStore.heroContent.secondaryButtonText }}
              </router-link>
            </div>
          </div>
          <div class="relative">
            <!-- Fixed dimensions hero image container -->
            <div class="w-full h-96 lg:h-[500px] rounded-lg shadow-2xl overflow-hidden bg-gray-200">
              <img
                :src="homeStore.heroContent.heroImage"
                alt="Construction site"
                class="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                @error="handleImageError"
              />
            </div>
            <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
              <div class="flex items-center space-x-4">
                <div class="bg-primary-100 p-3 rounded-full">
                  <CheckBadgeIcon class="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <p class="text-2xl font-bold text-gray-900">{{ homeStore.heroContent.statsValue }}</p>
                  <p class="text-gray-600">{{ homeStore.heroContent.statsLabel }}</p>
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
            {{ homeStore.servicesSection.title }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ homeStore.servicesSection.description }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in homeStore.services" :key="service.id" class="group">
            <div class="card p-8 hover:shadow-xl transition-shadow duration-300">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <component :is="getIconComponent(service.icon)" class="w-8 h-8 text-primary-600" />
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
          <div v-for="stat in homeStore.stats" :key="stat.id" class="text-center">
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
              {{ homeStore.whyChooseUsSection.title }}
            </h2>
            <p class="text-lg text-gray-600 mb-8">
              {{ homeStore.whyChooseUsSection.description }}
            </p>
            
            <div class="space-y-6">
              <div v-for="feature in homeStore.whyChooseUs" :key="feature.id" class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <component :is="getIconComponent(feature.icon)" class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
                  <p class="text-gray-600">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(image, index) in homeStore.galleryImages"
              :key="image.id"
              class="w-full h-48 rounded-lg shadow-lg overflow-hidden bg-gray-200"
              :class="index === 1 ? 'mt-8' : index === 2 ? '-mt-8' : ''"
            >
              <img
                :src="image.url"
                :alt="image.alt"
                class="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                @error="handleGalleryImageError"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-900">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
          {{ homeStore.ctaContent.title }}
        </h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {{ homeStore.ctaContent.description }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600">
            {{ homeStore.ctaContent.primaryButtonText }}
          </router-link>
          <router-link to="/portfolio" class="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
            {{ homeStore.ctaContent.secondaryButtonText }}
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
import { useHomeStore } from '../../store/home'

const homeStore = useHomeStore()

const iconMap = {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserGroupIcon
}

const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || HomeIcon
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800'
}

const handleGalleryImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400'
}
</script>