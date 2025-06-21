import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image: string
  services: string[]
  order: number
  isActive: boolean
}

export interface ProcessStep {
  id: string
  title: string
  description: string
  order: number
  isActive: boolean
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

export interface ServiceContent {
  heroTitle: string
  heroDescription: string
  processTitle: string
  processDescription: string
  featuresTitle: string
  featuresDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaPhoneText: string
}

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([
    {
      id: '1',
      title: 'Civil Construction',
      description: 'Complete civil engineering and construction services for residential and commercial projects.',
      icon: 'BuildingOfficeIcon',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
      services: [
        'Foundation & Structural Work',
        'Road & Infrastructure Development',
        'Site Preparation & Excavation',
        'Concrete Work & Masonry',
        'Project Management & Supervision'
      ],
      order: 1,
      isActive: true
    },
    {
      id: '2',
      title: 'Plumbing Services',
      description: 'Professional plumbing solutions including installation, repair, and maintenance services.',
      icon: 'WrenchScrewdriverIcon',
      image: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
      services: [
        'Water Supply System Installation',
        'Drainage & Sewage Systems',
        'Pipe Installation & Repairs',
        'Bathroom & Kitchen Plumbing',
        '24/7 Emergency Services'
      ],
      order: 2,
      isActive: true
    },
    {
      id: '3',
      title: 'Interior Design',
      description: 'Transform your spaces with our expert interior design and renovation services.',
      icon: 'HomeIcon',
      image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
      services: [
        'Space Planning & Design',
        'Custom Furniture & Fixtures',
        'Lighting Design & Installation',
        'Complete Home Renovations',
        'Commercial Interior Solutions'
      ],
      order: 3,
      isActive: true
    }
  ])

  const processSteps = ref<ProcessStep[]>([
    {
      id: '1',
      title: 'Consultation',
      description: 'We meet with you to understand your needs, budget, and timeline.',
      order: 1,
      isActive: true
    },
    {
      id: '2',
      title: 'Planning',
      description: 'Our team creates detailed plans and provides accurate cost estimates.',
      order: 2,
      isActive: true
    },
    {
      id: '3',
      title: 'Execution',
      description: 'We begin work with regular updates and quality checkpoints.',
      order: 3,
      isActive: true
    },
    {
      id: '4',
      title: 'Completion',
      description: 'Final inspection and handover with warranty and support.',
      order: 4,
      isActive: true
    }
  ])

  const features = ref<Feature[]>([
    {
      id: '1',
      title: 'Licensed & Insured',
      description: 'Fully licensed contractors with comprehensive insurance coverage.',
      icon: 'ShieldCheckIcon',
      order: 1,
      isActive: true
    },
    {
      id: '2',
      title: 'On-Time Delivery',
      description: 'We respect deadlines and deliver projects on schedule.',
      icon: 'ClockIcon',
      order: 2,
      isActive: true
    },
    {
      id: '3',
      title: 'Competitive Pricing',
      description: 'Fair and transparent pricing with no hidden costs.',
      icon: 'CurrencyDollarIcon',
      order: 3,
      isActive: true
    },
    {
      id: '4',
      title: 'Expert Team',
      description: 'Skilled professionals with years of industry experience.',
      icon: 'UserGroupIcon',  
      order: 4,
      isActive: true
    },
    {
      id: '5',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for emergencies.',
      icon: 'ChatBubbleLeftRightIcon',
      order: 5,
      isActive: true
    },
    {
      id: '6',
      title: 'Quality Materials',
      description: 'We use only premium materials from trusted suppliers.',
      icon: 'TruckIcon',
      order: 6,
      isActive: true
    }
  ])

