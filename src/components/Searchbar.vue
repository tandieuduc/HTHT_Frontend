<script setup>
import { ref, defineEmits, watch } from 'vue';
import { Icon } from '@iconify/vue';

const emit = defineEmits(['search']);
const keyword = ref('');

watch(keyword, (newVal) => {
  emit('search', newVal)
})

const handleSearch = () => {
  emit('search', keyword.value);
};

</script>

<template>
  <div class="d-flex gap-2">
    <input 
        v-model="keyword"  
        type="text" 
        class="form-control" 
        placeholder="Tìm kiếm..." 
        style="width: 250px"/>
    <button class="btn btn-primary d-flex align-items-center gap-1" @click="handleSearch">
      <Icon icon="mdi:magnify" width="20" />
      Tìm kiếm
    </button>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #999;
}
</style>
