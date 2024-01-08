<template>
  <div class="to-do">
    <div class="to-do-list scrollbar">
      <div class="list" v-if="toDoList.length > 0">
        <ul v-for="todo in toDoList" :key="todo">
          <li>
            <input class="edit-input" v-if="isEdit&&editId===todo.id" type="text" v-model="todo.task" @keyup.enter="updateTask(todo.task, todo.id)" autofocus >
            <span v-else>{{ todo.task }}</span>
            <div class="date-row">
              <span class="task-date">{{ todo.date }}</span>
              <div class="task-icon-edit" @click="editTask(todo.id)"><img src="@/assets/icon/edit.svg" alt="edit-icon"></div>
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
import {ref} from "vue";
import {emitter} from "@/utils/emitter";
import dayjs from "dayjs";

const selectedDate = ref(dayjs().format("YYYY-MM-DD"));
const newToDo = ref("");
const toDoList = ref([]);
const error = ref(null);
const isEdit = ref(false);
const editId = ref(null);

emitter.on("selected-date", (val) => {
  selectedDate.value = val;
});

const handleSubmit = (e) => {
  e.preventDefault();
  error.value = null;

  if (selectedDate.value&&newToDo.value) {
    toDoList.value.push({ id: Math.floor(100000 + Math.random() * 900000), date: selectedDate.value, task: newToDo.value });
  } else {
    if (selectedDate.value === null) error.value = "날짜를 선택해주세요"
    if (newToDo.value === "") error.value = "일정 내용을 입력해주세요"
  }
  newToDo.value = "";
}

const deleteTask = (id) => {
  toDoList.value = toDoList.value.filter(task => {
    return task.id !== id;
  });
}

const editTask = (id) => {
  if (isEdit.value === false) {
    isEdit.value = true;
    editId.value = id;
  }
}

const updateTask = (task, id) => {
  if (task !== "") {
    isEdit.value = false;
  }
}

</script>

<style scoped>
.to-do {
    width: 422px;
    margin: 0 auto;
}
.to-do-list {
    height: 190px;
    margin: 20px 0;
    overflow: auto;
}
.to-do-list .list ul {
    padding: 0;
}
.to-do-list .list ul li {
    display: flex;
    justify-content: space-between;
    margin: 0 2px;
    padding: 4px 2px;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 0 0 4px #B6Bfff;
}
.to-do-list .empty-list {
    display: flex;
    height: inherit;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.to-do input {
    width: 300px;
}
.input-section {
    display: flex;
    justify-content: space-between;
}
.error {
    color: crimson;
}
.date {
    display: flex;
    justify-content: center;
    width: 90px;
    padding: 4px;
    background: #B6Bfff;
    font-weight: 600;
    border-radius: 2px;
}
.input-form {
    margin: 10px 0 30px;
}
.input-form .input-section .new-task-input {
    height: 30px;
    width: 80%;
    border: 1px solid #E9E9E9;
}
.input-form .input-section .new-task-input:focus {
    outline-color: #B6Bfff;
}
.register-btn {
    width: 60px;
    border: 2px solid #B6Bfff;
    border-radius: 10px;
    background: #B6Bfff;
}
.date-row {
    display: flex;
    align-items: center;
}
.task-date {
    margin-right: 10px;
}
.task-icon-delete {
    margin-top: 2px;
    cursor: pointer;
}
.task-icon-edit {
    margin-top: 2px;
    margin-right: 6px;
    cursor: pointer;
}
.to-do .to-do-list .list ul li .edit-input {
    width: 60%;
    border: 1px solid #E9E9E9;
}
.to-do .to-do-list .list ul li .edit-input:focus {
    outline-color: #B6Bfff;
}

/* width */
.scrollbar::-webkit-scrollbar {
    width: 10px;
}

/* Track */
.scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.scrollbar::-webkit-scrollbar-thumb {
    background: #B6Bfff;
    border-radius: 4px;
}

/* Handle on hover */
.scrollbar::-webkit-scrollbar-thumb:hover {
    background: #7661FF;
}
</style>