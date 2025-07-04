<template>
    <div class="page-container">
        <div class="main-content">
            <ul class="nav mb-4">
                <li v-for="system in systems" :key="system.id" class="nav-item">
                    <a class="nav-link" :class="{ active: system.id === activeSystemId }" href="#"
                        @click.prevent="selectSystem(system.id)">
                        {{ system.name }}
                    </a>
                </li>
            </ul>

            <div class="card shadow-sm filter-card">
                <div class="card-body">
                    <div class="row g-3 align-items-center">
                        <div class="col-md-3">
                            <label for="status-filter" class="form-label">Lọc theo trạng thái</label>
                            <select id="status-filter" class="form-select">
                                <option selected>Tất cả</option>
                                <option>Sắp hết hạn</option>
                                <option>Mới</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="sender-filter" class="form-label">Lọc theo người gửi</label>
                            <input type="text" id="sender-filter" class="form-control"
                                placeholder="Nhập tên người gửi...">
                        </div>
                        <div class="col-md-2 d-flex align-items-end">
                            <button class="btn btn-primary w-100">
                                <i class="bi bi-funnel-fill me-2"></i>Bỏ lọc
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mt-4">
                <div class="card-body">
                    <div v-if="loading" class="text-center p-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Người gửi</th>
                                        <th scope="col">Nhóm</th>
                                        <th scope="col">Thời gian nhận</th>
                                        <th scope="col" class="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(request, index) in requests" :key="request.id">
                                        <td>{{ (pagination.currentPage - 1) * pagination.itemsPerPage + index + 1 }}
                                        </td>
                                        <td>{{ request.sender_name }}</td>
                                        <td>{{ request.group_name }}</td>
                                        <td>
                                            <div>{{ formatDateTime(request.receipt_at) }}</div>
                                            <small :class="calculateRemainingTime(request.receipt_at).className">
                                                {{ calculateRemainingTime(request.receipt_at).text }}
                                            </small>
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-sm btn-outline-primary me-2" title="Xem chi tiết">
                                                <i class="bi bi-eye-fill"></i>
                                            </button>
                                            <div class="btn-group">
                                                <button class="btn btn-sm btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end">
                                                    <li><a class="dropdown-item" href="#">Tiếp nhận</a></li>
                                                    <li><a class="dropdown-item" href="#">Phản hồi</a></li>
                                                    <li><a class="dropdown-item" href="#">Kết thúc</a></li>
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li><a class="dropdown-item text-danger" href="#">Bỏ qua</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav class="d-flex justify-content-between align-items-center mt-3">
                            <div class="text-muted">
                                Hiển thị {{ (pagination.currentPage - 1) * pagination.itemsPerPage + 1 }} - {{
                                    Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems) }}
                                trong số {{ pagination.totalItems }} mục
                            </div>
                            <ul class="pagination mb-0">
                                <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
                                    <a class="page-link" href="#">Trước</a>
                                </li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item" :class="{ disabled: pagination.currentPage === 3 }">
                                    <a class="page-link" href="#">Sau</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const requests = ref([]);
const pagination = ref({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
});

const systems = ref([]);
const activeSystemId = ref(null);

const mockSystems = [
    { id: '550e8400-e29b-41d4-a716-000000000300', name: 'Hệ thống ABC' },
    { id: '550e8400-e29b-41d4-a716-000000000301', name: 'Hệ thống ABCD' },
    { id: '550e8400-e29b-41d4-a716-000000000302', name: 'Một cửa' },
];

const fetchSystems = () => {
    setTimeout(() => {
        systems.value = mockSystems;
        if (systems.value.length > 0) {
            activeSystemId.value = systems.value[0].id;
        }
    }, 500);
};

const selectSystem = (systemId) => {
    activeSystemId.value = systemId;
    console.log('Đã chọn hệ thống:', systemId);
};

const mockRequests = [
    { id: '550e8400-e29b-41d4-a716-000000000400', group_name: 'Tên nhóm ABC', sender_name: 'Nguyễn Văn A', receipt_at: new Date(new Date().getTime() - 1000 * 60 * 15).toISOString() },
    { id: '550e8400-e29b-41d4-a716-000000000401', group_name: 'Tên nhóm ABCD', sender_name: 'Lê Nguyên Ngọc B', receipt_at: new Date(2025, 5, 3, 7, 45, 0).toISOString() },
];

const fetchRequests = () => {
    loading.value = true;
    setTimeout(() => {
        requests.value = mockRequests;
        pagination.value.totalItems = 1250;
        loading.value = false;
    }, 1000);
};

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const calculateRemainingTime = (dateString) => {
    const receiptDate = new Date(dateString);
    const now = new Date();
    const deadline = new Date(receiptDate.getTime() + 60 * 60 * 1000);
    const diffMs = deadline - now;

    if (diffMs <= 0) {
        return { text: 'Đã trễ hạn', className: 'text-danger fw-bold' };
    }

    if (diffMs < 15 * 60 * 1000) {
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        return { text: `Sắp hết hạn. Còn lại: ${minutes}p${seconds}s`, className: 'text-danger' };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
        return { text: `Còn lại ${hours}h${minutes}p`, className: 'text-success' };
    }
    return { text: `Còn lại ${minutes}p`, className: 'text-primary' };
};

onMounted(() => {
    fetchSystems();
    fetchRequests();
});
</script>

<style scoped>
.page-container {
    padding: 24px;
}

.main-content {
    max-width: 1400px;
    margin: auto;
}

.filter-card {
    border: none;
    border-radius: 8px;
}

.table {
    font-size: 0.9rem;
}

.table thead th {
    background-color: #f8f9fa;
    color: #6c757d;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #dee2e6;
}

.table td {
    vertical-align: middle;
}

.btn-outline-primary {
    border-color: #0d6efd;
    color: #0d6efd;
}

.btn-outline-primary:hover {
    background-color: #0d6efd;
    color: white;
}

.btn-outline-secondary {
    border-color: #6c757d;
    color: #6c757d;
}

.btn-outline-secondary:hover {
    background-color: #6c757d;
    color: white;
}

.nav .nav-link {
    color: #00376C;
    font-weight: 600;
}

.nav .nav-link.active {
    color: #00376C;
    font-weight: 600;
    border-bottom: #00376C 4px solid;
}
</style>