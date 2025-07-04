<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { onMounted, onBeforeUnmount, computed } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Pagination from "@/components/Pagination.vue";
import CaterForm from "@/components/CaterForm.vue";

const showAddModal = ref(false)
const currentPage = ref(1)
const pageSize = ref(5)
const nhomQuyens = [
  { id: 1, ten: "Phân công ca trực", mota: "" },
  { id: 2, ten: "Thống kê, báo cáo", mota: "" },
  { id: 3, ten: "Quản lý người dùng", mota: "" },
  { id: 4, ten: "Quản lý hệ thống", mota: ""},
  
];

// Hiển thị form
const addNewNhomQuyen = ({ ma, ten }) => {
  nhomQuyens.push({ id: nhomQuyens.length + 1, ma, ten });
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
const searchKeyword = ref("")

const filteredNhomQuyens = computed(() => {
  if (!searchKeyword.value) return nhomQuyens;
  return nhomQuyens.filter(pb => pb.ten.toLowerCase().includes(searchKeyword.value.toLowerCase()));
})

const handleSearch = (keyword) => {
  currentPage.value = 1
  searchKeyword.value = keyword
}

const pagedNhomQuyens = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredNhomQuyens.value.slice(start, start + pageSize.value);
})
</script>

<template>
  <div class="p-3">
    <!-- Toolbar: Nút thêm + tìm kiếm -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <Searchbar @search="handleSearch" />
      <button @click="showAddModal = true" class="btn btn-primary">
        <Icon icon="mynaui:plus-circle" class="me-1 icon" /> Thêm mới
      </button>

      <CaterForm :show="showAddModal" title="Thêm mới nhóm quyền" ma-label="Mã nhóm quyền" ten-label="Tên nhóm quyền"
        @close="showAddModal = false" @submit="addNewNhomQuyen" />
    </div>

    <!-- Bảng dữ liệu -->
    <div class="table-responsive">
      <table class="table custom-table align-middle mb-0">
        <thead>
          <tr>
            <th id="table-header"><input type="checkbox" id="checkbox" /></th>
            <th id="table-header">STT</th>
            <th id="table-header">Tên nhóm quyền</th>
            <th id="table-header">Mô tả</th>
            <th id="table-header">Trạng thái</th>
            <th id="table-header">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedNhomQuyens" :key="item.id" :class="{ 'table-info': index % 2 === 0 }">
            <td><input type="checkbox" id="checkbox" /></td>
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.ten }}</td>
            <td>{{ item.mota }}</td>
            <td>-</td>
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
                  Chi tiết nhóm quyền
                </div>
                <div class="dropdown-item text-danger">
                  <Icon icon="iconamoon:trash" class="me-2" width="24" />
                  Xóa nhóm quyền
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :total-items="filteredNhomQuyens.length" :current-page="currentPage" :page-size="pageSize"
      @update:page="currentPage = $event" @update:pageSize="pageSize = $event" />
  </div>
</template>

<style scoped>
/* Không viền dọc hoặc quanh bảng */
.custom-table th,
.custom-table td {
  border: none !important;
}

/* Viền dưới cho từng hàng */
.custom-table tr {
  border-bottom: 1px solid #e8eaec;
}

.table th,
.table td {
  border: none !important;
}

/* Header */
.custom-table thead {
  background-color: #f5f5f5;
  font-weight: 600;
}

.icon {
  font-size: 22px;
}

.cursor-pointer {
  font-size: 21px;
  color: rgb(113, 112, 112);
}

/* Hover effect */
.custom-table tbody tr:hover {
  background-color: #d9edf7 !important;
}

/* Tô màu hàng tiêu đề */
.custom-table thead tr {
  background-color: #C2E0F2;
}

/* Icon size */
.icon,
.cursor-pointer {
  font-size: 20px;
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
  width: 190px;
  padding: 6px 0;
}

.cursor-pointer {
  cursor: pointer;
}

.dropdown-item {
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

#table-header {
  font-weight: 600;
}

#checkbox {
  width: 16px;
  height: 16px;
}
</style>