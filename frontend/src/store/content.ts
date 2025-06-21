import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ContentItem {
  id: string
  type: 'hero' | 'about' | 'service' | 'portfolio' | 'testimonial'
  title: string
  content: string
  imageUrl?: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const useContentStore = defineStore('content', () => {
  const items = ref<ContentItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchContent = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      items.value = [
        {
          id: '1',
          type: 'hero',
          title: 'Welcome to ContractorPro',
          content: 'Building dreams with quality construction, innovative plumbing solutions, and stunning interior designs.',
          imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
          order: 1,
          isActive: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          type: 'service',
          title: 'Civil Construction',
          content: 'Complete civil engineering solutions for residential and commercial projects. From foundation to finish.',
          imageUrl: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800',
          order: 1,
          isActive: true,
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-18T16:45:00Z'
        },
        {
          id: '3',
          type: 'service',
          title: 'Plumbing Solutions',
          content: 'Professional plumbing services including installation, repair, and maintenance for all your water and drainage needs.',
          imageUrl: 'https://images.pexels.com/photos/8090036/pexels-photo-8090036.jpeg?auto=compress&cs=tinysrgb&w=800',
          order: 2,
          isActive: true,
          createdAt: '2024-01-12T11:00:00Z',
          updatedAt: '2024-01-19T09:20:00Z'
        },
        {
          id: '4',
          type: 'service',
          title: 'Interior Design',
          content: 'Creative interior design solutions that transform spaces into beautiful, functional environments.',
          imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
          order: 3,
          isActive: true,
          createdAt: '2024-01-14T13:00:00Z',
          updatedAt: '2024-01-21T11:30:00Z'
        },
        {
          id: '5',
          type: 'portfolio',
          title: 'Modern Residential Complex',
          content: 'Complete construction of a 50-unit residential complex with integrated plumbing and custom interiors.',
          imageUrl: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=800',
          order: 1,
          isActive: true,
          createdAt: '2024-01-05T11:00:00Z',
          updatedAt: '2024-01-15T13:20:00Z'
        },
        {
          id: '6',
          type: 'testimonial',
          title: 'Sarah Johnson',
          content: 'ContractorPro exceeded our expectations. The quality of their civil work and attention to detail in our interior design was outstanding.',
          order: 1,
          isActive: true,
          createdAt: '2024-01-08T14:00:00Z',
          updatedAt: '2024-01-16T10:15:00Z'
        }
      ]
    } catch (err) {
      error.value = 'Failed to fetch content'
    } finally {
      isLoading.value = false
    }
  }

  const createContent = async (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true
    try {
      const newItem: ContentItem = {
        ...content,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      items.value.push(newItem)
      return newItem
    } catch (err) {
      error.value = 'Failed to create content'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    isLoading.value = true
    try {
      const index = items.value.findIndex(item => item.id === id)
      if (index !== -1) {
        items.value[index] = {
          ...items.value[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    } catch (err) {
      error.value = 'Failed to update content'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteContent = async (id: string) => {
    isLoading.value = true
    try {
      items.value = items.value.filter(item => item.id !== id)
    } catch (err) {
      error.value = 'Failed to delete content'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    items,
    isLoading,
    error,
    fetchContent,
    createContent,
    updateContent,
    deleteContent
  }
})