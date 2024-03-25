<script setup>
import { computed, reactive, watch } from "vue"
import Status from "@/components/Status.vue"
import draggable from "vuedraggable"

const props = defineProps({
  color: String,
  paint: Object,
  group: String
})

const paintData = reactive(props.paint)

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

// update paint with changes
watch(paintData, async (data) => {
  try {
    const url = import.meta.env.VITE_API_URL + "paints" + "/" + data.id
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...data })
    })
    console.log(resp)
  } catch (error) {
    console.error(error)
  }
})

// background color
const bgColor = computed(() => {
  return {
    blue: "bg-blue-200",
    grey: "bg-gray-200",
    black: "bg-neutral-600 text-white",
    white: "bg-neutral-50",
    purple: "bg-purple-200"
  }[props.color]
})

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
      class="flex h-96 flex-col items-center gap-4 p-4 md:h-80"
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