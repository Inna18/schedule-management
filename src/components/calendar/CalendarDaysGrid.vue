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
</style>