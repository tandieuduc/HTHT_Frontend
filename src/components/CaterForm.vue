<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  show: Boolean,
  title: String,
  fields: {
    type: Array,
    required: true
    /*
      Mỗi item: {
        label: 'Tên trường',
        model: String (key), 
        placeholder: String
      }
    */
  },
  initialData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({})

watch(() => props.show, (val) => {
  if (val) {
    formData.value = {}
    props.fields.forEach(field => {
      formData.value[field.model] = props.initialData?.[field.model] || ''
    })
  }
})

const handleSubmit = () => {
  emit('submit', { ...formData.value })
}
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-dialog bg-white">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title">
            {{ title }}
          </h5>
          <Icon icon="material-symbols:close-rounded" width="24" class="custom-close" @click="$emit('close')" />
        </div>


        <div class="modal-body d-flex flex-column gap-3">
          <div v-for="field in fields" :key="field.model">
            <label class="form-label" id="form-label">{{ field.label }}</label>
            <input v-model="formData[field.model]" :type="field.type || 'text'" class="form-control"
              :placeholder="field.placeholder || ''" />
          </div>
        </div>

        
        <div class="modal-footer">
          <button class="btn btn-primary submit-button" @click="handleSubmit">
            <Icon icon="carbon:save" class="me-1" width="24" />
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- :placeholder="`Nhập ${tenLabel.toLowerCase()}`"  -->
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-dialog {
  width: 600px;
  max-width: 95%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-content {
  border: none;
  overflow: hidden;
}

.modal-header {
  background-color: #00376c;
  padding: 16px 20px;
  border-bottom: none;
}

.modal-title {
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
}

.modal-body {
  padding: 20px 40px;
}

.modal-body .form-label {
  font-weight: 500;
  color: #444;
  margin-bottom: 6px;
}

.modal-footer {
  padding-top: 12px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-top: none;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-control {
  border-radius: 4px;
  height: 50px;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.05rem rgba(0, 123, 255, .25);
}

.close-button, .submit-button {
  width: 120px;
  border-radius: 6px;
}

#form-label {
  font-size: 14px;
  color: #00376c;
}

.cross-icon {
  color: #ffffff;
}

.custom-close {
  cursor: pointer;
  color: #ffffff;
}

.custom-close:hover {
  opacity: 0.8;
}
</style>
