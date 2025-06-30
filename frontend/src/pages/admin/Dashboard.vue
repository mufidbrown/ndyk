<template>
  <div>
    <!-- Welcome Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {{ authStore.user?.name }}!
      </h1>
      <p class="text-gray-600">
        Here's an overview of your ContractorPro CMS dashboard.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.title" class="card p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <component :is="stat.icon" class="w-8 h-8 text-primary-600" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.title }}</dt>
              <dd class="text-2xl font-semibold text-gray-900">{{ stat.value }}</dd>
            </dl>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span :class="stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'" class="flex items-center">
              <ArrowUpIcon v-if="stat.changeType === 'increase'" class="w-4 h-4 mr-1" />
              <ArrowDownIcon v-else class="w-4 h-4 mr-1" />
              {{ stat.change }}
            </span>
            <span class="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link
          v-for="action in quickActions"
          :key="action.title"
          :to="action.href"
          class="card p-4 hover:shadow-md transition-shadow duration-200 group"
        >
          <div class="flex items-center">
            <component :is="action.icon" class="w-6 h-6 text-primary-600 group-hover:text-primary-700" />
            <span class="ml-3 text-sm font-medium text-gray-900 group-hover:text-primary-700">
              {{ action.title }}
            </span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Content Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Activity -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start">
              <div class="flex-shrink-0">
                <div :class="activity.iconBg" class="w-8 h-8 rounded-full flex items-center justify-center">
                  <component :is="activity.icon" class="w-4 h-4 text-white" />
                </div>
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Overview -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Content Overview</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="content in contentOverview" :key="content.type" class="flex items-center justify-between">
              <div class="flex items-center">
                <component :is="content.icon" class="w-5 h-5 text-gray-400 mr-3" />
                <span class="text-sm font-medium text-gray-900">{{ content.label }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">{{ content.count }} items</span>
                <span :class="content.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ content.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <router-link to="/admin/contact-content" class="text-sm font-medium text-primary-600 hover:text-primary-500">
              Manage content →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="mt-8">
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">System Status</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="status in systemStatus" :key="status.name" class="flex items-center">
              <div :class="status.status === 'operational' ? 'bg-green-400' : 'bg-red-400'" 
                   class="w-3 h-3 rounded-full mr-3"></div>
              <span class="text-sm text-gray-900">{{ status.name }}</span>
              <span :class="status.status === 'operational' ? 'text-green-600' : 'text-red-600'" 
                    class="ml-auto text-sm font-medium">
                {{ status.status === 'operational' ? 'Operational' : 'Down' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PhoneIcon,
  EyeIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../store/auth'

const authStore = useAuthStore()

const stats = [
  {
    title: 'Contact Sections',
    value: '8',
    change: '+2%',
    changeType: 'increase',
    icon: PhoneIcon
  },
  {
    title: 'Page Views',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: EyeIcon
  },
  {
    title: 'Active Content',
    value: '15',
    change: '+5%',
    changeType: 'increase',
    icon: DocumentTextIcon
  },
  {
    title: 'System Health',
    value: '100%',
    change: '0%',
    changeType: 'increase',
    icon: ChartBarIcon
  }
]

const quickActions = [
  {
    title: 'Edit Contact Content',
    href: '/admin/contact-content',
    icon: PhoneIcon
  },
  {
    title: 'Update Business Hours',
    href: '/admin/contact-content',
    icon: ClockIcon
  },
  {
    title: 'Manage Contact Info',
    href: '/admin/contact-content',
    icon: PencilIcon
  }
]

const recentActivity = [
  {
    id: 1,
    description: 'Hero section content updated',
    time: '2 hours ago',
    icon: PencilIcon,
    iconBg: 'bg-green-500'
  },
  {
    id: 2,
    description: 'Contact information modified',
    time: '4 hours ago',
    icon: PhoneIcon,
    iconBg: 'bg-blue-500'
  },
  {
    id: 3,
    description: 'Business hours updated',
    time: '6 hours ago',
    icon: ClockIcon,
    iconBg: 'bg-purple-500'
  },
  {
    id: 4,
    description: 'Emergency contact modified',
    time: '1 day ago',
    icon: PencilIcon,
    iconBg: 'bg-yellow-500'
  }
]

const contentOverview = [
  {
    type: 'hero',
    label: 'Hero Section',
    count: 1,
    status: 'active',
    icon: DocumentTextIcon
  },
  {
    type: 'contact',
    label: 'Contact Info',
    count: 4,
    status: 'active',
    icon: PhoneIcon
  },
  {
    type: 'hours',
    label: 'Business Hours',
    count: 7,
    status: 'active',
    icon: ClockIcon
  },
  {
    type: 'emergency',
    label: 'Emergency Contact',
    count: 1,
    status: 'active',
    icon: CheckIcon
  }
]

const systemStatus = [
  {
    name: 'Website',
    status: 'operational'
  },
  {
    name: 'Admin Panel',
    status: 'operational'
  },
  {
    name: 'Contact Forms',
    status: 'operational'
  }
]
</script>