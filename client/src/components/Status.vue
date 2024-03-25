<script setup>
import { computed } from "vue"
import IconClose from "@/components/icons/IconClose.vue"

const props = defineProps({
  status: String,
  index: Number,
  removable: Boolean
})
const emit = defineEmits(["remove"])

const color = computed(() => {
  return {
    available: "bg-green-300",
    low: "bg-yellow-300",
    out_of_stock: "bg-red-300"
  }[props.status]
})

const text = computed(() => {
  return {
    available: "Available",
    low: "Running Low",
    out_of_stock: "Out of Stock"
  }[props.status]
})
</script>

<template>
  <div
    class="flex w-40 max-w-sm flex-row items-center justify-between rounded-lg p-4 shadow hover:cursor-grab"
    :class="color"
  >
    <span class="capitalize text-black">{{ text }}</span>
    <button type="button" v-if="removable" @click="$emit('remove', status)">
      <IconClose />
    </button>
  </div>
</template>

<style scoped></style>
