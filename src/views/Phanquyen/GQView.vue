<script setup>
import { Icon } from '@iconify/vue';
import { ref } from "vue";
import { onMounted, onBeforeUnmount, computed } from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Pagination from '@/components/Pagination.vue';

const currentPage = ref(1)
const pageSize = ref(5)

const quyenNhom = [
  { id: 1, ten: 'Quản lý yêu cầu' },
  { id: 2, ten: 'Quản lý người dùng' },
  { id: 3, ten: 'Phân công ca trực' },
  { id: 4, ten: 'Thống kê, báo cáo' },
  { id: 5, ten: 'Quản lý hệ thống' },
];
const searchKeyword = ref("") 
const filteredQuyenNhoms = computed(() => {
  if (!searchKeyword.value) return quyenNhom;
  return quyenNhom.filter(pb => pb.ten.toLowerCase().includes(searchKeyword.value.toLowerCase()));
})

const pagedQuyenNhoms = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredQuyenNhoms.value.slice(start, start + pageSize.value);
})

const searchNhomQuyen = (keyword) => {
  currentPage.value = 1
  searchKeyword.value = keyword
}
</script>

<template>
  <div class="p-3">
    <!-- GÁN QUYỀN -->
    <h6 class="fw-bold mb-3">2. GÁN QUYỀN</h6>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <Searchbar @search="searchNhomQuyen" />
      <div class="d-flex align-items-center">
        <label class="mb-0 me-1">Chọn vai trò</label>
        <select class="form-select form-select-sm" style="width: 160px">
          <option>Tất cả</option>
          <option>ADMIN</option>
          <option>LEADER</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table custom-table align-middle">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>STT</th>
            <th>Nhóm quyền</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
            <th>Tìm kiếm</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pagedQuyenNhoms" :key="item.id" :class="{ 'table-info': index % 2 === 0 }">
            <td><input type="checkbox" /></td>
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.ten }}</td>
            <td><input type="checkbox" id="checkbox" /></td>
            <td><input type="checkbox" id="checkbox" /></td>
            <td><input type="checkbox" id="checkbox" /></td>
            <td><input type="checkbox" id="checkbox" /></td>
          </tr>
        </tbody>
      </table>

      <Pagination :total-items="filteredQuyenNhoms.length" :current-page="currentPage" :page-size="pageSize"
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

h6 {
  color: #00376c;
}
</style>