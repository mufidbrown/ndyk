import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ContactContent {
  hero: {
    title: string
    description: string
  }
  form: {
    title: string
    description: string
  }
  contactInfo: {
    title: string
    description: string
    phone: {
      title: string
      details: string
      extra: string
    }
    email: {
      title: string
      details: string
      extra: string
    }
    address: {
      title: string
      details: string
      extra: string
    }
    serviceHours: {
      title: string
      details: string
      extra: string
    }
  }
  businessHours: Array<{
    day: string
    hours: string
  }>
  emergency: {
    title: string
    description: string
    phone: string
  }
  map: {
    title: string
    description: string
    address: string
  }
}

const defaultContent: ContactContent = {
  hero: {
    title: 'Get in Touch with Us',
    description: 'Ready to start your next construction project? Contact our expert team today for a consultation and free estimate.'
  },
  form: {
    title: 'Send us a Message',
    description: 'Fill out the form below and we\'ll get back to you within 24 hours to discuss your project requirements.'
  },
  contactInfo: {
    title: 'Contact Information',
    description: 'Reach out to us through any of these channels. We\'re here to help with all your construction needs.',
    phone: {
      title: 'Phone Numbers',
      details: '(555) 123-4567',
      extra: 'Monday - Friday: 8:00 AM - 6:00 PM'
    },
    email: {
      title: 'Email Addresses',
      details: 'info@contractorpro.com',
      extra: 'We respond within 2 hours'
    },
    address: {
      title: 'Office Location',
      details: '123 Construction Ave, Builder City, BC 12345',
      extra: 'Visit us for in-person consultations'
    },
    serviceHours: {
      title: 'Service Hours',
      details: 'Monday - Friday: 7:00 AM - 7:00 PM',
      extra: 'Weekend emergency services available'
    }
  },
  businessHours: [
    { day: 'Monday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Tuesday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Wednesday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Thursday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Emergency Only' }
  ],
  emergency: {
    title: 'Emergency Services',
    description: 'Available 24/7 for urgent construction emergencies and critical repairs.',
    phone: '(555) 911-HELP'
  },
  map: {
    title: 'Find Our Location',
    description: 'Visit our office for in-person consultations and project discussions.',
    address: '123 Construction Ave, Builder City, BC 12345'
  }
}

export const useContactStore = defineStore('contact', () => {
  // Load content from localStorage or use default
  const loadContent = (): ContactContent => {
    try {
      const saved = localStorage.getItem('contact_content')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge with default to ensure all properties exist
        return { ...defaultContent, ...parsed }
      }
    } catch (error) {
      console.error('Error loading contact content:', error)
    }
    return defaultContent
  }

  const content = ref<ContactContent>(loadContent())

  // Save to localStorage whenever content changes
  const saveToStorage = () => {
    try {
      localStorage.setItem('contact_content', JSON.stringify(content.value))
    } catch (error) {
      console.error('Error saving contact content:', error)
    }
  }

  const updateContent = (newContent: Partial<ContactContent>) => {
    content.value = { ...content.value, ...newContent }
    saveToStorage()
  }

  const updateHero = (hero: Partial<ContactContent['hero']>) => {
    content.value.hero = { ...content.value.hero, ...hero }
    saveToStorage()
  }

  const updateForm = (form: Partial<ContactContent['form']>) => {
    content.value.form = { ...content.value.form, ...form }
    saveToStorage()
  }

  const updateContactInfo = (contactInfo: Partial<ContactContent['contactInfo']>) => {
    content.value.contactInfo = { ...content.value.contactInfo, ...contactInfo }
    saveToStorage()
  }

  const updateBusinessHours = (hours: ContactContent['businessHours']) => {
    content.value.businessHours = hours
    saveToStorage()
  }

  const updateEmergency = (emergency: Partial<ContactContent['emergency']>) => {
    content.value.emergency = { ...content.value.emergency, ...emergency }
    saveToStorage()
  }

  const updateMap = (map: Partial<ContactContent['map']>) => {
    content.value.map = { ...content.value.map, ...map }
    saveToStorage()
  }

  // Reset to default content
  const resetContent = () => {
    content.value = JSON.parse(JSON.stringify(defaultContent))
    saveToStorage()
  }

  return {
    content,
    updateContent,
    updateHero,
    updateForm,
    updateContactInfo,
    updateBusinessHours,
    updateEmergency,
    updateMap,
    resetContent
  }
})