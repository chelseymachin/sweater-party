<template>
  <div class="flex min-h-screen">
    <!-- Sidebar / Mobile Hamburger Menu -->
    <div class="drawer lg:drawer-open">
      <input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />

      <!-- Main Content -->
      <div class="drawer-content flex flex-col">
        <!-- Hamburger Menu Button (Absolutely Positioned) -->
        <label
          for="sidebar-toggle"
          class="btn btn-primary btn-sm fixed top-4 left-4 z-50 lg:hidden"
        >
          ☰
        </label>

        <div class="p-6 w-full">
          <h2 class="text-3xl font-bold text-primary">Welcome, {{ user?.username }}!</h2>
          <!-- Project List -->
          <div v-if="projects != null" class="mt-6">
            <h3 class="text-2xl font-bold text-secondary">Your Projects</h3>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              <div
                v-for="project in paginatedProjects"
                :key="project.id"
                class="card bg-base-200 shadow-xl"
              >
                <figure>
                  <img
                    :src="project.first_photo?.small2_url || 'https://via.placeholder.com/150'"
                    alt="Project Image"
                    class="w-full h-40 object-cover"
                  />
                </figure>
                <div class="card-body p-4">
                  <h4 class="text-md font-bold truncate">{{ project.name }}</h4>
                  <p class="text-sm text-gray-500">{{ project.status_name }}</p>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-6">
              <button
                class="btn btn-sm btn-outline"
                @click="prevPage"
                :disabled="currentPage === 1"
              >
                « Prev
              </button>
              <span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>
              <button
                class="btn btn-sm btn-outline"
                @click="nextPage"
                :disabled="currentPage >= totalPages"
              >
                Next »
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu (Hidden on Large Screens Until Clicked) -->
      <div class="drawer-side">
        <label for="sidebar-toggle" class="drawer-overlay"></label>
        <aside
          class="menu w-64 bg-base-100 text-base-content min-h-full p-4 absolute top-0 left-0 shadow-lg lg:relative"
        >
          <ul>
            <li><router-link to="/" class="btn btn-ghost">Home</router-link></li>
            <li><router-link to="/projects" class="btn btn-ghost">Projects</router-link></li>
            <li><button @click="logout" class="btn btn-ghost">Logout</button></li>

            <li class="mt-4">
              <input
                v-model="searchQuery"
                type="text"
                class="input input-bordered w-full"
                placeholder="Search projects..."
              />
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchCurrentUser, getCurrentUserProjectList } from '@/composables/useRavelryApi'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import type { RavelryUser, RavelryProjectList, RavelryProject } from '@/types/ravelry'
import router from '@/router'

const authStore = useAuthStore()
const userStore = useUserStore()
const user = ref<RavelryUser | null>(null)
const projects = ref<RavelryProject[] | null>(null)
const isLoading = ref(false)
const searchQuery = ref('')

// Pagination
const currentPage = ref(1)
const projectsPerPage = 10

// Computed property for paginated projects
const paginatedProjects = computed(() => {
  if (!projects.value) return []
  const filteredProjects = projects.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
  const start = (currentPage.value - 1) * projectsPerPage
  return filteredProjects.slice(start, start + projectsPerPage)
})

const totalPages = computed(() => {
  if (!projects.value) return 1
  return Math.ceil(projects.value.length / projectsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

onMounted(async () => {
  if (authStore.isAuthenticated) {
    isLoading.value = true
    await fetchCurrentUser()
    user.value = userStore.user
    await getCurrentUserProjectList()
    isLoading.value = false
  }
  projects.value = userStore.userProjectList
})

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>
