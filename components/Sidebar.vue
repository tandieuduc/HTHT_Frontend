<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="image-panel">
                <img src="@/assets/Telebot_4.webp" alt="Telegram Bot Illustration" class="main-illustration">
            </div>
            <div><i class="fa-solid fa-angles-left"></i></div>
        </div>
        <div class="d-flex align-items-center justify-content-center">
            <div class="fs-6 fw-semibold text-center">HỆ THỐNG HỖ TRỢ
                <br> CHĂM SÓC, GIẢI QUYẾT <br> YÊU CẦU KHÁCH HÀNG
            </div>
        </div>
        <br>
        <ul class="nav nav flex-column mb-auto gap-2">
            <li class="nav-item">
                <router-link to="/pendingrequest" class="nav-link" aria-current="page">
                    <i class="ms-1 fa-solid fa-hourglass-half fa-xl me-2"></i>
                    Yêu cầu chờ xử lý
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/processingrequest" class="nav-link">
                    <i class="fa-solid fa-rotate fa-xl me-2"></i>
                    Yêu cầu đang xử lý
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/processedrequest" class="nav-link">
                    <i class="fa-solid fa-circle-check fa-xl me-2"></i>
                    Yêu cầu đã xử lý
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #4E9ACD;
    color: white;
}

.nav-link {
    font-weight: 500;
    color: white;
    border-radius: 0.375rem;
    padding: 10px;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
}

.active.router-link-exact-active.nav-link {
    color: #00376C;
    font-weight: 600;
    background-color: white;
}

.image-panel {
    height: 50px;
    width: 50px;
    position: relative;
    background-color: #0088cc;
    border-radius: 100%;
    border: white 1px solid;
    padding: 0px;
    transition: transform 0.3s ease;
}

.main-illustration {
    width: 49px;
    height: 49px;
    border-radius: 100%;
    object-fit: cover;
}
</style>