<script setup>
import { Icon } from "@iconify/vue"
import { defineProps, defineEmits, computed } from "vue";


const props = defineProps({
  totalItems: Number,
  currentPage: Number,
  pageSize: Number
});

const emit = defineEmits(['update:page', 'update:pageSize'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

const changePage = (page) => {
  const validPage = Math.max(1, Math.min(totalPages.value, page))
  emit('update:page', validPage)
}

const changePageSize = (e) => {
  emit('update:pageSize', Number(e.target.value))
}
</script>

<template>
  <div class="d-flex justify-content-end align-items-center mt-3 gap-3">
    <div class="d-flex align-items-center gap-2">
      <label for="pageSize" class="mb-0">Số dòng</label>
      <select id="pageSize" class="form-select form-select-sm" style="width: 70px; cursor: pointer;" :value="pageSize"
        @change="changePageSize">
        <option>5</option>
        <option>10</option>
        <option>25</option>
      </select>
    </div>

    <div class="d-flex align-items-center gap-2">
      <span>
        {{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, totalItems) }} của {{ totalItems }}
      </span>
      <Icon icon="lucide:chevron-first" id="cursor-pointer" @click="changePage(1)" />
      <Icon icon="lucide:chevron-left" id="cursor-pointer" :class="{ 'text-muted': currentPage === 1 }"
        @click="changePage(currentPage - 1)" />
      <Icon icon="lucide:chevron-right" id="cursor-pointer" :class="{ 'text-muted': currentPage === totalPages }" @click="
        changePage(currentPage + 1)" />
      <Icon icon="lucide:chevron-last" id="cursor-pointer" @click="changePage(totalPages)" />
    </div>
  </div>
</template>

<style scoped>
#cursor-pointer {
  font-size: 22px;
  cursor: pointer;
}
</style>


