<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          About ContractorPro
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Building excellence since 2008, we are your trusted partner for all construction needs.
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p class="text-lg text-gray-600 mb-6">
              Founded in 2008, ContractorPro began as a small family business with a big vision: 
              to provide exceptional construction services that transform spaces and exceed expectations.
            </p>
            <p class="text-lg text-gray-600 mb-6">
              Over the years, we've grown from a local contractor to a trusted name in the industry, 
              completing over 500 projects across residential and commercial sectors.
            </p>
            <p class="text-lg text-gray-600">
              Our commitment to quality, innovation, and customer satisfaction has been the cornerstone 
              of our success and continues to drive us forward.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800"
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
              <h3 class="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p class="text-gray-600 text-lg">
              To be the leading construction company that sets the standard for quality, 
              innovation, and customer satisfaction in every project we undertake.
            </p>
          </div>
          
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                <HeartIcon class="w-6 h-6 text-secondary-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p class="text-gray-600 text-lg">
              To deliver exceptional construction services that exceed client expectations 
              while maintaining the highest standards of safety, quality, and professionalism.
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
          <div v-for="value in values" :key="value.title" class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <component :is="value.icon" class="w-8 h-8 text-primary-600" />
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
          <div v-for="member in team" :key="member.name" class="card p-6 text-center">
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
          <div v-for="award in awards" :key="award.title" class="text-center">
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

const values = [
  {
    title: 'Quality',
    description: 'We never compromise on the quality of materials and workmanship.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Teamwork',
    description: 'Collaboration and communication are key to our success.',
    icon: UserGroupIcon
  },
  {
    title: 'Reliability',
    description: 'We deliver on our promises and meet all project deadlines.',
    icon: ClockIcon
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in every project, big or small.',
    icon: StarIcon
  }
]

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    description: 'With 20+ years in construction, John leads our company with vision and expertise.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Operations Officer',
    description: 'Sarah ensures smooth operations and maintains our high-quality standards.',
    image: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Mike Chen',
    role: 'Lead Engineer',
    description: 'Mike brings technical expertise and innovative solutions to complex projects.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
]

const awards = [
  { title: 'Best Contractor Award', year: '2023' },
  { title: 'Quality Excellence', year: '2022' },
  { title: 'Safety Recognition', year: '2021' },
  { title: 'Innovation Award', year: '2020' }
]
</script>