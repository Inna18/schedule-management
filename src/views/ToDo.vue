<template>
  <div class="to-do">
    <div class="to-do-list scrollbar">
      <div class="list" v-if="toDoList.length > 0">
        <ul v-for="todo in toDoList" :key="todo.id">
          <li :id="`input-sec-${todo.id}`">
            <input class="edit-input"
                   v-if="isEdit&&editId===todo.id"
                   type="text" v-model="editToDo"
                   @keyup.enter="updateTask(todo.id, todo.content)"
                   maxlength="100"
                   autofocus >
            <span v-else>{{ todo.content.length >= 19 ? todo.content.substring(0, 19) + "..." : todo.content }}</span>
            <div class="date-row">
              <span class="task-date">{{ formatDate(todo.registerDate) }}</span>
              <div class="task-icon-edit" @click="editInput(todo.id, todo.content)"><img src="@/assets/icon/edit.svg" alt="edit-icon"></div>
              <div class="task-icon-delete" @click="deleteTask(todo.id)"><img src="@/assets/icon/trash.svg" alt="trash-icon"></div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="empty-list">
        <div>등록된 일정이 없습니다.</div>
      </div>
    </div>
    <div class="date">{{ taskRegisterDate ? taskRegisterDate : "미선택" }}</div>
    <form class="input-form" @submit="handleSubmit">
      <div class="input-section">
        <input class="new-task-input" type="text" maxlength="100" v-model="newToDo" >
        <button :disabled="!newToDo.trim()" class="register-btn">등록</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
  <Modal v-if="showModal" :content="modalContent" :modal-type="modalType" :key="editId" @show-modal="toggleModal" @confirm-modal="confirmModal"/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {emitter} from "@/utils/util-emitter";
import dayjs from "dayjs";
import {read, remove, update, write} from "@/utils/util-axios";
import Modal from "@/components/modal/Modal.vue";

const selectedDate = ref(dayjs().format("YYYY-MM-DD"));
const taskRegisterDate = ref(dayjs().format("YYYY-MM-DD"));
const newToDo = ref("");
const editToDo = ref("");
const toDoList = ref([]);
const error = ref(null);
const isEdit = ref(false);
const editId = ref(null);
const savedDatesArr = ref([]);
const deleteId = ref(null);

const showModal = ref(false);
const modalContent = ref("");
const modalType = ref("");


emitter.on("selected-date", (val) => {
  selectedDate.value = val;
  taskRegisterDate.value = selectedDate.value
});
emitter.on("month-changed", (val) => {
  selectedDate.value = val.format("YYYY-MM-DD");
  getAllTasks();
})

onMounted(() => {
  getAllTasks();
});

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD")
}

const handleSubmit = (e) => {
  e.preventDefault();
  error.value = null;

  if (taskRegisterDate.value && newToDo.value.trim() !== "") {
    createTask();
  } else {
    if (taskRegisterDate.value === null) error.value = "날짜를 선택해주세요"
    if (newToDo.value === "") error.value = "일정 내용을 입력해주세요"
  }
}

const getAllTasks = () => {
  let year = Number(dayjs(selectedDate.value).year());
  let month = Number(dayjs(selectedDate.value).month() + 1) < 10 ? `0${Number(dayjs(selectedDate.value).month() + 1)}`: Number(dayjs(selectedDate.value).month() + 1);
  let lastDayOdMonth = dayjs(selectedDate.value).daysInMonth();
  read("/api/tasks", { start: `${year}-${month}-01`, end: `${year}-${month}-${lastDayOdMonth}` }).then(res => {
    toDoList.value = res.data.data;
    let arr = [];
    toDoList.value.map(task => {
      arr.push(dayjs(task.registerDate).format("YYYY-MM-DD"))
    });
    savedDatesArr.value = arr;
    emitter.emit("saved-dates", savedDatesArr.value);
  });
}

const createTask = () => {
  showModal.value = true;
  modalContent.value = "일정을 저장하시겠습니까?"
  modalType.value = "저장"
}

const confirmModal = ({confirm, type}) => {
  // 저장 && 수정
  if (confirm === true && type === "저장") {
    let newTask = {
      registerDate: taskRegisterDate.value,
      content: newToDo.value
    }
    write("/api/tasks", newTask, null).then(() => {
      getAllTasks();
      showModal.value = false;
      newToDo.value = "";
    });
  }

  // 삭제
  if (confirm === true && type === "삭제") {
    remove(`/api/tasks/${deleteId.value}`, null).then(() => {
      getAllTasks();
      showModal.value = false;
      deleteId.value = null;
    })
  }

  // 수정
  if (confirm === true && type === "수정") {
    if (editToDo.value.trim() !== "") {
      update(`/api/tasks/${editId.value}`, {content: editToDo.value}, null).then(() => {
        getAllTasks();
        showModal.value = false;
        editId.value = null;
        editToDo.value = "";
        isEdit.value = false;
      });
    }
  }
}

const deleteTask = (id) => {
  showModal.value = true;
  modalContent.value = "일정을 삭제하시겠습니까?"
  modalType.value = "삭제"
  deleteId.value = id;
}

const editInput = (id, task) => {
  if (isEdit.value === false) {
    editId.value = id;
    editToDo.value = task;
    isEdit.value = true;
  }
}

const updateTask = (id, content) => {
  if (editToDo.value !== "" && editToDo.value !== content) {
    showModal.value = true;
    modalContent.value = "일정을 수정하시겠습니까?"
    modalType.value = "수정"
    editId.value = id;
  } else { // if press enter when edited text is empty -> old value input
    getAllTasks();
    isEdit.value = false;
    editId.value = null;
  }
}

const toggleModal = ({val}) => {
  showModal.value = val;
  isEdit.value = false;
}
</script>

<style scoped>
</style>