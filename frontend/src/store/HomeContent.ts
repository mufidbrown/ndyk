import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  heroImage: string
  statsValue: string
  statsLabel: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Stat {
  id: number
  value: string
  label: string
}

export interface WhyChooseUsItem {
  id: number
  title: string
  description: string
  icon: string
}

export interface CTASection {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
}

export interface HomeContent {
  hero: HeroContent
  services: Service[]
  stats: Stat[]
  whyChooseUs: WhyChooseUsItem[]
  cta: CTASection
  galleryImages: string[]
}

export const useHomeContentStore = defineStore('homeContent', () => {
  const content = ref<HomeContent>({
    hero: {
      title: 'Building Your Dreams Into Reality',
      subtitle: 'Reality',
      description: 'Professional construction services specializing in civil engineering, plumbing solutions, and stunning interior designs. Quality workmanship guaranteed.',
      primaryButtonText: 'Get Free Quote',
      secondaryButtonText: 'View Our Work',
      heroImage: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      statsValue: '500+',
      statsLabel: 'Projects Completed'
    },
    services: [
      {
        id: 1,
        title: 'Civil Construction',
        description: 'Complete civil engineering solutions for residential and commercial projects.',
        icon: 'BuildingOfficeIcon',
        features: [
          'Foundation & Structural Work',
          'Road & Infrastructure',
          'Site Development',
          'Project Management'
        ]
      },
      {
        id: 2,
        title: 'Plumbing Services',
        description: 'Professional plumbing installation, repair, and maintenance services.',
        icon: 'WrenchScrewdriverIcon',
        features: [
          'Installation & Repairs',
          'Drainage Systems',
          'Water Supply Systems',
          'Emergency Services'
        ]
      },
      {
        id: 3,
        title: 'Interior Design',
        description: 'Transform your spaces with our expert interior design and renovation services.',
        icon: 'HomeIcon',
        features: [
          'Space Planning',
          'Custom Furniture',
          'Lighting Design',
          'Complete Renovations'
        ]
      }
    ],
    stats: [
      { id: 1, value: '500+', label: 'Projects Completed' },
      { id: 2, value: '15+', label: 'Years Experience' },
      { id: 3, value: '50+', label: 'Expert Team' },
      { id: 4, value: '100%', label: 'Client Satisfaction' }
    ],
    whyChooseUs: [
      {
        id: 1,
        title: 'Expert Team',
        description: 'Our skilled professionals bring years of experience to every project.',
        icon: 'UserGroupIcon'
      },
      {
        id: 2,
        title: 'Quality Guarantee',
        description: 'We stand behind our work with comprehensive warranties and guarantees.',
        icon: 'ShieldCheckIcon'
      },
      {
        id: 3,
        title: 'On-Time Delivery',
        description: 'We respect your time and complete projects within agreed timelines.',
        icon: 'ClockIcon'
      }
    ],
    cta: {
      title: 'Ready to Start Your Project?',
      description: 'Get in touch with us today for a free consultation and quote. Let\'s bring your construction dreams to life.',
      primaryButtonText: 'Get Free Quote',
      secondaryButtonText: 'View Portfolio'
    },
    galleryImages: [
      'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400'
    ]
  })

  const updateHeroContent = (heroData: HeroContent) => {
    content.value.hero = { ...heroData }
    saveToLocalStorage()
  }

  const updateService = (serviceData: Service) => {
    const index = content.value.services.findIndex(s => s.id === serviceData.id)
    if (index !== -1) {
      content.value.services[index] = { ...serviceData }
    } else {
      content.value.services.push({ ...serviceData, id: Date.now() })
    }
    saveToLocalStorage()
  }

  const deleteService = (id: number) => {
    content.value.services = content.value.services.filter(s => s.id !== id)
    saveToLocalStorage()
  }

  const updateStat = (statData: Stat) => {
    const index = content.value.stats.findIndex(s => s.id === statData.id)
    if (index !== -1) {
      content.value.stats[index] = { ...statData }
    } else {
      content.value.stats.push({ ...statData, id: Date.now() })
    }
    saveToLocalStorage()
  }

  const deleteStat = (id: number) => {
    content.value.stats = content.value.stats.filter(s => s.id !== id)
    saveToLocalStorage()
  }

  const updateWhyChooseUs = (item: WhyChooseUsItem) => {
    const index = content.value.whyChooseUs.findIndex(w => w.id === item.id)
    if (index !== -1) {
      content.value.whyChooseUs[index] = { ...item }
    } else {
      content.value.whyChooseUs.push({ ...item, id: Date.now() })
    }
    saveToLocalStorage()
  }

  const deleteWhyChooseUs = (id: number) => {
    content.value.whyChooseUs = content.value.whyChooseUs.filter(w => w.id !== id)
    saveToLocalStorage()
  }

  const updateCTAContent = (ctaData: CTASection) => {
    content.value.cta = { ...ctaData }
    saveToLocalStorage()
  }

  const updateGalleryImages = (images: string[]) => {
    content.value.galleryImages = [...images]
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('homeContent', JSON.stringify(content.value))
  }

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('homeContent')
    if (stored) {
      content.value = JSON.parse(stored)
    }
  }

  const resetToDefaults = () => {
    localStorage.removeItem('homeContent')
    // Reset to default values (same as initial state)
    loadFromLocalStorage()
  }

  // Initialize from localStorage
  loadFromLocalStorage()

  return {
    content,
    updateHeroContent,
    updateService,
    deleteService,
    updateStat,
    deleteStat,
    updateWhyChooseUs,
    deleteWhyChooseUs,
    updateCTAContent,
    updateGalleryImages,
    resetToDefaults
  }
})