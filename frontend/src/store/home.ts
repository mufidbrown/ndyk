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
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Stat {
  id: string
  value: string
  label: string
}

export interface WhyChooseUsItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface CTAContent {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
}

export interface GalleryImage {
  id: string
  url: string
  alt: string
}

export const useHomeStore = defineStore('home', () => {
  const heroContent = ref<HeroContent>({
    title: 'Building Your Dreams Into',
    subtitle: 'Reality',
    description: 'Professional construction services specializing in civil engineering, plumbing solutions, and stunning interior designs. Quality workmanship guaranteed.',
    primaryButtonText: 'Get Free Quote',
    secondaryButtonText: 'View Our Work',
    heroImage: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    statsValue: '500+',
    statsLabel: 'Projects Completed'
  })

  const servicesSection = ref({
    title: 'Our Core Services',
    description: 'We specialize in three key areas to provide comprehensive construction solutions for your projects.'
  })

  const services = ref<Service[]>([
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
  ])

  const stats = ref<Stat[]>([
    { id: '1', value: '500+', label: 'Projects Completed' },
    { id: '2', value: '15+', label: 'Years Experience' },
    { id: '3', value: '50+', label: 'Expert Team' },
    { id: '4', value: '100%', label: 'Client Satisfaction' }
  ])

  const whyChooseUsSection = ref({
    title: 'Why Choose ContractorPro?',
    description: 'With years of experience and a commitment to excellence, we deliver construction projects that exceed expectations.'
  })

  const whyChooseUs = ref<WhyChooseUsItem[]>([
    {
      id: '1',
      title: 'Expert Team',
      description: 'Our skilled professionals bring years of experience to every project.',
      icon: 'UserGroupIcon'
    },
    {
      id: '2',
      title: 'Quality Guarantee',
      description: 'We stand behind our work with comprehensive warranties and guarantees.',
      icon: 'ShieldCheckIcon'
    },
    {
      id: '3',
      title: 'On-Time Delivery',
      description: 'We respect your time and complete projects within agreed timelines.',
      icon: 'ClockIcon'
    }
  ])

  const galleryImages = ref<GalleryImage[]>([
    {
      id: '1',
      url: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Construction work'
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Interior design'
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Plumbing work'
    },
    {
      id: '4',
      url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Project completion'
    }
  ])

  const ctaContent = ref<CTAContent>({
    title: 'Ready to Start Your Project?',
    description: 'Get in touch with us today for a free consultation and quote. Let\'s bring your construction dreams to life.',
    primaryButtonText: 'Get Free Quote',
    secondaryButtonText: 'View Portfolio'
  })

  // Actions
  const updateHeroContent = (content: Partial<HeroContent>) => {
    heroContent.value = { ...heroContent.value, ...content }
    saveToLocalStorage()
  }

  const updateServicesSection = (content: Partial<typeof servicesSection.value>) => {
    servicesSection.value = { ...servicesSection.value, ...content }
    saveToLocalStorage()
  }

  const updateService = (serviceId: string, updates: Partial<Service>) => {
    const index = services.value.findIndex(s => s.id === serviceId)
    if (index !== -1) {
      services.value[index] = { ...services.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const addService = (service: Service) => {
    services.value.push(service)
    saveToLocalStorage()
  }

  const removeService = (serviceId: string) => {
    services.value = services.value.filter(s => s.id !== serviceId)
    saveToLocalStorage()
  }

  const updateStat = (statId: string, updates: Partial<Stat>) => {
    const index = stats.value.findIndex(s => s.id === statId)
    if (index !== -1) {
      stats.value[index] = { ...stats.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const addStat = (stat: Stat) => {
    stats.value.push(stat)
    saveToLocalStorage()
  }

  const removeStat = (statId: string) => {
    stats.value = stats.value.filter(s => s.id !== statId)
    saveToLocalStorage()
  }

  const updateWhyChooseUsSection = (content: Partial<typeof whyChooseUsSection.value>) => {
    whyChooseUsSection.value = { ...whyChooseUsSection.value, ...content }
    saveToLocalStorage()
  }

  const updateWhyChooseUsItem = (itemId: string, updates: Partial<WhyChooseUsItem>) => {
    const index = whyChooseUs.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      whyChooseUs.value[index] = { ...whyChooseUs.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const addWhyChooseUsItem = (item: WhyChooseUsItem) => {
    whyChooseUs.value.push(item)
    saveToLocalStorage()
  }

  const removeWhyChooseUsItem = (itemId: string) => {
    whyChooseUs.value = whyChooseUs.value.filter(item => item.id !== itemId)
    saveToLocalStorage()
  }

  const updateGalleryImage = (imageId: string, updates: Partial<GalleryImage>) => {
    const index = galleryImages.value.findIndex(img => img.id === imageId)
    if (index !== -1) {
      galleryImages.value[index] = { ...galleryImages.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const addGalleryImage = (image: GalleryImage) => {
    galleryImages.value.push(image)
    saveToLocalStorage()
  }

  const removeGalleryImage = (imageId: string) => {
    galleryImages.value = galleryImages.value.filter(img => img.id !== imageId)
    saveToLocalStorage()
  }

  const updateCTAContent = (content: Partial<CTAContent>) => {
    ctaContent.value = { ...ctaContent.value, ...content }
    saveToLocalStorage()
  }

  // Persistence
  const saveToLocalStorage = () => {
    const data = {
      heroContent: heroContent.value,
      servicesSection: servicesSection.value,
      services: services.value,
      stats: stats.value,
      whyChooseUsSection: whyChooseUsSection.value,
      whyChooseUs: whyChooseUs.value,
      galleryImages: galleryImages.value,
      ctaContent: ctaContent.value
    }
    localStorage.setItem('contractorpro-home-content', JSON.stringify(data))
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('contractorpro-home-content')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.heroContent) heroContent.value = data.heroContent
        if (data.servicesSection) servicesSection.value = data.servicesSection
        if (data.services) services.value = data.services
        if (data.stats) stats.value = data.stats
        if (data.whyChooseUsSection) whyChooseUsSection.value = data.whyChooseUsSection
        if (data.whyChooseUs) whyChooseUs.value = data.whyChooseUs
        if (data.galleryImages) galleryImages.value = data.galleryImages
        if (data.ctaContent) ctaContent.value = data.ctaContent
      }
    } catch (error) {
      console.error('Error loading content from localStorage:', error)
    }
  }

  // Initialize from localStorage
  loadFromLocalStorage()

  return {
    // State
    heroContent,
    servicesSection,
    services,
    stats,
    whyChooseUsSection,
    whyChooseUs,
    galleryImages,
    ctaContent,

    // Actions
    updateHeroContent,
    updateServicesSection,
    updateService,
    addService,
    removeService,
    updateStat,
    addStat,
    removeStat,
    updateWhyChooseUsSection,
    updateWhyChooseUsItem,
    addWhyChooseUsItem,
    removeWhyChooseUsItem,
    updateGalleryImage,
    addGalleryImage,
    removeGalleryImage,
    updateCTAContent,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})