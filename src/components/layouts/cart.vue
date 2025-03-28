<script setup>
    import { ref } from 'vue';
    import { IonButtons, IonButton, IonIcon, IonContent, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem,  } from '@ionic/vue';
    import { cartOutline, closeCircleOutline, } from 'ionicons/icons';

    let isOpen = ref(false);
    const alertButtons = ['Action'];

    function setOpen(value){
        isOpen.value = value;
    }
</script>

<template>
    <ion-buttons slot="end">
        <ion-button expand="block" @click="setOpen(true)">
            <ion-icon slot="icon-only" size="large" :icon="cartOutline" />
        </ion-button>
    </ion-buttons>

    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Cart</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false)">
                <ion-icon slot="icon-only" color="danger" :icon="closeCircleOutline" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list class="list">
            <ion-item lines="none" color="white">
                Item 1
            </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
</template>

<style scoped>
  ion-popover {
    --background: var(--ion-color-primary);
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(var(--ion-color-black-rgb), 0.6);
    --color: white;
    --width: 80%;
  }

  ion-popover ion-content {
    --background: var(--ion-color-white);
  }

  ion-popover::part(backdrop) {
    background-color: var(--ion-color-primary);
  }

  .popup-card {
    color: #3399cc;
  }
</style>