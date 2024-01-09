<template>
  <div class="calendar">
    <div class="calendar-container">
      <!--calendar header part-->
      <div class="calendar-header">
        <CalendarMonthSelector :selected-month="selectedMonth" @month-selected="selectMonth" />
      </div>
      <!--calendar grid weekend header-->
      <CalendarWeekdays />
      <!--calendar date grid-->
      <ol class="days-grid">
        <CalendarDaysGrid v-for="day in days" :key="day.date" :day="day" :selected-date="selectedDate" :is-today="day.date===today" :saved="checkSaved(day.date)" />
      </ol>
    </div>
  </div>
</template>

<script setup>
import CalendarMonthSelector from "@/components/calendar/CalendarMonthSelector.vue";
import CalendarWeekdays from "@/components/calendar/CalendarWeekdays.vue";
import CalendarDaysGrid from "@/components/calendar/CalendarDaysGrid.vue";
import {onBeforeMount, ref} from "vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear"
import {emitter} from "@/utils/emitter";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

emitter.on("selected-date", (val) => {
  selectedDate.value = val;
});
emitter.on("saved-dates", (val) => {
  savedDatesArr.value = val;
});

const today = ref(null)
const days = ref([])
const selectedMonth = ref(null);
const selectedDate = ref(dayjs().format("YYYY-MM-DD"));
const daysInMonth = ref(null);
const month = ref(null);
const year = ref(null);
const savedDatesArr = ref([]);

const selectMonth = (newSelectedMonth) => {
  selectedMonth.value = newSelectedMonth;
  setDate();
}

onBeforeMount(() => {
  today.value = dayjs().format("YYYY-MM-DD")
  selectedMonth.value = dayjs();
  setDate();
})

const checkSaved = (date) => {
  if (savedDatesArr.value.length > 0) {
    return savedDatesArr.value.indexOf(date) !== -1;
  } else return false;
}

const setDate = () => {
  month.value = Number(selectedMonth.value.format("M"));
  year.value = Number(selectedMonth.value.format("YYYY"));

  daysInMonth.value = dayjs(selectedMonth.value).daysInMonth();

  days.value = [
    ...previousMonthDays(),
    ...currentMonthDays(),
    ...nextMonthDays()
  ]
}

const getWeekday = (date) => {
  return dayjs(date).weekday();
}

const currentMonthDays = () => {
  return [...Array(daysInMonth.value)].map((day, index) => {
    return {
      date: dayjs(`${year.value}-${month.value}-${index + 1}`).format("YYYY-MM-DD"),
      isCurrentMonth: true
    };
  });
}

const previousMonthDays = () => {
  console.log("prev month: ")
  const firstWeekdayOfMonth = getWeekday(currentMonthDays()[0].date);
  console.log("firstWeekdayOfMonth", firstWeekdayOfMonth)
  const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(1, "month");
  console.log("previousMonth", previousMonth)
  const previousMonthLastSundayDay = dayjs(currentMonthDays()[0].date).subtract(firstWeekdayOfMonth, "day").date();
  console.log("previousMonthLastSundayDay", previousMonthLastSundayDay)

  const daysFromPreviousMonth = firstWeekdayOfMonth ? firstWeekdayOfMonth : 0;
  console.log("daysFromPreviousMonth", daysFromPreviousMonth)

  return [...Array(daysFromPreviousMonth)].map((day, index) => {
    return {
      // month(day) + 1 => month(day) count starts from 0
      date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastSundayDay + index}`).format("YYYY-MM-DD"),
      isCurrentMonth: false
    }
  })
}

const nextMonthDays = () => {
  console.log("next month: ")
  const lastWeekdayOfMonth = getWeekday(currentMonthDays()[currentMonthDays().length-1].date);
  console.log("lastWeekdayOfMonth", lastWeekdayOfMonth)
  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");
  console.log("nextMonth", nextMonth)
  const daysFromNextMonth = 6 - lastWeekdayOfMonth;
  console.log("daysFromNextMonth", daysFromNextMonth)
  return [...Array(daysFromNextMonth)].map((day, index) => {
    return {
      // month(day) + 1 => month(day) count starts from 0
      date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
      isCurrentMonth: false
    };
});
}
</script>

<style scoped>
</style>