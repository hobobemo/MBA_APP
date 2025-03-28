<script setup>
    import { IonFooter, IonList, IonItem, IonIcon, menuController, useIonRouter, IonText,  } from '@ionic/vue';
    import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
    import { logOutOutline } from 'ionicons/icons';
    import { useUserStore } from '@/stores/userStore';

    const userStore = useUserStore();
    const router = useIonRouter();

    async function closeMenus() {
        await FirebaseAuthentication.signOut();
        await menuController.close('main-menu');
        await menuController.close('user-menu');
        userStore.logout();
        router.push({ path: '/about' })
    }
</script>

<template>
    <ion-footer>
      <ion-list class="list">
          <ion-item @click="closeMenus()" color="primary">
                <ion-text><small>Military Band-Aid 2024-2025</small></ion-text>
              <ion-icon :icon="logOutOutline" aria-hidden="true" size="large" slot="end" color="light" />
          </ion-item>
      </ion-list>
    </ion-footer>
</template>