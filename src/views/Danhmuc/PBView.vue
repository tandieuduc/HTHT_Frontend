<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Pagination from "@/components/Pagination.vue";
import CaterForm from "@/components/CaterForm.vue";
import { getAllRooms, createRoom, updateRoom, deleteRoom } from "@/services/roomApi";

const showAddModal = ref(false)
const currentPage = ref(1)
const pageSize = ref(5)
const phongBans = ref([])

const fetchPhongBans = async () => {
  try {
    const res = await getAllRooms()
    phongBans.value = res.data
  } catch (err) {
    console.error('Lỗi lấy danh sách phòng ban', err)
  }
}


// Hiển thị form
const handleSubmitPhongBan = async (data) => {
  try {
    if (editingPhongBan.value) {
      // Chỉnh sửa
      await updateRoom({
        id: editingPhongBan.value.id,
        name: data.name,
        phone: data.phone,
        state: Boolean(true)
      })
      showToast('Cập nhật thành công!')
    } else {
      // Thêm mới
      await createRoom({
        id: data.id,
        name: data.name,
        phone: data.phone,
        state: Boolean(true)
      })
      showToast('Thêm mới thành công!')
    }

    await fetchPhongBans()
  } catch (err) {
    console.error('Lỗi:', err)
    showToast('Thao tác thất bại', 'error')
  }
}

//Delete room
const handleDelete = async (id) => {
  if (confirm('Bạn có chắc muốn xóa phòng ban này không?')) {
    try {
      await deleteRoom(id)
      await fetchPhongBans()
    } catch (err) {
      console.error('Lỗi xóa phòng ban:', err)
    }
  }
}


onMounted(() => {
  window.addEventListener('click', closeDropdown)
  fetchPhongBans()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown)
})

const dropdownPosition = ref({
  visible: false,
  top: 0,
  left: 0,
  item: null
});
// Hàm mở menu thao tác

const toggleDropdown = (item, event) => {
  const rect = event.currentTarget.getBoundingClientRect()

  // Nếu đang mở dropdown cho cùng item → đóng lại
  if (dropdownPosition.value.visible && dropdownPosition.value.item?.id === item.id) {
    dropdownPosition.value.visible = false
    return
  }

  dropdownPosition.value = {
    visible: true,
    top: rect.bottom + window.scrollY + 4,
    left: rect.left + window.scrollX,
    item
  }
}

const closeDropdown = () => {
  dropdownPosition.value.visible = false
};

const filteredPhongBans = computed(() => {
  let result = phongBans.value;

  if (searchKeyword.value) {
    result = result.filter(pb => pb.name.toLowerCase().includes(searchKeyword.value.toLowerCase()));
  }

  if (selectedState.value !== "") {
    result = result.filter(pb => pb.state === parseInt(selectedState.value));
  }
  return result;
})

// Chức năng tìm kiếm
const searchKeyword = ref("")

const handleSearch = (keyword) => {
  currentPage.value = 1
  searchKeyword.value = keyword
}

const pagedPhongBans = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredPhongBans.value.slice(start, start + pageSize.value);
})

const editingPhongBan = ref(null);

const handleCloseForm = () => {
  showAddModal.value = false
  editingPhongBan.value = null
}

const handleEdit  = (pb) => {
  editingPhongBan.value = {...pb}
  showAddModal.value = true
}

const toastMessage = ref('')
const toastType = ref('success')
const showToastRef = ref(false)

const showToast = (message, type = 'success') => {
  toastMessage.value=message
  toastType.value = type
  showToastRef.value = true
  setTimeout(() => { showToastRef.value = false }, 3000)
}

const selectedState = ref('')
const handleFilterState = () => {
  currentPage.value = 1
}
</script>

