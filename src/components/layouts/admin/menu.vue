<script setup>
  import { ref } from 'vue';
  import { useIonRouter, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, menuController } from '@ionic/vue';
  import { personOutline, documentOutline, locateOutline, walletOutline, notificationsOutline, chatbubblesOutline, } from 'ionicons/icons';
  import { useUserStore } from '@/stores/userStore.js';

  const userStore = useUserStore();
  const router = useIonRouter();

  const links = [
    { 
      icon: chatbubblesOutline,
      href: '/admin/chat',
      title: 'Chat',
      level: 9,
      disabled: false,
    }, { 
      icon: personOutline,
      href: '/admin/users',
      title: 'Users',
      level: 10,
      disabled: false,
    }, { 
      icon: documentOutline,
      href: '/admin/articles',
      title: 'Articles',
      level: 10,
      disabled: false,
    }, { 
      icon: walletOutline,
      href: '/admin/sponsors',
      title: 'Sponsors',
      level: 8,
      disabled: false,
    }, { 
      icon: notificationsOutline,
      href: '/admin/notifications',
      title: 'Notifications',
      level: 10,
      disabled: false,
    },
  ];

  async function closeMenus() {
    await menuController.close('main-menu');
    await menuController.close('admin-menu');
  }

  async function goTo(value){
    router.push({ path: value });
    await menuController.close('main-menu');
    await menuController.close('admin-menu');
  }

</script>

<template>
  <ion-menu menu-id="admin-menu" side="end" contentId="main-content">

    <ion-header>
      <ion-toolbar class="ion-text-center" color="primary">
        <ion-title>Admin Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="white" class="menu-container">
      <ion-list class="list">
          <div v-for="link in links" :key="link.title">
            <ion-item v-if="userStore.getLevel >= link.level"  @click="closeMenus()" color="white" :router-link="link.href" :disabled="link.disabled">
                <ion-label color="primary" slot="end">{{ link.title }}</ion-label>
                <ion-icon :icon="link.icon" aria-hidden="true" size="large" slot="end" color="primary"></ion-icon>
            </ion-item>
          </div>

      </ion-list>
      <div class="menu-container-left-stripe-1"></div>
      <div class="menu-container-left-stripe-2"></div>
      <div class="menu-container-left-stripe-3"></div>
    </ion-content>
  </ion-menu>
</template>

<style scoped>
.footer-list { 
  background: var(--ion-color-primary);
}
</style>