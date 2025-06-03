<script setup>
  import { ref } from 'vue';
  import { useIonRouter, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonImg, IonItem, IonIcon, IonLabel, IonAvatar, IonButton, menuController } from '@ionic/vue';
  import { newspaperOutline, timerOutline, businessOutline, informationCircleOutline, calendarOutline, settingsOutline, logOutOutline } from 'ionicons/icons';
  import { useUserStore } from '@/stores/userStore.js';
  import Footer from '@/components/layouts/footer.vue';

  const userStore = useUserStore();
  const router = useIonRouter();

  const links = [
    { 
      icon: informationCircleOutline,
      href: '/about',
      title: 'About',
      disabled: false,
    }, { 
      icon: timerOutline,
      href: '/history',
      title: 'History',
      disabled: false,
    }, { 
      icon: newspaperOutline,
      href: '/bylaws',
      title: 'Bylaws',
      disabled: false,
    }, { 
      icon: businessOutline,
      href: '/sponsors',
      title: 'Sponsors',
      disabled: false,
    },
  ];

  async function closeMenus() {
    await menuController.close('main-menu');
  }

  async function goTo(value){
    router.push({ path: value });
    await menuController.close('main-menu');
  }

</script>

<template>
  <ion-menu menu-id="main-menu" side="start" contentId="main-content" v-if="userStore.getAuth">

    <ion-header>
      <ion-toolbar class="ion-text-center" color="primary">
        <ion-avatar slot="start" class="ion-padding">
            <ion-img :src="userStore.getImageUrl" />
        </ion-avatar>
        <ion-title>{{ userStore.getFamilyName }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="white" class="menu-container">
      <ion-list class="list">
          <ion-item v-for="link in links" :key="link.title" @click="closeMenus()" color="white" :router-link="link.href" :disabled="link.disabled">
              <ion-icon :icon="link.icon" aria-hidden="true" size="large" slot="start" color="primary"></ion-icon>
              <ion-label color="primary">{{ link.title }}</ion-label>
          </ion-item>
      </ion-list>
      <div class="menu-container-right-stripe-1"></div>
      <div class="menu-container-right-stripe-2"></div>
      <div class="menu-container-right-stripe-3"></div>
    </ion-content>

    <Footer />

  </ion-menu>
</template>

<style scoped>
.footer-list { 
  background: var(--ion-color-primary);
}
.no-shadow-button {
  box-shadow: none !important;
  --box-shadow: none !important;
}
</style>