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
        <BreadCrumb />
      </div>

      <!-- Tabs điều hướng -->
      <div class="px-4 border-bottom">
        <div class="d-flex gap-3">
          <RouterLink to="/roles/quyen-he-thong" class="tab-item"
            :class="{ active: isActive('/roles/quyen-he-thong') }">
            <Icon icon="ph:book-open-user-fill" class="me-1" />
            Quản lý quyền
          </RouterLink>
          <RouterLink to="/roles/nhom-quyen" class="tab-item" :class="{ active: isActive('/roles/nhom-quyen') }">
            <Icon icon="mdi:users-group" class="me-1" />
            Quản lý nhóm quyền
          </RouterLink>
          <RouterLink to="/roles/quyen-vai-tro" class="tab-item" :class="{ active: isActive('/roles/quyen-vai-tro') }">
            <Icon icon="tdesign:user-setting-filled" class="me-1" />
            Quản lý vai trò
          </RouterLink>
          <RouterLink to="/roles/gan-quyen" class="tab-item" :class="{ active: isActive('/roles/gan-quyen') }">
            <Icon icon="eos-icons:role-binding" class="me-1" />
            Gán quyền
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
