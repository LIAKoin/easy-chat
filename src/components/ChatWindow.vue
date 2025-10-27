<template>
  <div class="chat-window" ref="ChatWindow">
    <MessageItem
      v-for="(msg, i) in messages"
      :key="i"
      :author="msg.author"
      :text="msg.text"
      :date="msg.date"
      :isOwn="msg.id === currentUserId"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick } from "vue";
  import MessageItem from "./MessageItem.vue";
  import { connectSocket, currentUserId, ChatMessage } from "../services/socket";

  const messages = ref<ChatMessage[]>([]);
  const emit = defineEmits(['scroll-to-bottom'])


  onMounted(() => {
    const socket = connectSocket();
    socket.on("history", async (msgs: ChatMessage[]) => {
      messages.value = msgs;
      console.log(msgs);
      await nextTick();
      emit('scroll-to-bottom', true);
    });
    socket.on("message", async (msg: ChatMessage) => {
      messages.value.push(msg);
      await nextTick();
      emit('scroll-to-bottom', false);
    });

  });
</script>

<style lang="scss" scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
