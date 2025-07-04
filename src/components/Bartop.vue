<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div class="topbar d-flex justify-content-between align-items-center px-4">
    <!-- Tên doanh nghiệp -->
    <div class="fw-bold text-uppercase fs-6 text-primary-emphasis">
      TÊN DOANH NGHIỆP
    </div>

    <!-- Người dùng -->
    <div class="position-relative d-flex align-items-center gap-2" @click="toggleDropdown" style="cursor: pointer">
      <div class="text-end">
        <div class="fw-semibold user-name">NGUYỄN THÀNH CÔNG</div>
        <div class="text-muted user-role small">Lãnh đạo</div>
      </div>
      <img src="../assets/user_avatar.png" alt="Avatar" class="avatar-img rounded-circle border" />
      <Icon icon="mdi:chevron-down" width="24" id="cheveron-down" />

      <div v-if="isDropdownOpen" class="dropdown-menu-custom">
        <div class="dropdown-item">
          <Icon icon="mdi:account-circle-outline" class="me-2 icon-list" />
          Hồ sơ cá nhân
        </div>
        <div class="dropdown-item">
          <Icon icon="mdi:logout" class="me-2 icon-list" />
          Đăng xuất
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  background-color: #ffffff;
  height: 64px;
  width: 100%;
  border-bottom: 1px solid #dee2e6;
  z-index: 100;
  position: sticky;
  top: 0;
}

.avatar-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.dropdown-menu-custom {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 8px 0;
  width: 180px;
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
  color: #00376c;
}

.user-name, .user-role {
  color: #00376c;
}

.icon-list {
  font-size: 22px;
}

</style>
