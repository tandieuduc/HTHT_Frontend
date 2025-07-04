<script setup>
import { Icon } from '@iconify/vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import BreadCrumb from '@/components/BreadCrumb.vue'

const route = useRoute()
const router = useRouter()

const isActive = (path) => route.path === path
</script>

<template>
  <div class="categories-layout">
    <!-- Breadcrumb -->
    <div class="sticky-header">
      <div class="px-4 pt-2">
        <BreadCrumb/>
      </div>

      <!-- Tabs điều hướng -->
      <div class="px-4 border-bottom">
        <div class="d-flex gap-3">
          <RouterLink to="/categories/phong-ban" class="tab-item"
            :class="{ active: isActive('/categories/phong-ban') }">
            <Icon icon="ep:office-building" class="me-1" />
            Phòng ban
          </RouterLink>
          <RouterLink to="/categories/chuc-vu" class="tab-item" :class="{ active: isActive('/categories/chuc-vu') }">
            <Icon icon="tabler:briefcase" class="me-1" />
            Chức vụ
          </RouterLink>
          <RouterLink to="/categories/he-thong" class="tab-item" :class="{ active: isActive('/categories/he-thong') }">
            <Icon icon="eos-icons:system-group" class="me-1" />
            Hệ thống
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="px-4">
      <!-- RouterView để hiển thị nội dung từng tab -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1010;
  background-color: #EBF3FB;
  margin-top: 0;
  padding-top: 0;
}

.tab-item {
  padding: 10px 16px;
  font-weight: 500;
  text-decoration: none;
  color: #333;
  border-bottom: 2px solid transparent;
  transition: 0.2s;
}

.tab-item.active {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}

.tab-item:hover {
  color: #0d6efd;
}
</style>
