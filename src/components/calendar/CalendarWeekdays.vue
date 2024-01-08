<template>
  <ol class="weekdays">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<script setup>
const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
</script>

<style scoped>
</style>