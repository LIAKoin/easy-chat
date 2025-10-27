<template>
  <div class="chat">
    <div class="chat__window" ref="chatWindow">
      <ChatWindow @scroll-to-bottom="scrollToBottom"/>
    </div>
    <div class="chat__input">
      <MessageInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChatWindow from "./components/ChatWindow.vue";
import MessageInput from "./components/MessageInput.vue";

const chatWindow = ref<HTMLElement | null>(null);

function scrollToBottom(forced: boolean) {
  const chatWindowElem = chatWindow?.value;
  const lastMessageHeight = () => chatWindowElem?.querySelector('.message:last-child')?.clientHeight ?? 0;

  const newHeight = chatWindowElem ? (chatWindowElem.clientHeight + lastMessageHeight()) : 0;

  if(chatWindowElem && (forced || newHeight + 40 > chatWindowElem.scrollHeight - chatWindowElem.scrollTop))
    chatWindowElem.scroll(0, 3**3**3)
}
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1e1e1e;
  color: #fff;

  &__window {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  &__input {
    display: flex;
    flex-direction: column;
    align-items: center;

    border-top: 1px solid #333;
    padding: 1rem;

    > * {
      width: min(700px, 100%);
      max-width: 700px;
    }
  }
}
</style>
