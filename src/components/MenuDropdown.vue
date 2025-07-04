<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const handleProfile = () => {
  alert('Chuyển đến hồ sơ cá nhân')
  closeDropdown()
}

const handleLogout = () => {
  alert('Đăng xuất...')
  closeDropdown()
}
</script>

<template>
  <div class="user-menu" @click="closeDropdown">
    <img src="#" alt="Avatar" class="avatar" />

    <button class="arrow-btn" @click="toggleDropdown">
      <Icon icon="mdi:chevron-down" />
    </button>

    <div class="dropdown" v-if="showDropdown">
      <div class="dropdown-item" @click="handleProfile">
        <Icon icon="mdi:account-circle-outline" class="dropdown-icon" />
        <span>Hồ sơ cá nhân</span>
      </div>
      <div class="dropdown-item" @click="handleLogout">
        <Icon icon="mdi:logout" class="dropdown-icon" />
        <span>Đăng xuất</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3598db;
}

.arrow-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  color: #1f2937;
}

.dropdown {
  position: absolute;
  top: 48px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 200;
  padding: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background-color: #f1f5f9;
}

.dropdown-icon {
  font-size: 20px;
  color: #3598db;
}
</style>
