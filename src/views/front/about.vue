<script setup>
    import { IonPage, IonContent, IonText, IonImg, } from '@ionic/vue';
    import { ref, onMounted } from 'vue';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import Firebase from '@/helpers/firebase.js'; 
    import About from '@/components/home/about.vue';

    let items = ref(null);
    let isLoading = ref(true);
    let image = ref(null);

    const watchDatabase = () => {
        const dbRef = refer(database, "front/about");
        onValue(dbRef, (snapshot) => {
          items.value = snapshot.val();
        });
    };

    onMounted(async () => {
        watchDatabase();
        image.value = await Firebase.getFileUrl('headers/IMG_8661.webp');
        isLoading.value = false;
    });
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" >
      <About v-if="!isLoading" v-for="(a, i) in items" :key="i" :content="a.content" :image="a.image" />
      <div class="image-container">
        <ion-img class="header-image" :src="image" />
        <div class="header-layer"></div>
      </div>
      
    </ion-content>
  </ion-page>
</template>