<script setup>
import {computed} from "vue";

const props = defineProps({
  status: String
})

const color = computed(() => {
  return {
    available: "bg-green-300",
    low: "bg-yellow-300",
    out_of_stock: "bg-red-300",
  }[props.status]
})

const text = computed(() => {
  return {
    available: "Available",
    low: "Running Low",
    out_of_stock: "Out of Stock",
  }[props.status]
})
</script>

<template>
  <div class="rounded-lg max-w-sm p-6 bg-white shadow" :class="color">
    <h4 class="capitalize">{{ text }}</h4>
  </div>
</template>

<style scoped>

</style>