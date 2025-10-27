<template>
  <label for="MessageInput" class="label">{{ username }}</label>
  <form id="MessageInput" class="input" @submit.prevent="sendMessage">
    <input
      class="input__field"
      v-model="message"
      placeholder="Введите сообщение..."
    />
    <button class="input__button" type="submit">Отправить</button>
  </form>
</template>
  
<script setup lang="ts">
  import { ref } from "vue";
  import { getSocket, connectSocket, currentUserId } from "../services/socket";
  import { generateUsername } from "../services/username";

  connectSocket();

  const message = ref("");
  const username = generateUsername();

  function sendMessage() {
    if (!message.value.trim()) return;

    getSocket().emit("message", {
      id: currentUserId,
      author: username,
      text: message.value,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    message.value = "";
  }
</script>
  
<style lang="scss" scoped>
  .label {
    display: inline-block;
    margin-bottom: 10px;
  }

  .input {
    display: flex;
    gap: 0.5rem;

    &__field {
      width: 75%;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: 1px solid #999;
      color: #eee;
      background: none;
      outline: none;

      &:placeholder-shown {
        color: #999;
      }
    }

    &__button {
      background-color: #3a86ff;
      color: #fff;

      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;

      cursor: pointer;

      transition: background-color .3s;

      &:hover {
        background-color: #0062ff;
      }
    }
  }
</style>
  