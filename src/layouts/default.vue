<script setup>
  import { onMounted } from 'vue';
  import { IonTabs, IonPage, IonRouterOutlet, IonContent } from '@ionic/vue';
  import Toolbar from '@/components/layouts/toolbar.vue';
  import Tabs from '@/components/layouts/tabs.vue';
  import Main from '@/components/layouts/mainmenu.vue';
  import Admin from '@/components/layouts/admin/menu.vue';
  import { useUserStore } from '@/stores/userStore';

  const userStore = useUserStore();

  onMounted(() => {
    if(!userStore){
      userStore;
    }
  });
</script>

<template>
    <Main />
    <Admin />
    <ion-page id="main-content">
      <Toolbar />
      <ion-content class="ion-padding">
        <ion-tabs>
          <ion-router-outlet />
          <Tabs v-if="userStore.auth" />
        </ion-tabs>
      </ion-content>
  </ion-page>
</template> 