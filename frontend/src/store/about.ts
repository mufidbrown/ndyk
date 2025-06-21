import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AboutContent {
  hero: {
    title: string
    subtitle: string
  }
  story: {
    title: string
    paragraphs: string[]
    image: string
  }
  mission: {
    title: string
    description: string
    icon: string
  }
  vision: {
    title: string
    description: string
    icon: string
  }
  values: Array<{
    title: string
    description: string
    icon: string
  }>
  team: Array<{
    name: string
    role: string
    description: string
    image: string
  }>
  awards: Array<{
    title: string
    year: string
  }>
}

export const useAboutStore = defineStore('about', () => {
  const aboutContent = ref<AboutContent>({
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
    mission: {
      title: 'Our Mission',
      description: 'To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of safety, quality, and professionalism.',
      icon: 'HeartIcon'
    },
    vision: {
      title: 'Our Vision',
      description: 'To be the leading construction company that sets the standard for quality, innovation, and customer satisfaction in every project we undertake.',
      icon: 'EyeIcon'
    },
    values: [
      {
        title: 'Quality',
        description: 'We never compromise on the quality of materials and workmanship.',
        icon: 'ShieldCheckIcon'
      },
      {
        title: 'Teamwork',
        description: 'Collaboration and communication are key to our success.',
        icon: 'UserGroupIcon'
      },
      {
        title: 'Reliability',
        description: 'We deliver on our promises and meet all project deadlines.',
        icon: 'ClockIcon'
      },
      {
        title: 'Excellence',
        description: 'We strive for excellence in every project, big or small.',
        icon: 'StarIcon'
      }
    ],
    team: [
      {
        name: 'John Smith',
        role: 'Founder & CEO',
        description: 'With 20+ years in construction, John leads our company with vision and expertise.',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Sarah Johnson',
        role: 'Chief Operations Officer',
        description: 'Sarah ensures smooth operations and maintains our high-quality standards.',
        image: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Mike Chen',
        role: 'Lead Engineer',
        description: 'Mike brings technical expertise and innovative solutions to complex projects.',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    awards: [
      { title: 'Best Contractor Award', year: '2023' },
      { title: 'Quality Excellence', year: '2022' },
      { title: 'Safety Recognition', year: '2021' },
      { title: 'Innovation Award', year: '2020' }
    ]
  })

  const updateAboutContent = (newContent: AboutContent) => {
    aboutContent.value = { ...newContent }
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent.value))
  }

  const loadAboutContent = () => {
    const saved = localStorage.getItem('aboutContent')
    if (saved) {
      aboutContent.value = JSON.parse(saved)
    }
  }

  return {
    aboutContent,
    updateAboutContent,
    loadAboutContent
  }
})