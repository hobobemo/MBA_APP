<script setup>
    import { ref } from 'vue';
    import { IonFab, IonFabButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonListHeader, IonItem, IonLabel, } from '@ionic/vue';
    import { helpOutline, closeCircleOutline } from 'ionicons/icons';

    let isOpen = ref(false);

</script>

<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="start">
        <ion-fab-button color="primary" @click="isOpen = true">
            <ion-icon :icon="helpOutline" />
        </ion-fab-button>
    </ion-fab>

    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title class="card-light-header">Sponsorship Information</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isOpen = false">
                <ion-icon :icon="closeCircleOutline" color="danger" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>
          The Military Band-Aid Softball Tournament is the second largest tournament of its kind in the world and will take place May 31 – June 2, 2024, at Sky View Park in Colorado Springs. 
          The event will host up-to 70 teams comprised of active military members and veterans from across the nation including local teams from the Air Force Academy, Peterson Air Force Base, and Fort Carson among others. 
          The event is expected to attract thousands of participants and spectators alike.
        </p>
        <p>
          Get the word out about your products, services, or company by becoming a sponsor. 
          Expo booths, field banners, display opportunities and social media shout outs are available during the five-day event. 
        </p>
        <p>
          Special pricing exists for military, veteran-owned business, and non-profit entities.
        </p>
        <ion-list class="list">
          <ion-list-header class="ion-text-center" color="primary">
            Display/Booths/Banners
          </ion-list-header>
          <ion-item color="white">
            <ion-label>
              Expo Booths
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
</template>