  const serviceContent = ref<ServiceContent>({
    heroTitle: 'Our Services',
    heroDescription: 'Comprehensive construction solutions tailored to meet your specific needs and requirements.',
    processTitle: 'Our Work Process',
    processDescription: 'We follow a systematic approach to ensure every project is completed successfully and on time.',
    featuresTitle: 'Why Choose Our Services',
    featuresDescription: 'We provide more than just construction - we deliver peace of mind.',
    ctaTitle: 'Ready to Start Your Project?',
    ctaDescription: 'Contact us today for a free consultation and detailed quote for your construction needs.',
    ctaButtonText: 'Get Free Consultation',
    ctaPhoneText: 'Call Now: (123) 456-7890'
  })

  // Computed properties
  const activeServices = computed(() => 
    services.value.filter(s => s.isActive).sort((a, b) => a.order - b.order)
  )

  const activeProcessSteps = computed(() => 
    processSteps.value.filter(p => p.isActive).sort((a, b) => a.order - b.order)
  )

  const activeFeatures = computed(() => 
    features.value.filter(f => f.isActive).sort((a, b) => a.order - b.order)
  )

  // Service actions
  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: uuidv4()
    }
    services.value.push(newService)
    saveToLocalStorage()
  }

  const updateService = (id: string, updates: Partial<Service>) => {
    const index = services.value.findIndex(s => s.id === id)
    if (index !== -1) {
      services.value[index] = { ...services.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const deleteService = (id: string) => {
    services.value = services.value.filter(s => s.id !== id)
    saveToLocalStorage()
  }

  // Process step actions
  const addProcessStep = (step: Omit<ProcessStep, 'id'>) => {
    const newStep: ProcessStep = {
      ...step,
      id: uuidv4()
    }
    processSteps.value.push(newStep)
    saveToLocalStorage()
  }

  const updateProcessStep = (id: string, updates: Partial<ProcessStep>) => {
    const index = processSteps.value.findIndex(p => p.id === id)
    if (index !== -1) {
      processSteps.value[index] = { ...processSteps.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const deleteProcessStep = (id: string) => {
    processSteps.value = processSteps.value.filter(p => p.id !== id)
    saveToLocalStorage()
  }

  // Feature actions
  const addFeature = (feature: Omit<Feature, 'id'>) => {
    const newFeature: Feature = {
      ...feature,
      id: uuidv4()
    }
    features.value.push(newFeature)
    saveToLocalStorage()
  }

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    const index = features.value.findIndex(f => f.id === id)
    if (index !== -1) {
      features.value[index] = { ...features.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const deleteFeature = (id: string) => {
    features.value = features.value.filter(f => f.id !== id)
    saveToLocalStorage()
  }

  // Content actions
  const updateServiceContent = (updates: Partial<ServiceContent>) => {
    serviceContent.value = { ...serviceContent.value, ...updates }
    saveToLocalStorage()
  }

  // Local storage
  const saveToLocalStorage = () => {
    localStorage.setItem('services', JSON.stringify(services.value))
    localStorage.setItem('processSteps', JSON.stringify(processSteps.value))
    localStorage.setItem('features', JSON.stringify(features.value))
    localStorage.setItem('serviceContent', JSON.stringify(serviceContent.value))
  }

  const loadFromLocalStorage = () => {
    const savedServices = localStorage.getItem('services')
    const savedProcessSteps = localStorage.getItem('processSteps')
    const savedFeatures = localStorage.getItem('features')
    const savedServiceContent = localStorage.getItem('serviceContent')

    if (savedServices) {
      services.value = JSON.parse(savedServices)
    }
    if (savedProcessSteps) {
      processSteps.value = JSON.parse(savedProcessSteps)
    }
    if (savedFeatures) {
      features.value = JSON.parse(savedFeatures)
    }
    if (savedServiceContent) {
      serviceContent.value = JSON.parse(savedServiceContent)
    }
  }

  // Initialize from localStorage
  loadFromLocalStorage()

  return {
    services,
    processSteps,
    features,
    serviceContent,
    activeServices,
    activeProcessSteps,
    activeFeatures,
    addService,
    updateService,
    deleteService,
    addProcessStep,
    updateProcessStep,
    deleteProcessStep,
    addFeature,
    updateFeature,
    deleteFeature,
    updateServiceContent,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})