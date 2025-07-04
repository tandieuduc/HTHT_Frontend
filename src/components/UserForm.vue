<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  show: Boolean,
  title: { type: String, default: 'Thêm mới người dùng' }
})

const emit = defineEmits(['close', 'submit'])

const user = ref({
  name: '',
  phone: '',
  email: '',
  gender: '',
  address: '',
  username: '',
  password: '',
  role: [],
  position: '',
  department: '',
  avatar: null
})

const preview = ref(null)
const showPassword = ref(false)

watch(() => user.value.avatar, (file) => {
  if (file instanceof File) {
    const reader = new FileReader()
    reader.onload = e => preview.value = e.target.result
    reader.readAsDataURL(file)
  } else {
    preview.value = null
  }
})

watch(() => props.show, (val) => {
  if (!val) {
    preview.value = null
    showPassword.value = false
    user.value = {
      name: '',
      phone: '',
      email: '',
      gender: '',
      address: '',
      username: '',
      password: '',
      role: [],
      position: '',
      department: '',
      avatar: null
    }
  }
})

const handleSubmit = () => {
  emit('submit', user.value)
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="user-modal">
      <!-- Header -->
      <div class="modal-header">
        <h5 class="modal-title">
          {{ title }}
        </h5>
        <Icon icon="ic:round-close" class="btn-close-custom" @click="$emit('close')" />
      </div>

      <!-- Body -->
      <div class="modal-body scrollable">
        <!-- Avatar -->
        <div class="form-group text-center">
          <label class="form-label">Ảnh đại diện</label>

          <div class="avatar-wrapper mb-2 mx-auto">
            <div class="avatar-frame">
              <img v-if="preview" :src="preview" class="avatar-img" />
              <Icon v-else icon="mdi:account" width="60" class="avatar-placeholder" />
            </div>
            <div class="mt-2 text-muted small">{{ user.avatar?.name || 'Chưa chọn tệp' }}</div>
          </div>

          <input ref="fileInput" type="file" accept="image/*" class="d-none"
            @change="e => user.avatar = e.target.files[0]" />
          <button class="btn btn-primary mt-2 avatar-button" @click="$refs.fileInput.click()">
            <Icon icon="ion:cloud-upload-outline" class="me-2" width="24" />
            Chọn ảnh
          </button>
        </div>

        <!-- Họ tên -->
        <div class="form-group">
          <label><span class="required">*</span> Họ và tên người dùng</label>
          <input v-model="user.name" type="text" class="form-control" />
        </div>

        <!-- SĐT & Gmail -->
        <div class="row">
          <div class="col-md-6 form-group">
            <label><span class="required">*</span> Số điện thoại</label>
            <input v-model="user.phone" type="text" class="form-control" />
          </div>
          <div class="col-md-6 form-group">
            <label><span class="required">*</span> Gmail</label>
            <input v-model="user.email" type="email" class="form-control" />
          </div>
        </div>

        <!-- Giới tính -->
        <div class="form-group">
          <label>Giới tính</label>
          <div class="d-flex gap-3 pt-1">
            <label><input type="radio" v-model="user.gender" value="Nam" /> Nam</label>
            <label><input type="radio" v-model="user.gender" value="Nữ" /> Nữ</label>
            <label><input type="radio" v-model="user.gender" value="Khác" /> Khác</label>
          </div>
        </div>

        <!-- Địa chỉ -->
        <div class="form-group">
          <label>Địa chỉ</label>
          <input v-model="user.address" type="text" class="form-control" />
        </div>

        <!-- Tài khoản & Mật khẩu -->
        <div class="row">
          <div class="col-md-6 form-group">
            <label><span class="required">*</span> Tài khoản</label>
            <input v-model="user.username" type="text" class="form-control" />
          </div>
          <div class="col-md-6 form-group">
            <label><span class="required">*</span> Mật khẩu</label>
            <div class="input-group">
              <input v-model="user.password" :type="showPassword ? 'text' : 'password'" class="form-control" />
              <span class="input-group-text bg-white" @click="showPassword = !showPassword" style="cursor: pointer">
                <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" width="22"/>
              </span>
            </div>
          </div>
        </div>

        <!-- Vai trò -->
        <div class="form-group">
          <label>Vai trò</label>
          <div class="d-flex gap-3 pt-1">
            <label><input type="checkbox" v-model="user.role" value="Quản trị viên" id="checkbox" /> Quản trị
              viên</label>
            <label><input type="checkbox" v-model="user.role" value="Lãnh đạo" id="checkbox" /> Lãnh đạo</label>
          </div>
        </div>

        <!-- Chức vụ & Phòng ban -->
        <div class="row">
          <div class="col-md-6 form-group">
            <label>Chức vụ</label>
            <input v-model="user.position" type="text" class="form-control" />
          </div>
          <div class="col-md-6 form-group">
            <label>Phòng ban</label>
            <input v-model="user.department" type="text" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button class="btn btn-secondary close-button" @click="$emit('close')">
          <Icon icon="material-symbols:cancel-outline-rounded" class="me-1" width="24" />
          Hủy
        </button>
        <button class="btn btn-primary submit-button" @click="handleSubmit">
          <Icon icon="carbon:save" class="me-1" width="24" /> Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.user-modal {
  width: 650px;
  max-height: 90vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  color: #00376c;
}

.modal-title {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
}

.modal-header {
  padding: 16px 20px;
  font-weight: 600;
  background-color: #f0f4ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  color: black;
}

.modal-footer {
  padding: 12px 20px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-close-custom {
  font-size: 22px;
  color: #00376c;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: 500;
  color: #00376c;
  margin-bottom: 4px;
  display: inline-block;
}

.required {
  color: red;
}

.avatar-preview img {
  object-fit: cover;
  border: 1px solid #ccc;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-frame {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid #ccc;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: #888;
}

.form-control {
  height: 48px;
  border-radius: 4px;
  transition: border-color 0.2s;
}


.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.05rem rgba(0, 123, 255, .25);
}

.close-button, .submit-button {
  width: 120px;
}

#checkbox {
  font-size: 24px;
}

input[type="checkbox"] {
  transform: scale(1.6);
  margin-right: 6px;
}
</style>
