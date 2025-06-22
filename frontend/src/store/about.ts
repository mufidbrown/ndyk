import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface AboutHero {
  title: string
  subtitle: string
}

export interface AboutStory {
  title: string
  paragraphs: string[]
  image: string
}

export interface AboutMissionVision {
  vision: {
    title: string
    description: string
  }
  mission: {
    title: string
    description: string
  }
}

export interface AboutValue {
  id: string
  title: string
  description: string
  icon: string
}

export interface AboutTeamMember {
  id: string
  name: string
  role: string
  description: string
  image: string
}

export interface AboutAward {
  id: string
  title: string
  year: string
}

export interface AboutContent {
  hero: AboutHero
  story: AboutStory
  missionVision: AboutMissionVision
  values: AboutValue[]
  team: AboutTeamMember[]
  awards: AboutAward[]
}

const defaultContent: AboutContent = {
  hero: {
    title: 'About ContractorPro',
    subtitle: 'Building excellence since 2008, we are your trusted partner for all construction needs.'
  },
  story: {
    title: 'Our Story',
    paragraphs: [
      'Founded in 2008, ContractorPro began as a small family business with a big vision: to provide exceptional construction services that transform spaces and exceed expectations.',
      'Over the years, we\'ve grown from a local contractor to a trusted name in the industry, completing over 500 projects across residential and commercial sectors.',
      'Our commitment to quality, innovation, and customer satisfaction has been the cornerstone of our success and continues to drive us forward.'
    ],
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  missionVision: {
    vision: {
      title: 'Our Vision',
      description: 'To be the leading construction company that sets the standard for quality, innovation, and customer satisfaction in every project we undertake.'
    },
    mission: {
      title: 'Our Mission',
      description: 'To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of safety, quality, and professionalism.'
    }
  },
  values: [
    {
      id: '1',
      title: 'Quality',
      description: 'We never compromise on the quality of materials and workmanship.',
      icon: 'ShieldCheckIcon'
    },
    {
      id: '2',
      title: 'Teamwork',
      description: 'Collaboration and communication are key to our success.',
      icon: 'UserGroupIcon'
    },
    {
      id: '3',
      title: 'Reliability',
      description: 'We deliver on our promises and meet all project deadlines.',
      icon: 'ClockIcon'
    },
    {
      id: '4',
      title: 'Excellence',
      description: 'We strive for excellence in every project, big or small.',
      icon: 'StarIcon'
    }
  ],
  team: [
    {
      id: '1',
      name: 'John Smith',
      role: 'Founder & CEO',
      description: 'With 20+ years in construction, John leads our company with vision and expertise.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Chief Operations Officer',
      description: 'Sarah ensures smooth operations and maintains our high-quality standards.',
      image: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'Lead Engineer',
      description: 'Mike brings technical expertise and innovative solutions to complex projects.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ],
  awards: [
    { id: '1', title: 'Best Contractor Award', year: '2023' },
    { id: '2', title: 'Quality Excellence', year: '2022' },
    { id: '3', title: 'Safety Recognition', year: '2021' },
    { id: '4', title: 'Innovation Award', year: '2020' }
  ]
}

// Helper functions for localStorage
const STORAGE_KEY = 'contractorpro_about_content'

const loadFromStorage = (): AboutContent => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge with default content to ensure all properties exist
      return {
        ...defaultContent,
        ...parsed,
        hero: { ...defaultContent.hero, ...parsed.hero },
        story: { ...defaultContent.story, ...parsed.story },
        missionVision: {
          vision: { ...defaultContent.missionVision.vision, ...parsed.missionVision?.vision },
          mission: { ...defaultContent.missionVision.mission, ...parsed.missionVision?.mission }
        },
        values: parsed.values || defaultContent.values,
        team: parsed.team || defaultContent.team,
        awards: parsed.awards || defaultContent.awards
      }
    }
  } catch (error) {
    console.error('Error loading content from localStorage:', error)
  }
  return defaultContent
}

const saveToStorage = (content: AboutContent) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch (error) {
    console.error('Error saving content to localStorage:', error)
  }
}

export const useAboutStore = defineStore('about', () => {
  const content = ref<AboutContent>(loadFromStorage())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Watch for changes and save to localStorage
  watch(
    content,
    (newContent) => {
      saveToStorage(newContent)
    },
    { deep: true }
  )

  const updateHero = (hero: AboutHero) => {
    content.value.hero = { ...hero }
  }

  const updateStory = (story: AboutStory) => {
    content.value.story = { ...story }
  }

  const updateMissionVision = (missionVision: AboutMissionVision) => {
    content.value.missionVision = { ...missionVision }
  }

  const updateValues = (values: AboutValue[]) => {
    content.value.values = [...values]
  }

  const addValue = (value: Omit<AboutValue, 'id'>) => {
    const newValue = {
      ...value,
      id: Date.now().toString()
    }
    content.value.values.push(newValue)
  }

  const removeValue = (id: string) => {
    content.value.values = content.value.values.filter(v => v.id !== id)
  }

  const updateTeam = (team: AboutTeamMember[]) => {
    content.value.team = [...team]
  }

  const addTeamMember = (member: Omit<AboutTeamMember, 'id'>) => {
    const newMember = {
      ...member,
      id: Date.now().toString()
    }
    content.value.team.push(newMember)
  }

  const removeTeamMember = (id: string) => {
    content.value.team = content.value.team.filter(m => m.id !== id)
  }

  const updateAwards = (awards: AboutAward[]) => {
    content.value.awards = [...awards]
  }

  const addAward = (award: Omit<AboutAward, 'id'>) => {
    const newAward = {
      ...award,
      id: Date.now().toString()
    }
    content.value.awards.push(newAward)
  }

  const removeAward = (id: string) => {
    content.value.awards = content.value.awards.filter(a => a.id !== id)
  }

  const saveContent = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Content is already saved to localStorage via watcher
      console.log('About content saved:', content.value)
    } catch (err) {
      error.value = 'Failed to save content'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetToDefaults = () => {
    content.value = JSON.parse(JSON.stringify(defaultContent))
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    content,
    isLoading,
    error,
    updateHero,
    updateStory,
    updateMissionVision,
    updateValues,
    addValue,
    removeValue,
    updateTeam,
    addTeamMember,
    removeTeamMember,
    updateAwards,
    addAward,
    removeAward,
    saveContent,
    resetToDefaults
  }
})