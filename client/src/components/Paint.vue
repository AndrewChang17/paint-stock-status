<script setup>
const props = defineProps({
  color: String
})
</script>

<template>
  <div>
    <h3 class="capitalize text-5xl font-medium text-center">{{ color }}</h3>
  </div>
</template>

<style scoped>

</style>