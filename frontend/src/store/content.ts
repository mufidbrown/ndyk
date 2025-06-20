import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { contentApi } from '../api/content'

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
  const toast = useToast()
  
  const content = ref<ContentItem[]>([])
  const isLoading = ref(false)
  
  const fetchContent = async () => {
    try {
      isLoading.value = true
      const response = await contentApi.getAll()
      content.value = response.data
    } catch (error: any) {
      toast.error('Failed to fetch content')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  const createContent = async (data: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await contentApi.create(data)
      content.value.push(response.data)
      toast.success('Content created successfully!')
      return response.data
    } catch (error: any) {
      toast.error('Failed to create content')
      throw error
    }
  }
  
  const updateContent = async (id: string, data: Partial<ContentItem>) => {
    try {
      const response = await contentApi.update(id, data)
      const index = content.value.findIndex(item => item.id === id)
      if (index !== -1) {
        content.value[index] = response.data
      }
      toast.success('Content updated successfully!')
      return response.data
    } catch (error: any) {
      toast.error('Failed to update content')
      throw error
    }
  }
  
  const deleteContent = async (id: string) => {
    try {
      await contentApi.delete(id)
      content.value = content.value.filter(item => item.id !== id)
      toast.success('Content deleted successfully!')
    } catch (error: any) {
      toast.error('Failed to delete content')
      throw error
    }
  }
  
  const getContentByType = (type: ContentItem['type']) => {
    return content.value.filter(item => item.type === type && item.isActive)
      .sort((a, b) => a.order - b.order)
  }
  
  return {
    content,
    isLoading,
    fetchContent,
    createContent,
    updateContent,
    deleteContent,
    getContentByType
  }
})