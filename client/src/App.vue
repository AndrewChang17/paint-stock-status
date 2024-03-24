<script setup>
import {onMounted, ref} from "vue";
import Paint from "@/components/Paint.vue";

const paints = ref([])

onMounted(async () => {
  try {
    const url = import.meta.env.VITE_API_URL + 'paints';
    const resp = await fetch(url)
    paints.value = await resp.json()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main>
    <div class="container mx-auto">
      <div class="grid grid-cols-5 gap-4 grid-rows-2">
        <Paint v-for="paint in paints" :key="paint.id" :color="paint.color" />
      </div>

    <pre>
      {{ paints }}
    </pre>
    </div>
  </main>
</template>

<style scoped>
</style>
