<script setup>
import { onMounted, ref } from "vue"
import Paint from "@/components/Paint.vue"
import Status from "@/components/Status.vue"
import draggable from "vuedraggable"

const paints = ref([])

onMounted(async () => {
  await fetchPaints()
})

// Fetches paints data from the API and updates the paints value
const fetchPaints = async () => {
  try {
    const url = import.meta.env.VITE_API_URL + "paints"
    const resp = await fetch(url)
    paints.value = await resp.json()
  } catch (error) {
    console.error(error)
  }
}

// status list
const statuses = ref([
  {status: 'available'},
  {status: 'low'},
  {status: 'out_of_stock'},
])
</script>

<template>
  <main class="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_4fr] md:p-4">
    <aside class="flex flex-col h-dvh w-1/2 md:w-1/6 p-4">
      <draggable
          v-model="statuses"
          item-key="status"
          :group="{ name: 'statuses', pull: 'clone', put: false }"
          class="flex flex-col h-full fixed left-8 md:left-16 gap-4"
      >
        <template #item="{ element }">
          <Status :status="element.status" />
        </template>
      </draggable>
    </aside>
    <div class="container flex items-center">
      <div class="grid grid-cols-1 md:grid-cols-5 w-full">
        <Paint
          v-for="paint in paints"
          :paint="paint"
          group="statuses"
          :key="paint.id"
          :color="paint.color"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
