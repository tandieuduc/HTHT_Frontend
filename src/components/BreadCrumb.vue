<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Map các đường dẫn đến tên hiển thị tương ứng
const breadcrumbMap = {
  '/categories/phong-ban': ['Dashboard', 'Quản lý danh mục', 'Phòng ban'],
  '/categories/chuc-vu': ['Dashboard', 'Quản lý danh mục', 'Chức vụ'],
  '/categories/he-thong': ['Dashboard', 'Quản lý danh mục', 'Hệ thống'],
  '/user': ['Dashboard', 'Quản lý người dùng'],
  '/roles/quyen-he-thong': ['Dashboard', 'Phân quyền', 'Quản lý quyền'],
  '/roles/nhom-quyen': ['Dashboard', 'Phân quyền', 'Quản lý nhóm quyền'],
  '/roles/quyen-vai-tro': ['Dashboard', 'Phân quyền', 'Quản lý vai trò'],
  '/roles/gan-quyen': ['Dashboard', 'Phân quyền', 'Gán quyền'],
  '/settings': ['Dashboard', 'Cấu hình hệ thống'],
  // thêm các route khác nếu cần
}

const crumbs = computed(() => {
  return breadcrumbMap[route.path] || ['Dashboard']
})
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb mb-3">
      <li class="breadcrumb-item">
        <RouterLink to="/">Dashboard</RouterLink>
      </li>
      <li v-for="(item, index) in crumbs.slice(1)" :key="index"
        :class="['breadcrumb-item', { active: index === crumbs.length - 2 }]"
        :aria-current="index === crumbs.length - 2 ? 'page' : null">
        <span v-if="index === crumbs.length - 2">{{ item }}</span>
        <RouterLink v-else to="#">{{ item }}</RouterLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-item a {
  text-decoration: none;
  color: #00376c;
}

.breadcrumb-item a:hover {
  color: #0d6efd;
}
</style>
