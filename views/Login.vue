<template>
    <div class="login-page-container">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-lg-8 d-none d-lg-block">
                    <div class="image-panel">
                        <img src="@/assets/Telebot_4.webp" alt="Telegram Bot Illustration" class="main-illustration" />
                    </div>
                </div>

                <div class="col-lg-4 col-md-8 col-sm-10">
                    <div class="form-panel">
                        <h3 class="form-title">Đăng nhập</h3>
                        <form @submit.prevent="handleLogin">
                            <div class="form-group">
                                <input type="text" class="form-control-custom" id="username" placeholder="Tên tài khoản"
                                    v-model="username" required />
                                <i class="input-icon fa-solid fa-user"></i>
                            </div>
                            <PasswordInput id="password" v-model="password" placeholder="Nhập mật khẩu" />
                            <p v-if="error" class="text-danger mt-2 small">{{ error }}</p>
                            <br />
                            <div class="d-grid">
                                <button type="submit" class="btn btn-login">
                                    <i class="fa-solid fa-arrow-right-to-bracket me-2"></i>
                                    <span>Đăng nhập</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-page-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    background-image: linear-gradient(to right,
            #3f8bbe 0%,
            #bfe3f8 50%,
            #333333 100%);
    padding: 2rem 0;
}

.login-page-container {
    background-image: linear-gradient(to right,
            #3f8bbe 0%,
            #bfe3f8 50%,
            #333333 100%);
}

.image-panel {
    position: relative;
    background-color: #0088cc;
    border-radius: 60px;
    border: white 1px solid;
    padding: 0px;
    transition: transform 0.3s ease;
    object-fit: cover;
}

.main-illustration {
    width: 100%;
    border-radius: 60px;
}

.decorative-icons {
    position: absolute;
    bottom: 15px;
    left: 25px;
    right: 25px;
    display: flex;
    justify-content: space-between;
    font-size: 1.75rem;
    color: #fff;
    opacity: 0.07;
}

.form-panel {
    background: #ffffff;
    padding: 60px 60px;
    border-radius: 40px;
}

.form-title {
    font-weight: 700;
    color: #00376c;
    margin-bottom: 2rem;
}

.form-group {
    position: relative;
    margin-bottom: 1.5rem;
}

.form-control-custom {
    height: 40px;
    width: 100%;
    padding: 16px 12px 16px 12px;
    font-size: 1rem;
    color: #333;
    background-color: transparent;
    border: 1px #999999 solid;
    border-radius: 8px;
    transition: border-color 0.3s ease;
}

.input-icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: #aaa;
}

.btn-login {
    height: 40px;
    background-color: #0d6efd;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.2);
}

.btn-login:hover {
    background-color: #0b5ed7;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(13, 110, 253, 0.3);
}
</style>

<script setup>
import PasswordInput from "@/components/PasswordInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "@/services/api";

import { jwtDecode } from "jwt-decode";

const username = ref("");
const password = ref("");
const error = ref(null);
const isLoading = ref(false);

const router = useRouter();

const handleLogin = async () => {
    error.value = null;
    isLoading.value = true;

    try {
        const response = await apiClient.post("/auth/login", {
            username: username.value,
            password: password.value,
        });

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token Payload:", decodedToken);

        const userRoles = decodedToken.roles || [];

        if (userRoles.includes("ROLE_KỸ THUẬT VIÊN")) {
            localStorage.setItem("user-token", token);
            router.push("/PendingRequest");
        } else if (userRoles.includes("ROLE_QUẢN TRỊ VIÊN")) {
            localStorage.setItem("user-token", token);
            router.push("/AdminDashboard");
        } else if (userRoles.includes("ROLE_LÃNH ĐẠO")) {
            localStorage.setItem("user-token", token);
            router.push("/LeaderDashboard");
        } else {
            error.value = "Tài khoản của bạn bị xóa hoặc cấm truy cập.";
        }
    } catch (err) {
        if (
            err.response &&
            (err.response.status === 401 || err.response.status === 403)
        ) {
            error.value = "Tên đăng nhập hoặc mật khẩu không đúng.";
        } else {
            error.value = "Đã có lỗi xảy ra. Vui lòng thử lại.";
        }
        console.error("Lỗi đăng nhập:", err);
    } finally {
        isLoading.value = false;
    }
};
</script>