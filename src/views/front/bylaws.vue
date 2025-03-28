<script setup>
  import { IonPage, IonContent, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, } from '@ionic/vue';
  import { ref, onMounted } from 'vue';
  import { ref as refer, onValue } from "firebase/database";
  import { database } from "@/firebase.ts"; 
  import Bylaw from '@/components/home/bylaws.vue';

  let items = ref(null);
  let isLoading = ref(true);
  const pageType = ref(0);

  const watchDatabase = () => {
      const dbRef = refer(database, "front/bylaws");
      onValue(dbRef, (snapshot) => {
          items.value = snapshot.val();
      });
  };

  function changePageNumber(value){
    pageType.value = value;
  }

  onMounted(() => {
      watchDatabase();
      isLoading.value = false;
  });
</script>

<template>
<ion-page>
    <ion-header>
      <ion-toolbar color="white">
        <ion-segment v-if="!isLoading" :value="0" :scrollable="true">
          <ion-segment-button v-for="(a, i) in items" :key="i" :value="i" @click="changePageNumber(i)">
            <ion-label color="secondary">{{ a.title }}</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Bylaw :page="pageType" :items="items" />
    </ion-content>
  </ion-page>
</template>