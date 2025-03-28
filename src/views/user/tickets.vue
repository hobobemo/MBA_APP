<script setup>
  import { ref } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';
  import Header from '@/components/shared/header.vue';
  import User from '@/components/tickets/userTickets.vue';

  const pageTitle = ref('Tickets');

</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header :title="pageTitle" image="headers/IMG_8661.webp" />
      <User />
    </ion-content>
  </ion-page>
</template>