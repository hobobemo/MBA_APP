<script setup>
    import { ref, onMounted } from 'vue';
    import { IonCard, IonCardContent, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonNote, } from '@ionic/vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts"; 
    import Image from '@/assets/logos/logo.svg';

    let items = ref([]);

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
    <swiper
      :slides-per-view="1.25"
      :space-between="0"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <ion-card color="white" :router-link="'/bracket/' + index + '/' + item.seedingReportDivisions[0].divisionID" v-motion-slide-right>
          <ion-card-content >
              <ion-list color="white" class="list">
                  <ion-item color="white" lines="none">
                      <ion-thumbnail slot="start">
                          <ion-img :src="Image" />
                      </ion-thumbnail>
                      <ion-label>{{ item.info.name }}</ion-label>
                      <ion-note>{{ item.info.dates }}</ion-note>
                  </ion-item>
              </ion-list>
          </ion-card-content>
      </ion-card>
      </swiper-slide>
    </swiper>
</template>