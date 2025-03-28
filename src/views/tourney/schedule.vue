<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, IonList, IonListHeader, IonLabel, } from '@ionic/vue';
  import { ref as refer, onValue } from "firebase/database";
  import { database } from "@/firebase.ts";
  import List from '@/components/schedule/list.vue';

  let items = ref(null);

  const watchDatabase = () => {
      const dbRef = refer(database, "tournament/active");
      onValue(dbRef, (snapshot) => {
          items.value = snapshot.val();
      });
  };

  onMounted(() => {
      watchDatabase();
  });
</script>

<template>
  <ion-page>
      <ion-content :fullscreen="true" >
        <ion-list :inset="true" class="list-container" v-motion-slide-visible-bottom :delay="500">
          <ion-list-header class="ion-text-center" color="primary">
              <ion-label class="card-dark-header ion-text-uppercase" v-motion-fade :delay="700">Event Schedule</ion-label>
              <div class="list-header-title-container-stripe-1" v-motion-fade :delay="900" />
              <div class="list-header-title-container-stripe-2" v-motion-fade :delay="1100" />
          </ion-list-header>
          <List v-for="(a, i) in items" :key="i" :item="a" :index="i" />
      </ion-list>
      </ion-content>
  </ion-page>
</template>