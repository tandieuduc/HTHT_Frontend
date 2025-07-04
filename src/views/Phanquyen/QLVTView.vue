<script setup>
import { Icon } from '@iconify/vue';
import { ref } from "vue";
import { onMounted, onBeforeUnmount, computed } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Pagination from '@/components/Pagination.vue';
import CaterForm from "@/components/CaterForm.vue";

const showAddModal = ref(false)
const currentPage = ref(1)
const pageSize = ref(5)

const vaiTros = [
  { id: 1, ma: 'ADMIN', ten: 'Quản trị viên' },
  { id: 2, ma: 'LEADER', ten: 'Lãnh đạo' }
];

const quyenNhom = [
  { id: 1, ten: 'Quản lý yêu cầu' },
  { id: 2, ten: 'Quản lý người dùng' },
  { id: 3, ten: 'Phân công ca trực' },
  { id: 4, ten: 'Thống kê, báo cáo' },
  { id: 5, ten: 'Quản lý hệ thống' },
];

// Hiển thị form
const addNewVaiTro = ({ ma, ten }) => {
  vaiTros.push({ id:  vaiTros.length + 1, ma, ten });
  showAddModal.value = false;
}


onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown)
})

// ID của hàng đang hiển thị menu thao tác
const activeDropdownId = ref(null);

const toggleDropdown = (id) => {
  activeDropdownId.value = activeDropdownId.value === id ? null : id;
};

const closeDropdown = () => {
  activeDropdownId.value = null;
};

// Chức năng tìm kiếm
const vaiTroKeyword = ref("")

const filteredVaiTros = computed(() => {
  if (!vaiTroKeyword.value) return vaiTros;
  return vaiTros.filter(pb => pb.ten.toLowerCase().includes(vaiTroKeyword.value.toLowerCase()));
})


const searchVaiTro = (keyword) => {
  currentPage.value = 1
  vaiTroKeyword.value = keyword
}


const pagedVaiTros = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredVaiTros.value.slice(start, start + pageSize.value);
})
</script>

<template>
  <div class="p-3">
    <!-- PHẦN 1: VAI TRÒ -->
    <h6 class="fw-bold mb-3">1. VAI TRÒ</h6>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <Searchbar @search="searchVaiTro" />
      <button @click="showAddModal = true" class="btn btn-primary">
        <Icon icon="mynaui:plus-circle" class="me-1 icon" /> Thêm mới
      </button>

      <CaterForm :show="showAddModal" title="Thêm vai trò" ma-label="Mã vai trò" ten-label="Tên vai trò"
        @close="showAddModal = false" @submit="addNewVaiTro" />
    </div>

    <div class="table-responsive mb-4">
      <table class="table custom-table align-middle">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>STT</th>
            <th>Mã vai trò</th>
            <th>Tên vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedVaiTros" :key="item.id" :class="{ 'table-info': index % 2 === 0 }">
            <td><input type="checkbox" /></td>
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.ma }}</td>
            <td>{{ item.ten }}</td>
            <td class="position-relative">
              <Icon icon="mdi:dots-vertical" width="22" class="cursor-pointer" @click.stop="toggleDropdown(item.id)" />

              <!-- Dropdown thao tác -->
              <div v-if="activeDropdownId === item.id" class="dropdown-card" @click.stop>
                <div class="dropdown-item">
                  <Icon icon="lucide:pencil" class="me-2" width="22" />
                  Chỉnh sửa
                </div>
                <div class="dropdown-item">
                  <Icon icon="solar:info-circle-outline" class="me-2" width="22" />
                  Chi tiết
                </div>
                <div class="dropdown-item text-danger">
                  <Icon icon="iconamoon:trash" class="me-2" width="24" />
                  Xóa vai trò
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :total-items="filteredVaiTros.length" :current-page="currentPage" :page-size="pageSize"
        @update:page="currentPage = $event" @update:pageSize="pageSize = $event" />
    </div>
  </div>
</template>

<style scoped>
.table th,
.table td {
  border: none;
}

.table-info {
  background-color: #e2f1fb;
}

.cursor-pointer {
  cursor: pointer;
  color: rgb(113, 112, 112);
}

.dropdown-card {
  position: absolute;
  top: 30px;
  right: 100px;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 160px;
  padding: 6px 0;
}

h6 {
  color: #00376c;
}
</style>
