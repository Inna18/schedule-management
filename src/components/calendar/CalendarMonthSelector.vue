<template>
  <div class="calendar-month-selector">
    <span @click="previous">
      <img class="arrow-icon" src="@/assets/icon/arrow-left.svg" alt="arrow-left-icon" />
    </span>
    <span class="calendar-month">{{ selectedMonth.locale("ko").format("YYYY년 MMMM") }}</span>
    <span @click="next">
        <img class="arrow-icon" src="@/assets/icon/arrow-right.svg" alt="arrow-right-icon" />
    </span>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import 'dayjs/locale/ko';

const props = defineProps({
  selectedMonth: {
    type: Object,
    required: true
  }
});
const emits = defineEmits(["monthSelected"]);

const previous = () => {
  let newSelectedMonth = dayjs(props.selectedMonth).subtract(1, "month");
  emits("monthSelected", newSelectedMonth);
}

const next = () => {
  let newSelectedMonth = dayjs(props.selectedMonth).add(1, "month");
  emits("monthSelected", newSelectedMonth);
}

</script>

<style scoped>
.calendar-month-selector {
    display: flex;
    align-items: center;
}
.calendar-month {
    margin: 0 20px;
    font-weight: 500;
    font-size: 20px;
}
.arrow-icon {
    cursor: pointer;
}
</style>