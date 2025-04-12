<script setup>
    import { ref, onMounted } from 'vue';
    import { IonHeader, IonButtons, IonTitle, IonToolbar, IonButton, IonIcon, IonImg, menuController } from '@ionic/vue';
    import { menuOutline, } from 'ionicons/icons';
    import Logo from '@/assets/logos/text.svg';
    import Login from '@/components/user/login.vue';
    import Cart from '@/components/layouts/cart.vue';
    import { useUserStore } from '@/stores/userStore';
    import AdminIcon from '@/assets/icons/staff.svg';

    const userStore = useUserStore();

    const openMainMenu = async () => {
        await menuController.open('main-menu');
    };

    const openAdminMenu = async () => {
        await menuController.open('admin-menu');
    };

    onMounted(async () => {
        if(!userStore){
            userStore;
        }
    });

</script>

<template>
    <ion-header>
        <ion-toolbar class="ion-text-center" color="primary">

            <Login v-if="!userStore.getAuth" :color="'white'" />
            <ion-buttons slot="start" v-else>
                <ion-button expand="block" @click="openMainMenu()" size="large">
                    <ion-icon slot="icon-only" aria-hidden="true" :icon="menuOutline" size="large" color="white" />
                </ion-button>
            </ion-buttons>

            <ion-title class="toolbar-title" href="/">
                <ion-img :src="Logo" class="header-logo"/>
            </ion-title>

            <ion-buttons v-if="userStore.getLevel > 5" slot="end">
                <ion-button expand="block" @click="openAdminMenu()" size="large">
                    <ion-icon slot="icon-only" aria-hidden="true" :icon="AdminIcon" color="white" />
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<style scoped>
.header-logo {
    height: 50px;
    width: 100%;
    margin: 8px;
}
</style>