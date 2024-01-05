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
  .display {
      width: 500px;
      padding: 10px 0;
      border-radius: 20px;
      background: #FFF;
  }
  .display .title-main {
      width: 500px;
  }
  .display .title-main h1 {
      text-align: center;
  }
  .title-1 {
      color: #7661FF
  }
  .title-2 {
      color: #262626
  }
</style>