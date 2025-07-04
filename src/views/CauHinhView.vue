<script setup>
import { ref } from 'vue'
import { Icon } from "@iconify/vue";
import BreadCrumb from '@/components/BreadCrumb.vue';
const autoReply = ref('')


const weekdays = [
  { value: '2', label: 'Thứ 2' },
  { value: '3', label: 'Thứ 3' },
  { value: '4', label: 'Thứ 4' },
  { value: '5', label: 'Thứ 5' },
  { value: '6', label: 'Thứ 6' },
  { value: '7', label: 'Thứ 7' },
  { value: 'CN', label: 'Chủ nhật' }
]
const workingDays = ref(['2', '3', '4', '5', '6']) // Từ Thứ 2 đến Thứ 6

// Giờ hành chính: phân biệt sáng và chiều
const officeHours = ref({
  morning: { start: '', end: '' },
  afternoon: { start: '', end: '' }
})


// Giờ ngoài giờ hành chính (tự động suy ra hoặc cấu hình)
const offHours = ref([
  {
    label: 'Trước giờ làm trưa',
    start: '',
    end: ''
  },
  {
    label: 'Sau giờ làm chiều',
    start: '',
    end: ''
  }
])

// Cấu hình hết hạn yêu cầu
const expiryTime = ref({
  workingHours: 30, // phút
  offHours: 60 // phút
})

const holidays = ref([
  { date: '', reason: '' }  // Mặc định có sẵn 1 dòng
])

const formatTime = (time) => `${time.hour}:${time.minute} ${time.ampm}`

const addHoliday = () => {
  holidays.value.push({ date: '', reason: '' });
};

const removeHoliday = (index) => {
  holidays.value.splice(index, 1);
};
</script>

<template>
  <div class="container py-4 px-5">
    <BreadCrumb />
    <h4 class="mb-3">
      <Icon icon="famicons:settings-sharp" />
      Danh sách cấu hình
    </h4>

    <!-- 1. Cấu hình tin nhắn tự động -->
    <div class="mb-4">
      <label class="form-label fw-semibold">
        <Icon icon="tdesign:chat-message" width="24" height="24" />
        Tin nhắn trả lời tự động
      </label>
      <textarea v-model="autoReply" rows="3" class="form-control" placeholder="Nhập nội dung tin nhắn..."></textarea>
    </div>

    <!-- 2. Cấu hình ngày làm việc -->
    <div class="mb-4">
      <label class="form-label fw-semibold">
        <Icon icon="lsicon:calendar-outline" width="24" height="24" />
        Thời gian làm việc (thứ trong tuần)
      </label>
      <div class="d-flex flex-wrap gap-3">
        <div v-for="day in weekdays" :key="day.value" class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" :id="`thu-${day.value}`" :value="day.value"
            v-model="workingDays" />
          <label class="form-check-label" :for="`thu-${day.value}`">
            {{ day.label }}
          </label>
        </div>
      </div>
    </div>

    <!-- 3. Cấu hình giờ hành chính -->
    <div class="mb-4">
      <label class="form-label fw-semibold">
        <Icon icon="pixelarticons:clock" width="24" height="24" />
        Thời gian giờ hành chính
      </label>
      <div class="row mb-3 align-items-center">
        <div class="col-md-2 fw-medium">Buổi sáng: </div>
        <div class="col-md-3 d-flex align-items-center gap-2">
          <div class="from">Từ: </div>
          <input type="time" v-model="officeHours.morning.start" class="form-control" />
        </div>

        <div class="col-md-3 d-flex align-items-center gap-2">
          <div class="to">Đến:</div>
          <input type="time" v-model="officeHours.morning.end" class="form-control" />
        </div>
      </div>

      <div class="row mb-2 align-items-center">
        <div class="col-md-2 fw-medium">Buổi chiều: </div>
        <div class="col-md-3 d-flex align-items-center gap-2">
          <div class="from">Từ: </div>
          <input type="time" v-model="officeHours.afternoon.start" class="form-control" />
        </div>

        <div class="col-md-3 d-flex align-items-center gap-2">
          <div class="to">Đến:</div>
          <input type="time" v-model="officeHours.afternoon.end" class="form-control" />
        </div>
      </div>
    </div>

    <!-- 4. Giờ ngoài giờ hành chính -->
    <div class="mb-4">
      <label class="form-label fw-semibold">
        <Icon icon="pixelarticons:clock" width="24" height="24" />
        Thời gian ngoài giờ hành chính
      </label>
      <div v-for="(item, index) in offHours" :key="index" class="row mb-3 align-items-center">
        <div class="fw-medium col-md-2">
          {{ item.label }}:
        </div>

        <div class="col-md-3 d-flex align-items-center gap-2">
          <div class="from">Từ: </div>
          <input type="time" v-model="item.start" class="form-control" />
        </div>
        <div class="col-md-3 d-flex align-items-center gap-2">
          <div class="to">Đến:</div>
          <input type="time" v-model="item.end" class="form-control" />
        </div>
      </div>
    </div>


    <!-- 5. Thời gian hết hạn yêu cầu -->
    <div class="mb-4">
      <label class="form-label fw-semibold">
        <Icon icon="mdi:alarm-clock" width="24" height="24" />
        Thời gian hết hạn yêu cầu
      </label>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Trong giờ hành chính (phút)</label>
          <input type="number" v-model="expiryTime.workingHours" class="form-control" min="1" />
        </div>
        <div class="col-md-4">
          <label class="form-label">Ngoài giờ hành chính (phút)</label>
          <input type="number" v-model="expiryTime.offHours" class="form-control" min="1" />
        </div>
      </div>
    </div>

    <!-- 6. Cấu hình ngày nghỉ -->
    <div class="mb-4">
      <label class="form-label fw-semibold">
        <Icon icon="lucide:calendar-off" width="21" height="22" />
        Danh sách ngày nghỉ
      </label>
      <div v-for="(holiday, index) in holidays" :key="index" class="row g-2 align-items-center mb-2">
        <div class="col-md-3">
          <input type="date" v-model="holiday.date" class="form-control" />
        </div>
        <div class="col-md-6">
          <input type="text" v-model="holiday.reason" class="form-control"
            placeholder="Lý do nghỉ (VD: Tết, bảo trì...)" />
        </div>
        <div class="col-md-auto d-flex align-items-center">
          <button class="btn btn-danger">
            <Icon icon="mynaui:trash" width="20" height="20" @click="removeHoliday(index)" v-if="holidays.length > 1" />
          </button>
        </div>
      </div>

      <button class="btn btn-primary mt-2" @click="addHoliday">
        <Icon icon="mdi:plus" class="me-1" /> Thêm ngày nghỉ
      </button>
    </div>
  </div>
</template>


<style scoped>

h6 {
  font-weight: 600;
}

.cursor-pointer {
  cursor: pointer;
}

.col-md-auto button {
  margin-left: 4px;
}

.form-control {
  cursor: pointer;
}
</style>