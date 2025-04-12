<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, } from '@ionic/vue';
  import { useRoute } from 'vue-router'
  import { ref as refer, onValue } from "firebase/database";
  import { database } from "@/firebase.ts";
  import Header from '@/components/teams/teamHeader.vue';
  import Info from '@/components/teams/teamInfo.vue';

  const route = useRoute()
  const id = route.params.id;

  let item = ref(null);
  let isLoading = ref(true);

  function watchDatabase(value){
      const dbRef = refer(database, `teams/active/${value}`);
      onValue(dbRef, (snapshot) => {
          item.value = snapshot.val();
      });
  };

  onMounted(() => {
      watchDatabase(id);
      isLoading.value = false;
  });
</script>

<template>
    <ion-page v-if="!isLoading">
      <Header :item="item" />
      <ion-content :fullscreen="true" >
        <Info :item="item" />
      </ion-content>
  </ion-page>
</template>