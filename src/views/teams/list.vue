<script setup>
  import { ref, onMounted } from 'vue';
  import { ref as refer, onValue } from "firebase/database";
  import { database } from "@/firebase.ts"; 
  import { IonPage, IonContent, } from '@ionic/vue';
  import Division from '@/components/teams/teamListHeader.vue';

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
      <ion-content :fullscreen="true">
        <Division v-for="(a, i) in items" :key="i" :division="a.info" :teams="a.lwcDivisions[0].teams" />     
      </ion-content>
  </ion-page>
</template>