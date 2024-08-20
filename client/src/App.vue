<script setup>
import { onMounted, ref } from "vue"
import Paint from "@/components/Paint.vue"
import Status from "@/components/Status.vue"
import draggable from "vuedraggable"
import Skeleton from "@/components/ui/Skeleton.vue"

const paints = ref([])
const loading = ref(true)

onMounted(async () => {
  await fetchPaints()
})

// Fetches paints data from the API and updates the paints value
const fetchPaints = async () => {
  try {
    loading.value = true
    const url = import.meta.env.VITE_API_URL + "paints"
    const resp = await fetch(url)
    paints.value = await resp.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// draggable status list
const statuses = ref([{ status: "available" }, { status: "low" }, { status: "out_of_stock" }])
</script>

<template>
  <main class="grid grid-cols-1 bg-neutral-100 p-4 md:grid-cols-[1fr_4fr] md:px-12">
    <aside
      class="sticky top-0 h-40 w-full border-r bg-white bg-opacity-50 p-4 md:h-dvh md:flex md:flex-col md:justify-center md:gap-12 md:bg-opacity-0"
    >
      <h2 class="hidden w-full text-center text-3xl font-medium md:block">Drag and Drop</h2>
      <draggable
        v-model="statuses"
        item-key="status"
        :group="{ name: 'statuses', pull: 'clone', put: false }"
        class="sticky flex h-max flex-row flex-wrap items-center justify-start gap-4 md:top-0 md:flex-col md:justify-center"
      >
        <template #item="{ element }">
          <Status :status="element.status" />
        </template>
      </draggable>
    </aside>
    <div class="container flex w-full items-center">
      <div
        class="grid w-full grid-cols-1 md:grid-cols-5 mx-8"
        :class="{ 'gap-8': loading, 'gap-0': !loading }"
      >
        <Skeleton
            v-if="loading"
            v-for="i in 5"
            :key="i"
            class="w-full h-[400px] bg-neutral-200"
        />
        <Paint
          v-else
          v-for="paint in paints"
          :paint="paint"
          group="statuses"
          :key="paint.id"
          :color="paint.color"
          @fetch-paints="fetchPaints"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
