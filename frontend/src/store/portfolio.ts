import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  category: string
  categoryKey: string
  image: string
  location: string
  year: string
  duration: string
  features: string[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Category {
  key: string
  name: string
}

export const usePortfolioStore = defineStore('portfolio', () => {
  const projects = ref<Project[]>([
    {
      id: 1,
      title: 'Modern Residential Complex',
      description: 'Complete construction of a 50-unit residential complex with modern amenities.',
      fullDescription: 'This project involved the complete construction of a modern residential complex featuring 50 units across 5 buildings. The project included foundation work, structural construction, plumbing, electrical, and interior finishing.',
      category: 'Civil Construction',
      categoryKey: 'civil',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Downtown District',
      year: '2023',
      duration: '18 months',
      features: [
        'Reinforced concrete structure',
        'Modern architectural design',
        'Energy-efficient systems',
        'Underground parking',
        'Landscaped gardens'
      ],
      status: 'active',
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z'
    },
    {
      id: 2,
      title: 'Luxury Hotel Plumbing System',
      description: 'Complete plumbing installation for a 200-room luxury hotel.',
      fullDescription: 'Comprehensive plumbing system installation for a luxury hotel including water supply, drainage, fire protection systems, and spa facilities. The project required precision and adherence to hospitality industry standards.',
      category: 'Plumbing',
      categoryKey: 'plumbing',
      image: 'https://images.pexels.com/photos/8292774/pexels-photo-8292774.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Business District',
      year: '2023',
      duration: '12 months',
      features: [
        'Multi-zone water systems',
        'Advanced drainage solutions',
        'Fire suppression systems',
        'Spa facility plumbing',
        'Emergency backup systems'
      ],
      status: 'active',
      createdAt: '2023-02-20T00:00:00Z',
      updatedAt: '2023-02-20T00:00:00Z'
    },
    {
      id: 3,
      title: 'Executive Office Interior',
      description: 'Complete interior design and renovation of a corporate headquarters.',
      fullDescription: 'Full interior design and renovation project for a corporate headquarters spanning 10,000 sq ft. The design focused on creating a modern, functional workspace that promotes productivity and collaboration.',
      category: 'Interior Design',
      categoryKey: 'interior',
      image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Financial District',
      year: '2022',
      duration: '8 months',
      features: [
        'Open concept workspace',
        'Executive meeting rooms',
        'Modern lighting systems',
        'Custom furniture design',
        'Smart building integration'
      ],
      status: 'active',
      createdAt: '2022-06-10T00:00:00Z',
      updatedAt: '2022-06-10T00:00:00Z'
    }
  ])

  const categories = ref<Category[]>([
    { key: 'all', name: 'All Projects' },
    { key: 'civil', name: 'Civil Construction' },
    { key: 'plumbing', name: 'Plumbing' },
    { key: 'interior', name: 'Interior Design' }
  ])

  const stats = ref([
    { value: '500+', label: 'Completed Projects' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Expert Team Members' }
  ])

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projects.value.unshift(newProject)
  }

  const updateProject = (id: number, updates: Partial<Project>) => {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value[index] = {
        ...projects.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  }

  const deleteProject = (id: number) => {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value.splice(index, 1)
    }
  }

  const getProjectById = (id: number) => {
    return projects.value.find(p => p.id === id)
  }

  return {
    projects,
    categories,
    stats,
    addProject,
    updateProject,
    deleteProject,
    getProjectById
  }
})