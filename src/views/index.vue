<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonContent, IonProgressBar, useIonRouter } from '@ionic/vue';
import Header from '@/components/shared/header.vue';
import Fields from '@/components/home/fields.vue';
import Events from '@/components/home/events.vue';
import Section from '@/components/shared/section.vue';
import LatestNews from '@/components/home/latest.vue';
import { useUserStore } from '@/stores/userStore.js';

const userStore = useUserStore();
const router = useIonRouter();
let isLoading = ref(true);

onMounted(() => {
  isLoading.value = true;

  // Ensure userStore is available and check authentication
  if (!userStore?.auth) {
    router.replace('/about'); // Use `replace` to prevent navigation history issues
  } else {
    router.replace('/index'); // Optional: Ensure they are in `/index` if logged in
  }

  isLoading.value = false;
});
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
