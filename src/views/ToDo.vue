<template>
  <div class="to-do">
    <div class="to-do-list scrollbar">
      <div class="list" v-if="toDoList.length > 0">
        <ul v-for="todo in toDoList" :key="todo.id">
          <li>
            <input class="edit-input" v-if="isEdit&&editId===todo.id" type="text" v-model="editToDo" @keyup.enter="updateTask(todo.id)" autofocus >
            <span v-else>{{ todo.content.length >= 19 ? todo.content.substring(0, 19) + "..." : todo.content }}</span>
            <div class="date-row">
              <span class="task-date">{{ todo.registerDate }}</span>
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
    <div class="date">{{ selectedDate ? selectedDate : "미선택" }}</div>
    <form class="input-form" @submit="handleSubmit">
      <div class="input-section">
        <input class="new-task-input" type="text" maxlength="100" v-model="newToDo" >
        <button :disabled="!newToDo" class="register-btn">등록</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {emitter} from "@/utils/emitter";
import dayjs from "dayjs";
import {read, remove, update, write} from "@/utils/util-axios";

const selectedDate = ref(dayjs().format("YYYY-MM-DD"));
const newToDo = ref("");
const editToDo = ref("");
const toDoList = ref([]);
const error = ref(null);
const isEdit = ref(false);
const editId = ref(null);
const savedDatesArr = ref([]);

emitter.on("selected-date", (val) => {
  selectedDate.value = val;
});

onMounted(() => {
  getAllTasks();
});

const handleSubmit = (e) => {
  e.preventDefault();
  error.value = null;

  if (selectedDate.value&&newToDo.value) {
    createTask();
  } else {
    if (selectedDate.value === null) error.value = "날짜를 선택해주세요"
    if (newToDo.value === "") error.value = "일정 내용을 입력해주세요"
  }
  newToDo.value = "";
}

const getAllTasks = () => {
  read("/api/tasks", null).then(res => {
    toDoList.value = res.data;
    let arr = [];
    toDoList.value.map(task => {
      arr.push(task.registerDate)
    });
    savedDatesArr.value = arr;
    emitter.emit("saved-dates", savedDatesArr.value);
  });
}

const createTask = () => {
  let newTask = {
    registerDate: selectedDate.value,
    content: newToDo.value
  }
  write("/api/tasks", newTask, null).then(res => {
    toDoList.value = res.data;
    getAllTasks();
  });
}

const deleteTask = (id) => {
  remove(`/api/tasks/${id}`, null).then(() => {
    getAllTasks();
  })
}

const editInput = (id, task) => {
  if (isEdit.value === false) {
    isEdit.value = true;
    editId.value = id;
    editToDo.value = task;
  }
}

const updateTask = (id) => {
  if (editToDo.value !== "") {
    update(`/api/tasks/${id}`, { content: editToDo.value }).then(() => {
      getAllTasks();
      isEdit.value = false;
      editToDo.value = "";
    });
  }
}
</script>

<style scoped>
</style>