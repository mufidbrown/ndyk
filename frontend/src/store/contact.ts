import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ContactInfo {
  title: string
  details: string
  extra?: string
  icon: string
}

export interface BusinessHour {
  day: string
  hours: string
}

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
    phone: ContactInfo
    email: ContactInfo
    address: ContactInfo
    serviceHours: ContactInfo
  }
  businessHours: BusinessHour[]
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

export const useContactStore = defineStore('contact', () => {
  const content = ref<ContactContent>({
    hero: {
      title: 'Contact Us',
      description: 'Ready to start your project? Get in touch with us for a free consultation and quote.'
    },
    form: {
      title: 'Get a Free Quote',
      description: 'Fill out the form below and we\'ll get back to you within 24 hours.'
    },
    contactInfo: {
      title: 'Get in Touch',
      description: 'We\'re here to help with all your construction needs. Reach out to us through any of the following channels.',
      phone: {
        title: 'Phone',
        details: '(123) 456-7890',
        extra: 'Mon - Fri, 8AM - 6PM',
        icon: 'PhoneIcon'
      },
      email: {
        title: 'Email',
        details: 'info@contractorpro.com',
        extra: 'We respond within 24 hours',
        icon: 'EnvelopeIcon'
      },
      address: {
        title: 'Office Address',
        details: '123 Construction Avenue',
        extra: 'Builder City, BC 12345',
        icon: 'MapPinIcon'
      },
      serviceHours: {
        title: 'Service Hours',
        details: 'Monday - Friday: 8AM - 6PM',
        extra: 'Saturday: 9AM - 4PM',
        icon: 'ClockIcon'
      }
    },
    businessHours: [
      { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Emergency Only' }
    ],
    emergency: {
      title: 'Emergency Services',
      description: 'For plumbing emergencies and urgent repairs, call our 24/7 emergency line:',
      phone: '(123) 456-7899'
    },
    map: {
      title: 'Find Our Office',
      description: 'Visit us at our headquarters or one of our service locations.',
      address: '123 Construction Ave, Builder City, BC 12345'
    }
  })

  const updateContent = (newContent: ContactContent) => {
    content.value = { ...newContent }
  }

  const updateSection = (section: keyof ContactContent, data: any) => {
    content.value[section] = { ...content.value[section], ...data }
  }

  return {
    content,
    updateContent,
    updateSection
  }
})