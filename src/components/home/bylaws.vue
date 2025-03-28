<script setup>
  import { IonText, } from '@ionic/vue';

  const props = defineProps({
    page: {
      type: Number,
      required: true,
    },
    items: {
        type: Object,
        required: true,
    }
  });
</script>

<template>
  <div v-for="(a, i) in props.items">
      <ion-text v-if="props.page == i" color="primary" >
        <h1 class="ion-padding">{{ a.title }}</h1>
        <p class="ion-padding">{{ a.content }}</p>
      </ion-text>
  </div>
</template>