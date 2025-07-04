<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import BreadCrumb from "@/components/BreadCrumb.vue"
import Searchbar from '@/components/Searchbar.vue'
import Pagination from '@/components/Pagination.vue'
import UserForm from '@/components/UserForm.vue'

// Dữ liệu tĩnh
const allUsers = [
  { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', phone: '0123456789', position: 'Nhân viên', role: 'Kỹ thuật viên' },
  { id: 2, name: 'Nguyễn Văn B', gender: 'Nam', phone: '0975462372', position: 'Nhân viên', role: 'Kỹ thuật viên' },
  { id: 3, name: 'Lê Thị C', gender: 'Nữ', phone: '0873729391', position: 'Trưởng phòng', role: 'Lãnh đạo' },
  { id: 4, name: 'Trần Thị D', gender: 'Nữ', phone: '0987654321', position: 'Nhân viên', role: 'Kỹ thuật viên' },
  { id: 5, name: 'Lại Văn E', gender: 'Nam', phone: '0912345678', position: 'Nhân viên', role: 'Kỹ thuật viên' },
  { id: 6, name: 'Nguyễn Thị A', gender: 'Nữ', phone: '0897654321', position: 'Trưởng phòng', role: 'Lãnh đạo' },
  { id: 7, name: 'Nguyễn Thành Công', gender: 'Nam', phone: '0891234567', position: 'Nhân viên', role: 'Kỹ thuật viên' },
  { id: 8, name: 'Trần Văn Thành', gender: 'Nam', phone: '0956789123', position: 'Nhân viên', role: 'Kỹ thuật viên' },
]

const isModalOpen = ref(false)
const handleAddUser = (userData) => {
  // xử lý logic thêm mới tại đây
  console.log('Người dùng mới:', userData)
  isModalOpen.value = false
}

// ---------Toggle button-----------
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
// --------- * ------------
// Bộ lọc
const filterPosition = ref('')
const filterRole = ref('')
const keyword = ref('')

const filteredUsers = computed(() => {
  return allUsers.filter(user => {
    const matchPosition = filterPosition.value === '' || user.position === filterPosition.value
    const matchRole = filterRole.value === '' || user.role === filterRole.value
    const matchKeyword = user.name.toLowerCase().includes(keyword.value.toLowerCase())
    return matchPosition && matchRole && matchKeyword
  })
})

const handleSearch = (val) => {
  keyword.value = val
  currentPage.value = 1
}

// Phân trang
const currentPage = ref(1)
const pageSize = ref(5)

const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredUsers.value.slice(start, start + pageSize.value);
})
</script>

<template>
  <div class="p-3">
    <!-- Breadcrumb -->
    <BreadCrumb />

    <!-- Bộ lọc + tìm kiếm + thêm -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <select class="form-select" v-model="filterPosition" style="width: 150px">
          <option value="">Chức vụ</option>
          <option>Nhân viên</option>
          <option>Trưởng phòng</option>
        </select>
        <select class="form-select" v-model="filterRole" style="width: 150px">
          <option value="">Vai trò</option>
          <option>Kỹ thuật viên</option>
          <option>Lãnh đạo</option>
        </select>
        <Searchbar @search="handleSearch" />
      </div>

      <button class="btn btn-primary" @click="isModalOpen = true">
        <Icon icon="mynaui:plus-circle" class="me-1 icon" /> Thêm mới
      </button>

      <UserForm 
        :show="isModalOpen"
        @close="isModalOpen = false"
        @submit="handleAddUser"
      />
    </div>

    <!-- Bảng -->
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th id="table-header"><input type="checkbox" id="checkbox" /></th>
            <th id="table-header">STT</th>
            <th id="table-header">Họ tên</th>
            <th id="table-header">Giới tính</th>
            <th id="table-header">Số điện thoại</th>
            <th id="table-header">Chức vụ</th>
            <th id="table-header">Vai trò</th>
            <th id="table-header">Trạng thái</th>
            <th id="table-header">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in pagedUsers" :key="user.id" :class="{ 'table-info': index % 2 === 0 }">
            <td><input type="checkbox" id="checkbox" /></td>
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.role }}</td>
            <td></td>
            <td class="position-relative">
              <Icon icon="mdi:dots-vertical" width="22" class="cursor-pointer" @click.stop="toggleDropdown(user.id)" />

              <!-- Dropdown thao tác -->
              <div v-if="activeDropdownId === user.id" class="dropdown-card" @click.stop>
                <div class="dropdown-item">
                  <Icon icon="si:unlock-line" class="me-2" width="24" />
                  Khóa tài khoản
                </div>
                <div class="dropdown-item">
                  <Icon icon="lucide:pencil" class="me-2" width="20" />
                  Chỉnh sửa
                </div>
                <div class="dropdown-item">
                  <Icon icon="solar:info-circle-outline" class="me-2" width="24" />
                  Chi tiết
                </div>
                <div class="dropdown-item text-danger">
                  <Icon icon="iconamoon:trash" class="me-2" width="24" />
                  Xóa người dùng
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Phân trang -->
    <Pagination :total-items="filteredUsers.length" :current-page="currentPage" :page-size="pageSize"
      @update:page="currentPage = $event" @update:pageSize="pageSize = $event" />
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.icon, .cursor-pointer {
  font-size: 20px;
}

.cursor-pointer {
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