<template>
  <transition name="fade">
    <div v-if="showToastRef" :class="['toast-alert', toastType]">
      <Icon :icon="toastType === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle-outline'" class="me-2" width="20" />
      {{ toastMessage }}
    </div>
  </transition>

  <div class="p-3">
    <!-- Toolbar: Nút thêm + tìm kiếm -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex justify-content-start gap-3">
        <select v-model="selectedState" class="form-select w-auto" @change="handleFilterState">
          <option value="">Tất cả</option>
          <option value="1">Hoạt động</option>
          <option value="0">Đã xóa</option>
        </select>
        <Searchbar @search="handleSearch" />
      </div>
      <button @click="showAddModal = true" class="btn btn-primary">
        <Icon icon="mynaui:plus-circle" class="me-1 icon" /> Thêm mới
      </button>

      <CaterForm :show="showAddModal" :title="editingPhongBan ? 'Cập nhật phòng ban' : 'Thêm phòng ban'" :fields="[
        { label: 'Mã phòng ban', model: 'id', placeholder: 'Nhập mã phòng ban' },
        { label: 'Tên phòng ban', model: 'name', placeholder: 'Nhập tên phòng ban' },
        { label: 'Số điện thoại', model: 'phone', placeholder: 'Nhập số điện thoại' }
      ]" :initialData="editingPhongBan" @submit="handleSubmitPhongBan" @close="handleCloseForm" />
    </div>


    <!-- Bảng dữ liệu -->
    <div class="table-responsive">
      <table class="table custom-table align-middle mb-0">
        <thead>
          <tr>
            <th id="table-header"><input type="checkbox" id="checkbox" /></th>
            <th id="table-header">STT</th>
            <th id="table-header">Tên phòng ban</th>
            <th id="table-header">Số điện thoại</th>
            <th id="table-header">Trạng thái</th>
            <th id="table-header">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedPhongBans" :key="item.id" :class="{ 'table-info': index % 2 === 0 }">
            <td><input type="checkbox" id="checkbox" /></td>
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <span v-if="item.state === true" class="badge badge-success d-inline-flex align-items-center">
                <Icon icon="mdi:checkbox-multiple-outline" class="me-1" width="18" />
                Hoạt động
              </span>
              <span v-else class="badge badge-danger d-inline-flex align-items-center">
                <Icon icon="mdi:close-box-multiple-outline" class="me-1" width="18" />
                Đã xóa
              </span>
            </td>
            <td>
              <Icon 
                  icon="mdi:dots-vertical" 
                  width="22" 
                  class="cursor-pointer" 
                  @click.stop="toggleDropdown(item, $event)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :total-items="filteredPhongBans.length" :current-page="currentPage" :page-size="pageSize"
      @update:page="currentPage = $event" @update:pageSize="pageSize = $event" />

    <!-- Dropdown thao tác toàn cục -->
    <div v-if="dropdownPosition.visible" class="dropdown-card global-dropdown"
      :style="{ top: dropdownPosition.top + 'px', left: dropdownPosition.left + 'px' }" @click.stop>
      <div class="dropdown-item" @click="handleEdit(dropdownPosition.item)">
        <Icon icon="lucide:pencil" class="me-2" width="22" />
        Chỉnh sửa
      </div>
      <div class="dropdown-item">
        <Icon icon="solar:info-circle-outline" class="me-2" width="22" />
        Chi tiết
      </div>
      <div class="dropdown-item text-danger" @click="handleDelete(dropdownPosition.item.id)">
        <Icon icon="iconamoon:trash" class="me-2" width="24" />
        Xóa phòng ban
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.badge-success {
  color: #0fa64e;
}

.badge-danger {
  color: #e74c3c;
}

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

.global-dropdown {
  position: fixed;
  z-index: 9999;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 180px;
  padding: 6px 2px;
  background: white;
}

.dropdown-card {
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 1;
  transform: translateY(0);
}

.dropdown-card-enter-from,
.dropdown-card-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.toast-alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #2ead65;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-weight: 500;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
}

.toast-alert.success {
  background-color: #2ecc71;
  /* xanh lá */
}

.toast-alert.error {
  background-color: #e74c3c;
  /* đỏ cảnh báo */
}
</style>