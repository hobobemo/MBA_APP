<script setup>
  import { ref, onMounted } from 'vue';
  import { ref as refer, onValue } from "firebase/database";
  import { database } from "@/firebase.ts"; 
  import { IonPage, IonContent, } from '@ionic/vue';
  import { useRoute } from 'vue-router'
  import Division from '@/components/teams/teamListHeader.vue';

  const route = useRoute()
  const id = route.params.id;

  let items = ref(null);
  let isLoading = ref(true);

  const watchDatabase = () => {
      const dbRef = refer(database, "tournament/" + id);
      onValue(dbRef, (snapshot) => {
          items.value = snapshot.val();
      });
      isLoading.value = false;
  };

  onMounted(() => {
      watchDatabase();
  });
</script>

<template>
  <ion-page>
      <ion-content :fullscreen="true" v-if="!items == null">
        <Division v-if="!isLoading" :division="items.info" :teams="items.lwcDivisions[0].teams" />    
      </ion-content>
  </ion-page>
</template>