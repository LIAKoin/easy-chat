<template>
    <div :class="['message', { 'message--own': isOwn }]">
      <div class="message__author">{{ author }}</div>
      <div class="message__text">{{ text }}</div>
      <div class="message__date">{{ date }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    author: string;
    text: string;
    date: string;
    isOwn?: boolean;
  }

  defineProps<Props>();
  </script>
  
  <style lang="scss" scoped>
  .message {
    background: #2a2a2a;
    border-radius: 8px;
    padding: 0.4rem .8rem .2rem;
    width: fit-content;
    max-width: 70%;

    &__author {
      font-size: 0.8rem;
      color: #aaa;
    }

    &__text {
      font-size: 1rem;
      color: #fff;
    }

    &__date {
      font-size: .75rem;
      color: #bbb;
      text-align: right;
    }


    &--own {
      background: #3a86ff;
      margin-left: auto;  // сдвигаем вправо
      
      .message__author {
        display: none;
        color: #fff;
        text-align: right;
      }
    }
  }
  </style>
  