<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          {{ aboutStore.content.hero.title }}
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          {{ aboutStore.content.hero.subtitle }}
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              {{ aboutStore.content.story.title }}
            </h2>
            <p v-for="paragraph in aboutStore.content.story.paragraphs" 
               :key="paragraph" 
               class="text-lg text-gray-600 mb-6">
              {{ paragraph }}
            </p>
          </div>
          <div>
            <img
              :src="aboutStore.content.story.image"
              alt="Our team at work"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <EyeIcon class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ aboutStore.content.missionVision.vision.title }}
              </h3>
            </div>
            <p class="text-gray-600 text-lg">
              {{ aboutStore.content.missionVision.vision.description }}
            </p>
          </div>
          
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                <HeartIcon class="w-6 h-6 text-secondary-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ aboutStore.content.missionVision.mission.title }}
              </h3>
            </div>
            <p class="text-gray-600 text-lg">
              {{ aboutStore.content.missionVision.mission.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p class="text-lg text-gray-600">
            These principles guide everything we do and shape our company culture.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="value in aboutStore.content.values" :key="value.id" class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <component :is="getIcon(value.icon)" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
          <p class="text-lg text-gray-600">
            Experienced professionals leading our company towards excellence.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="member in aboutStore.content.team" :key="member.id" class="card p-6 text-center">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
            <p class="text-gray-600">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Awards & Certifications -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Awards & Certifications</h2>
          <p class="text-lg text-gray-600">
            Recognition for our commitment to excellence and quality.
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="award in aboutStore.content.awards" :key="award.id" class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
              <TrophyIcon class="w-8 h-8 text-accent-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ award.title }}</h3>
            <p class="text-sm text-gray-600">{{ award.year }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  EyeIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'
import { useAboutStore } from '../../store/about'

const aboutStore = useAboutStore()

const iconMap = {
  'ShieldCheckIcon': ShieldCheckIcon,
  'UserGroupIcon': UserGroupIcon,
  'ClockIcon': ClockIcon,
  'StarIcon': StarIcon
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || ShieldCheckIcon
}
</script>