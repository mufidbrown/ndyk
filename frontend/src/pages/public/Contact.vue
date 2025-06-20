<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div class="max-w-7xl mx-auto section-padding text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
          Contact Us
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          Ready to start your project? Get in touch with us for a free consultation and quote.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Get a Free Quote</h2>
            <p class="text-lg text-gray-600 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="input-field"
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div>
                <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
                  Service Required *
                </label>
                <select
                  id="service"
                  v-model="form.service"
                  required
                  class="input-field"
                >
                  <option value="">Select a service</option>
                  <option value="civil">Civil Construction</option>
                  <option value="plumbing">Plumbing Services</option>
                  <option value="interior">Interior Design</option>
                  <option value="multiple">Multiple Services</option>
                  <option value="consultation">General Consultation</option>
                </select>
              </div>
              
              <div>
                <label for="projectType" class="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  v-model="form.projectType"
                  class="input-field"
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              
              <div>
                <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
                  Project Budget
                </label>
                <select
                  id="budget"
                  v-model="form.budget"
                  class="input-field"
                >
                  <option value="">Select budget range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="over-500k">Over $500,000</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="input-field"
                  placeholder="Please describe your project requirements, timeline, and any specific details..."
                ></textarea>
              </div>
              
              <button type="submit" :disabled="isSubmitting" class="btn-primary w-full justify-center">
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              </button>
            </form>
          </div>
          
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p class="text-lg text-gray-600 mb-8">
              We're here to help with all your construction needs. Reach out to us through any of the following channels.
            </p>
            
            <div class="space-y-6">
              <div v-for="contact in contactInfo" :key="contact.title" class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <component :is="contact.icon" class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ contact.title }}</h3>
                  <p class="text-gray-600">{{ contact.details }}</p>
                  <p v-if="contact.extra" class="text-gray-600">{{ contact.extra }}</p>
                </div>
              </div>
            </div>
            
            <!-- Business Hours -->
            <div class="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div class="space-y-2">
                <div v-for="hour in businessHours" :key="hour.day" class="flex justify-between">
                  <span class="text-gray-600">{{ hour.day }}</span>
                  <span class="font-medium text-gray-900">{{ hour.hours }}</span>
                </div>
              </div>
            </div>
            
            <!-- Emergency Contact -->
            <div class="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-lg">
              <div class="flex items-center mb-3">
                <ExclamationTriangleIcon class="w-6 h-6 text-accent-600 mr-2" />
                <h3 class="text-lg font-semibold text-accent-900">Emergency Services</h3>
              </div>
              <p class="text-accent-800 mb-2">
                For plumbing emergencies and urgent repairs, call our 24/7 emergency line:
              </p>
              <a href="tel:+1234567899" class="text-xl font-bold text-accent-600 hover:text-accent-700">
                (123) 456-7899
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto section-padding">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Find Our Office</h2>
          <p class="text-lg text-gray-600">Visit us at our headquarters or one of our service locations.</p>
        </div>
        
        <!-- Placeholder for map - In real implementation, you would integrate with Google Maps or similar -->
        <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <MapPinIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600">Interactive map would be integrated here</p>
            <p class="text-sm text-gray-500">123 Construction Ave, Builder City, BC 12345</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const toast = useToast()
const isSubmitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  projectType: '',
  budget: '',
  message: ''
})

const contactInfo = [
  {
    title: 'Phone',
    details: '(123) 456-7890',
    extra: 'Mon - Fri, 8AM - 6PM',
    icon: PhoneIcon
  },
  {
    title: 'Email',
    details: 'info@contractorpro.com',
    extra: 'We respond within 24 hours',
    icon: EnvelopeIcon
  },
  {
    title: 'Office Address',
    details: '123 Construction Avenue',
    extra: 'Builder City, BC 12345',
    icon: MapPinIcon
  },
  {
    title: 'Service Hours',
    details: 'Monday - Friday: 8AM - 6PM',
    extra: 'Saturday: 9AM - 4PM',
    icon: ClockIcon
  }
]

const businessHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Emergency Only' }
]

const submitForm = async () => {
  try {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In real implementation, you would send data to backend
    console.log('Form submitted:', form.value)
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      projectType: '',
      budget: '',
      message: ''
    }
  } catch (error) {
    toast.error('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>