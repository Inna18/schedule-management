<template>
  <ol class="weekdays">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<script setup>
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
</script>

<style scoped>
  .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
  }
  .weekdays > * {
      text-align: right;
      padding-right: 5px;
  }
  li {
      list-style-type: none;
  }
</style>