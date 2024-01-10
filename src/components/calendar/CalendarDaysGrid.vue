<template>
  <li class="calendar-day">
    <div :class="{'not-this-month':!day.isCurrentMonth}"
          @click="handleDate(day.date)">
      <div class="day-digit"
          :class="{'is-today':isToday, 'pick-date':selectedDate===dayjs(day.date).format('YYYY-MM-DD')}">
        {{ dayjs(day.date).format("D") }}
      </div>
    </div>
    <div v-if="saved" class="point-container">
      <div class="point"></div>
    </div>
  </li>
</template>

<script setup>
import dayjs from "dayjs";
import {emitter} from "@/utils/util-emitter";
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
  },
  saved: {
    type: Boolean,
    default: false
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