import api from './index'
import type { ContentItem } from '../store/content'

export const contentApi = {
  getAll: () => api.get<ContentItem[]>('/content'),
  getById: (id: string) => api.get<ContentItem>(`/content/${id}`),
  create: (data: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<ContentItem>('/content', data),
  update: (id: string, data: Partial<ContentItem>) => 
    api.put<ContentItem>(`/content/${id}`, data),
  delete: (id: string) => api.delete(`/content/${id}`),
  upload: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/content/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}