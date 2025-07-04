<template>
    <div class="app-layout">
        <TheSidebar v-if="route.name !== 'Login' && route.name !== 'AdminDashboard' && route.name !== 'LeaderDashboard'" />

        <div class="main-panel">
            <TheNavbar v-if="route.name !== 'Login'" />

            <main class="content-wrapper">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import TheSidebar from './components/Sidebar.vue';
import TheNavbar from './components/Navbar.vue';

const route = useRoute();
</script>

<style>
.main-panel {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    width: 100%;
}

.content-wrapper {
    background-color: #EBF3FB;
    flex-grow: 1;
}

.app-layout {
    display: flex;
}
</style>