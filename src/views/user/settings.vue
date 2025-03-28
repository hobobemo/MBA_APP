<script setup>
  import { ref } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';
  import Header from '@/components/shared/header.vue';

  const pageTitle = ref('Settings');
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
          <Header :title="pageTitle" image="headers/IMG_8661.webp" />
        </ion-content>
    </ion-page>
</template>