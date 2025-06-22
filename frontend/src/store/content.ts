import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  buttonText: string
  backgroundImage: string
}

export interface AboutContent {
  title: string
  subtitle: string
  story: string
  mission: string
  vision: string
  values: string[]
  teamMembers: TeamMember[]
}

export interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  bio: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
  image: string
  status: 'active' | 'inactive'
}

export const useContentStore = defineStore('content', () => {
  const heroContent = ref<HeroContent>({
    title: 'Our Portfolio',
    subtitle: 'Discover Excellence in Construction',
    description: 'Discover our completed projects and see the quality of work that sets us apart.',
    buttonText: 'View Projects',
    backgroundImage: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200'
  })

  const aboutContent = ref<AboutContent>({
    title: 'About ContractorPro',
    subtitle: 'Building Excellence Since 2008',
    story: 'ContractorPro has been at the forefront of the construction industry for over 15 years, delivering exceptional projects that stand the test of time. Our commitment to quality, innovation, and client satisfaction has made us a trusted partner for residential, commercial, and industrial construction projects.',
    mission: 'To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of quality, safety, and integrity.',
    vision: 'To be the leading construction company recognized for innovation, sustainability, and excellence in every project we undertake.',
    values: [
      'Quality First',
      'Safety Always',
      'Innovation Driven',
      'Client Focused',
      'Sustainable Practices',
      'Team Excellence'
    ],
    teamMembers: [
      {
        id: 1,
        name: 'John Smith',
        position: 'Chief Executive Officer',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        bio: 'With over 20 years in construction management, John leads our company with vision and expertise.'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        position: 'Project Manager',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
        bio: 'Sarah ensures every project is delivered on time and within budget with her exceptional organizational skills.'
      },
      {
        id: 3,
        name: 'Mike Wilson',
        position: 'Senior Engineer',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
        bio: 'Mike brings technical excellence and innovative solutions to our most challenging projects.'
      }
    ]
  })

  const services = ref<Service[]>([
    {
      id: 1,
      title: 'Civil Construction',
      description: 'Complete construction services from foundation to finishing for residential and commercial projects.',
      icon: 'BuildingOfficeIcon',
      features: [
        'Foundation work',
        'Structural construction',
        'Concrete work',
        'Steel fabrication',
        'General contracting'
      ],
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'active'
    },
    {
      id: 2,
      title: 'Plumbing Services',
      description: 'Professional plumbing installation, maintenance, and repair services for all project types.',
      icon: 'WrenchScrewdriverIcon',
      features: [
        'Water supply systems',
        'Drainage solutions',
        'Fire protection',
        'Gas line installation',
        'Emergency repairs'
      ],
      image: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'active'
    },
    {
      id: 3,
      title: 'Interior Design',
      description: 'Creative interior design and renovation services that transform spaces into functional works of art.',
      icon: 'HomeIcon',
      features: [
        'Space planning',
        'Custom design',
        'Material selection',
        'Furniture design',
        'Project management'
      ],
      image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'active'
    }
  ])

  const updateHeroContent = (content: Partial<HeroContent>) => {
    heroContent.value = { ...heroContent.value, ...content }
  }

  const updateAboutContent = (content: Partial<AboutContent>) => {
    aboutContent.value = { ...aboutContent.value, ...content }
  }

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now()
    }
    aboutContent.value.teamMembers.push(newMember)
  }

  const updateTeamMember = (id: number, updates: Partial<TeamMember>) => {
    const index = aboutContent.value.teamMembers.findIndex(m => m.id === id)
    if (index !== -1) {
      aboutContent.value.teamMembers[index] = {
        ...aboutContent.value.teamMembers[index],
        ...updates
      }
    }
  }

  const deleteTeamMember = (id: number) => {
    const index = aboutContent.value.teamMembers.findIndex(m => m.id === id)
    if (index !== -1) {
      aboutContent.value.teamMembers.splice(index, 1)
    }
  }

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: Date.now()
    }
    services.value.push(newService)
  }

  const updateService = (id: number, updates: Partial<Service>) => {
    const index = services.value.findIndex(s => s.id === id)
    if (index !== -1) {
      services.value[index] = { ...services.value[index], ...updates }
    }
  }

  const deleteService = (id: number) => {
    const index = services.value.findIndex(s => s.id === id)
    if (index !== -1) {
      services.value.splice(index, 1)
    }
  }

  return {
    heroContent,
    aboutContent,
    services,
    updateHeroContent,
    updateAboutContent,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addService,
    updateService,
    deleteService
  }
})