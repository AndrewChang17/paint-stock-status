<script setup>
import { computed, reactive, watch } from "vue"
import Status from "@/components/Status.vue"
import draggable from "vuedraggable"

const props = defineProps({
  color: String,
  paint: Object,
  group: String
})
const emit = defineEmits(["fetchPaints"])

const paintData = reactive(props.paint)

// watch for changes in paint
watch(props.paint, (newPaint) => {
  paintData.available = newPaint.available
  paintData.low = newPaint.low
  paintData.out_of_stock = newPaint.out_of_stock
})

// background color
const bgColor = computed(() => {
  return {
    blue: "bg-blue-300",
    grey: "bg-gray-300",
    black: "bg-neutral-600 text-white",
    white: "bg-neutral-50",
    purple: "bg-purple-300"
  }[props.color]
})

// status list for this paint
const paintStatuses = computed({
  // getter
  get() {
    let { available, low, out_of_stock } = paintData
    let list = []
    if (available) list.push({ status: "available" })
    if (low) list.push({ status: "low" })
    if (out_of_stock) list.push({ status: "out_of_stock" })
    return list
  },
  // setter
  set(newList) {
    paintData.available = false
    paintData.low = false
    paintData.out_of_stock = false
    newList.forEach((item) => {
      paintData[item.status] = true
    })
  }
})

// watch paint status changes
watch(
  () => paintData.available,
  async () => {
    await updatePaint()
  }
)
watch(
  () => paintData.low,
  async () => {
    await updatePaint()
  }
)
watch(
  () => paintData.out_of_stock,
  async () => {
    await updatePaint()
  }
)

// Updates paint in the database with a PATCH request
const updatePaint = async () => {
  try {
    const url = import.meta.env.VITE_API_URL + "paints" + "/" + paintData.id
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...paintData })
    })
    console.log(resp)
    // call API to fetch newest paints data
    emit("fetchPaints")
  } catch (error) {
    console.error(error)
  }
}

// remove status from paint
const removeStatus = (status) => {
  paintData[status] = false
}
</script>

<template>
  <div class="flex w-full flex-col divide divide-y divide-white" :class="bgColor">
    <section class="flex h-32 w-full items-center justify-center">
      <h3 class="text-5xl font-medium capitalize">{{ color }}</h3>
    </section>
    <draggable
      class="flex h-60 flex-col items-center gap-4 p-4 md:h-96"
      tag="section"
      v-model="paintStatuses"
      item-key="status"
      :group="{ name: group }"
    >
      <template #item="{ element, index }">
        <Status removable :status="element.status" :index="index" @remove="removeStatus" />
      </template>
    </draggable>
  </div>
</template>

<style scoped></style>
