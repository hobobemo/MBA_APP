<script setup>
    import { ref, onMounted } from 'vue';
    import { IonGrid, IonRow, IonCol, IonAvatar, IonImg, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, } from '@ionic/vue';
    import 'swiper/css';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import Image from '@/assets/field.svg';

    let items = ref([
      {
        id: 1,
      }, {
        id: 2,
      }, {
        id: 3,
      }, {
        id: 4,
      }, {
        id: 5,
      }, {
        id: 6
      }
    ]);

    const watchDatabase = () => {
        const dbRef = refer(database, "tournament");
        onValue(dbRef, (snapshot) => {

        });
    };

    onMounted(() => {
        watchDatabase();
    });
</script>

<template>
  <ion-grid>
    <ion-row>
      <ion-col size="6" v-for="(a, i) in items" :key="i">
        <ion-card color="white" :router-link="'/field/' + i" v-motion-pop-visible>
          <div class="avatar-container">
            <ion-avatar>
              <ion-img :src="Image" />
            </ion-avatar>
          </div>
          <ion-card-header>
            <ion-card-title>Field {{ a.id }}</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

ion-avatar {
  width: 64px; /* Adjust the avatar size if needed */
  height: 64px; /* Adjust the avatar size if needed */
}

ion-card-header {
  text-align: center;
}
</style>