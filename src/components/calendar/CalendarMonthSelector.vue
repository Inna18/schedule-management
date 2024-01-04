<template>
  <div class="calendar-month-selector">
    <span @click="previous"><</span>
    <span class="calendar-month">{{ selectedDate.locale("ko").format("YYYY년 MMMM") }}</span>
    <span @click="next">></span>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import 'dayjs/locale/ko';

const props = defineProps({
  selectedDate: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(["monthSelected"]);

const previous = () => {
  let newSelectedMonth = dayjs(props.selectedDate).subtract(1, "month");
  emits("monthSelected", newSelectedMonth);
}

const next = () => {
  let newSelectedMonth = dayjs(props.selectedDate).add(1, "month");
  emits("monthSelected", newSelectedMonth);
}

</script>

<style scoped>

</style>