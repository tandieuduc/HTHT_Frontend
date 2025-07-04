<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import NavLink from './NavLink.vue'

import { isSidebarOpen } from './state'

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="sidebar" :class="{ collapsed: !isSidebarOpen }">
    <!-- Toggle button nằm trên cùng, phải -->
    <div class="toggle-btn-wrapper">
      <button class="toggle-btn" @click="toggleSidebar">
        <Icon :icon="isSidebarOpen ? 'mdi:hamburger-open' : 'mdi:hamburger-close'" width="20" />
      </button>
    </div>

    <!-- Logo nằm giữa -->
    <div class="logo-container">
      <img src="../assets/Telebot_4.webp" alt="logo" class="logo-img" />
      <p class="logo-title" v-if="isSidebarOpen">
        HỆ THỐNG BOT TELEGRAM<br />HỖ TRỢ NGƯỜI DÙNG
      </p>
    </div>

    <!-- Danh sách mục điều hướng -->
    <nav class="nav-links">
      <NavLink 
        to="/" 
        icon="lucide:layout-grid" 
        :collapsed="!isSidebarOpen" 
        class="menu-items"
        title="Dashboard"
      >
        Dashboard
      </NavLink>

      <NavLink 
          to="/categories" 
          icon="lucide:folder-open" 
          :collapsed="!isSidebarOpen" 
          class="menu-items"
          title="Quản ý danh mục"
      >
        Quản lý danh mục
      </NavLink>

      <NavLink 
          to="/user" 
          icon="flowbite:users-group-outline" :collapsed="!isSidebarOpen" 
          class="menu-items"
          title="Quản lý người dùng"
      >
        Quản lý người dùng
      </NavLink>

      <NavLink 
          to="/roles" 
          icon="solar:shield-user-outline" :collapsed="!isSidebarOpen" 
          class="menu-items"
          title="Phân quyền"
      >
        Phân quyền
      </NavLink>
      
      <NavLink 
          to="/settings" 
          icon="mdi:cog-outline" 
          :collapsed="!isSidebarOpen" 
          class="menu-items"
          title="Cấu hình hệ thống"
      >
        Cấu hình hệ thống
      </NavLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background-color: var(--sidebar-bg-color);
  color: white;
  transition: width 0.3s ease;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 86px;
}

.toggle-btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
}

.logo-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 1px 1px 20px rgba(255, 255, 255)
}

.logo-title {
  font-weight: bold;
  font-size: 18px;
  color: white;
  line-height: 1.3;
  text-transform: uppercase;
  margin-top: 8px;
  text-align: center;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  flex: 1;
}

.toggle-btn {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00376c;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-items:hover,
.menu-items.active {
  background-color: #2f6f9e;
}



.sidebar.collapsed .toggle-btn-wrapper {
  justify-content: center;
}

.sidebar.collapsed .menu-text {
  opacity: 0;
}

.sidebar.collapsed .menu-icon {
  margin-right: 0;
}
</style>
