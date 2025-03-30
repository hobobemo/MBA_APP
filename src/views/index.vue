<script setup>
import { IonPage, IonContent, IonProgressBar, } from '@ionic/vue';
import Header from '@/components/shared/header.vue';
import Fields from '@/components/home/fields.vue';
import Events from '@/components/home/events.vue';
import Section from '@/components/shared/section.vue';
import LatestNews from '@/components/home/latest.vue';

</script>

<template>
  <ion-page>
    <ion-content v-if="isLoading">
      <ion-progress-bar color="primary" type="indeterminate" />
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <Header image="headers/IMG_8666.webp" />

      <Section title="Events" link="/schedule" />
      <Events />

      <Section title="Latest News" link="/blog" />
      <LatestNews />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.seperator-title {
  color: var(--ion-color-primary);
}
</style>
