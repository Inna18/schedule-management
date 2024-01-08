<template>
  <li class="calendar-day">
    <span :class="{'is-today':isToday, 'not-this-month':!day.isCurrentMonth}"
          @click="handleDate(day.date)">
      <span class="day-digit"
            :class="{'pick-date':selectedDate===dayjs(day.date).format('YYYY-MM-DD')}">
        {{ dayjs(day.date).format("D") }}
      </span>
    </span>
  </li>
</template>

<script setup>
import dayjs from "dayjs";
import {emitter} from "@/utils/emitter";
import {ref} from "vue";

const props  = defineProps({
  day: {
    type: Object,
    required: true
  },
  isToday: {
    type: Boolean,
    default: false
  },
  selectedDate: {
    type: String,
    required: true
}
});

const pickDate = ref(null);

const handleDate = (date) => {
  emitter.emit("selected-date", date);
  pickDate.value = date;
}

</script>

<style scoped>
.calendar-day {
    position: relative;
    height: 40px;
    width: 40px;
    font-size: 16px;
    background-color: #fff;
    color: #000;
    padding: 5px;
    list-style-type: none;
}
.calendar-day > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 40px;
    height: 40px;
}
.day-digit {
    cursor: pointer;
}
.is-today {
    background: #B6Bfff;
    border-radius: 50%;
}
.not-this-month {
    color: #B1BBC9;
}
.pick-date {
    color: #7661FF;
    font-weight: 600;
}
</style>