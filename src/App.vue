<script setup>
  import { RouterView } from "vue-router";
  import Sidebar from "./components/Sidebar.vue";
  import { isSidebarOpen } from "./components/state";
  import Topbar from "./components/Bartop.vue";
  
</script>

<template>
  <div class="d-flex app-container">
    <Sidebar />
    <div class="main-layout flex-grow-1 d-flex flex-column" :class="{ collapsed: !isSidebarOpen }">
      <Topbar />
      <div class="content-wrapper flex-grow-1 pb-2 pt-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
}

.main-layout {
  transition: margin-left 0.3s ease;
  margin-left: 260px;
  width: calc(100% - 260px);
}

.main-layout.collapsed {
  margin-left: 86px;
  width: calc(100% - 86px);
}

.content-wrapper {
  background-color: #ebf3fb;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

</style>