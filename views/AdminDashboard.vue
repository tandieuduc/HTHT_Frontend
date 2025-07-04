<template>
    <div class="dashboard">
        <div v-if="userData">
            <h1>Chào mừng, {{ userData.name || 'Người dùng' }}!</h1>
            <p>Đây là khu vực được bảo vệ. Chỉ những người đã đăng nhập mới thấy được trang này.</p>
            <p><strong>Mã nhân viên:</strong> {{ userData.employeeId }}</p>
            <p><strong>Email:</strong> {{ userData.email }}</p>
            <button @click="logout">Đăng xuất</button>
        </div>
        <div v-else>
            <p>Đây là trang dashboard của Quản trị viên. Đang tải dữ liệu người dùng...</p>
        </div>
    </div>
</template>

<style scoped>
.dashboard { 
    padding: 20px;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { authApiClient } from '@/services/api';

const userData = ref(null);

const logout = () => {
    localStorage.removeItem('user-token');
    console.log("Đã đăng xuất!");
};

onMounted(async () => {
    try {
        const response = await authApiClient.get('/user/profile');
        userData.value = response.data;
    } catch (error) {
        console.error("Không thể lấy dữ liệu người dùng:", error);
    }
});
</script>