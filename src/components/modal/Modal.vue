<template>
  <div class="backdrop">
    <div class="modal">
      <h3>알림</h3>
      <p>{{ content }}</p>
      <div class="modal-btn">
        <button class="btn btn-cancel" @click="handleCancel">취소</button>
        <button class="btn btn-confirm" @click="handleSave">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  content: {
    type: String
  },
  modalType: {
    type: String
  }
});
const emits = defineEmits(["showModal", "confirmModal"])

const handleCancel = () => {
  emits("showModal", false)
}

const handleSave = () => {
  emits("confirmModal", {confirm: true, type: props.modalType});
}

</script>

<style scoped>
</style>