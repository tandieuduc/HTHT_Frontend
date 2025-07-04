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
const quyenHeThongs = [
  { id: 1, ten: "Thêm mới ca trực", mota: "", group: "Phân công ca trực" },
  { id: 2, ten: "Xem ca trực", mota: "", group: "Phân công ca trực" },
  { id: 3, ten: "Chỉnh sửa ca trực", mota: "", group: "Phân công ca trực" },
  { id: 4, ten: "Xóa ca trực", mota: "", group: "Phân công ca trực" },
  { id: 5, ten: "Tìm kiếm ca trực", mota: "", group: "Phân công ca trực" },
  { id: 6, ten: "Xem thống kê, báo cáo", mota: "", group: "Thống kê, báo cáo" },
  { id: 7, ten: "Tìm kiếm thống kê, báo cáo", mota: "", group: "Thống kê, báo cáo" },
  { id: 8, ten: "Xuất thống kê, báo cáo", mota: "", group: "Thống kê, báo cáo" },
  { id: 9, ten: "Xử lý yêu cầu", mota: "", group: "Quản lý yêu cầu" },
  { id: 10, ten: "Tìm kiếm yêu cầu", mota: "", group: "Quản lý yêu cầu" },
  { id: 11, ten: "Gửi phản hồi", mota: "", group: "Quản lý yêu cầu" },
];

// Hiển thị form
const addNewQuyen = ({ ma, ten }) => {
  quyenHeThongs.push({ id: quyenHeThongs.length + 1, ma, ten });
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

const filteredQuyens = computed(() => {
  if (!searchKeyword.value) return quyenHeThongs;
  return quyenHeThongs.filter(pb => pb.ten.toLowerCase().includes(searchKeyword.value.toLowerCase()));
})

const handleSearch = (keyword) => {
  currentPage.value = 1
  searchKeyword.value = keyword
}

const pagedQuyens = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredQuyens.value.slice(start, start + pageSize.value);
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

      <CaterForm :show="showAddModal" title="Thêm mới quyền" ma-label="Mã quyền" ten-label="Tên quyền"
        @close="showAddModal = false" @submit="addNewQuyen" />
    </div>

    <!-- Bảng dữ liệu -->
    <div class="table-responsive">
      <table class="table custom-table align-middle mb-0">
        <thead>
          <tr>
            <th id="table-header"><input type="checkbox" id="checkbox" /></th>
            <th id="table-header">STT</th>
            <th id="table-header">Tên quyền</th>
            <th id="table-header">Mô tả</th>
            <th id="table-header">Nhóm quyền</th>
            <th id="table-header">Trạng thái</th>
            <th id="table-header">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedQuyens" :key="item.id" :class="{ 'table-info': index % 2 === 0 }">
            <td><input type="checkbox" id="checkbox" /></td>
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.ten }}</td>
            <td>{{ item.mota }}</td>
            <td>{{ item.group }}</td>
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
                  Chi tiết quyền
                </div>
                <div class="dropdown-item text-danger">
                  <Icon icon="iconamoon:trash" class="me-2" width="24" />
                  Xóa quyền
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :total-items="filteredQuyens.length" :current-page="currentPage" :page-size="pageSize"
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
  width: 160px;
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