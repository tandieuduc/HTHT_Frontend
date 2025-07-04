<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  collapsed: { type: Boolean, default: false }
})

const route = useRoute()
const isActive = computed(() => {
  return route.path === props.to || route.path.startsWith(props.to + '/')
})

const tooltip = computed(() => {
  return typeof props.to === 'string' ? props.to.replace('/', '') : ''
})
</script>

<template>
  <RouterLink 
      :to="to" 
      class="nav-link" 
      :class="{ active: isActive, collapsed: collapsed }"
      :title="collapsed ? tooltip : ''"
    >
    <Icon :icon="icon" class="icon" />
    <transition name="fade">
      <span v-if="!collapsed" class="label">
        <slot />
      </span>
    </transition>
  </RouterLink>
</template>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: var(--sidebar-item-hover);
}

.nav-link.active {
  background-color: var(--sidebar-item-active);
  border: 2px solid white;
}

.icon {
  font-size: 22px;
  flex-shrink: 0;
}

.label {
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.nav-link.collapsed .label {
  display: none;
}
</style>
