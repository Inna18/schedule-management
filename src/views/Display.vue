<template>
  <div class="display">
    <div class="title-main">
      <h1>
        <span class="title-1">my</span>
        <span class="title-2">Todo</span>
      </h1>
    </div>
    <Calendar />
    <ToDo />
  </div>
</template>

<script setup>
import Calendar from "@/components/calendar/Calendar.vue";
import ToDo from "@/views/ToDo.vue";

</script>

<style scoped>
</style>