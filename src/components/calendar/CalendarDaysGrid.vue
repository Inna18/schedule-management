<template>
  <li class="calendar-day">
    <span @click="handleDate(day.date)">{{ dayjs(day.date).format("D") }}</span>
  </li>
</template>

<script setup>
import dayjs from "dayjs";

const props  = defineProps({
  day: {
    type: Object,
    required: true
  }
})

const handleDate = (date) => {
  console.log(dayjs(date).format("YYYY-MM-DD"))
}

</script>

<style scoped>
.calendar-day {
    position: relative;
    min-height: 100px;
    font-size: 16px;
    background-color: #fff;
    color: #000;
    padding: 5px;
    list-style-type: none;
}
.calendar-day > span {
    display: flex;
    justify-content: end;
    align-items: center;
    position: absolute;
    right: 2px;
    width: 100px;
    height: 100px;
}
</style>