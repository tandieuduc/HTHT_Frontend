<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">TÊN DOANH NGHIỆP</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto">
                </ul>
            </div>

            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://i.pravatar.cc/40?img=1" class="rounded-circle me-2" alt="Avatar">
                    <div class="text-end">
                        <div class="fw-bold lh-sm">NGUYỄN THÀNH CÔNG</div>
                        <small class="text-muted lh-sm">Chức vụ</small>
                    </div>
                </a>

                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="bi bi-person-circle me-2"></i>Hồ sơ
                        </router-link>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item" href="#" @click.prevent="logout">
                            <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    width: 100%;
    height: 50px;
    padding: 0 12px;
    background-color: #ffffff;
    border-bottom: 1px solid #E0E0E0;
}

.navbar-brand:hover {
    color: #00376C;
}

.navbar-brand {
    font-size: 1.25rem;
    color: #00376C;
}

.text-end {
    color: #00376C;
}

.user-profile {
    color: #00376C;
}

.image-panel {
    height: 41px;
    width: 41px;
    position: relative;
    background-color: white;
    border: #00376C 1px solid;
    border-radius: 100%;
    transition: transform 0.3s ease;
}

.main-illustration {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    object-fit: cover;
}

.dropdown-toggle {
    cursor: pointer;
}

.dropdown-menu .dropdown-item {
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

import * as bootstrap from 'bootstrap';

const { logout } = useAuth();

const popoverTrigger = ref(null);

onMounted(() => {
    if (popoverTrigger.value) {
        new bootstrap.Popover(popoverTrigger.value, {
            sanitize: false,
        });
    }
});
</script>