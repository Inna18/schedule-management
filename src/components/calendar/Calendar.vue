<template>
  <div class="calendar">
    <div class="container">
      <!--calendar header part-->
      <div class="calendar-header">
        <CalendarMonthSelector :selected-month="selectedMonth" @month-selected="selectMonth" />
      </div>
      <!--calendar grid weekend header-->
      <CalendarWeekdays />
      <!--calendar date grid-->
      <ol class="days-grid">
        <CalendarDaysGrid v-for="day in days" :key="day.date&&selectedDate" :day="day" :selected-date="selectedDate" :is-today="day.date===today" />
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
})

const today = ref(null)
const days = ref([])
const selectedMonth = ref(null);
const selectedDate = ref(dayjs().format("YYYY-MM-DD"));
const daysInMonth = ref(null);
const month = ref(null);
const year = ref(null);

const selectMonth = (newSelectedMonth) => {
  selectedMonth.value = newSelectedMonth;

  month.value = Number(selectedMonth.value.format("M"));
  year.value = Number(selectedMonth.value.format("YYYY"));

  daysInMonth.value = dayjs(selectedMonth.value).daysInMonth();

  days.value = [
    ...previousMonthDays(),
    ...currentMonthDays(),
    ...nextMonthDays()
  ]
}

onBeforeMount(() => {
  today.value = dayjs().format("YYYY-MM-DD")
  selectedMonth.value = dayjs();

  month.value = Number(selectedMonth.value.format("M"));
  year.value = Number(selectedMonth.value.format("YYYY"));

  daysInMonth.value = dayjs(selectedMonth.value).daysInMonth();

  days.value = [
    ...previousMonthDays(),
    ...currentMonthDays(),
    ...nextMonthDays()
  ]
})

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
      date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastSundayDay + index}`).format("YYYY-MM-DD"),
      isCurrentMonth: false
    }
  })
}

const nextMonthDays = () => {
  const lastWeekdayOfMonth = getWeekday(currentMonthDays()[currentMonthDays().length-1].date);
  console.log("lastWeekdayOfMonth", lastWeekdayOfMonth)
  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");
  console.log("nextMonth", nextMonth)
  const daysFromNextMonth = lastWeekdayOfMonth ? 6 - lastWeekdayOfMonth : lastWeekdayOfMonth;
  console.log("daysFromNextMonth", daysFromNextMonth)
  return [...Array(daysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
      isCurrentMonth: false
    };
});
}
</script>

<style scoped>
.calendar {
    height: 417px;
}
.container {
    position: relative;
    width: 400px;
    border: solid 1px #E9E9E9;
    border-radius: 20px;
    padding: 10px;
    margin: 0 auto;
}
.calendar-header {
    display: flex;
    justify-content: center;
}
.days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 0;
}
</style>