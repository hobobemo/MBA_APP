<script setup>
  import { IonCard, IonCardHeader, IonAvatar, IonImg, IonCardTitle, IonCardSubtitle, } from '@ionic/vue';
  import { Browser } from '@capacitor/browser';
  import Helper from '@/helpers/firebase.js';

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });

  async function openPDF(value){
    return await Browser.open({ url: await Helper.getFileUrl(value) });
  }
</script>

<template>
  <ion-card color="white" @click="openPDF(props.item.link)">             
    <ion-card-header>
      <div class="ion-align-items-center ion-justify-content-start" style="display: flex; gap: 1rem;">
        <ion-avatar>
          <ion-img :src="props.item.image" />
        </ion-avatar>
        <div>
          <ion-card-title>{{ props.item.title }}</ion-card-title>
          <ion-card-subtitle>{{ props.item.subtitle }}</ion-card-subtitle>
        </div>
      </div>
    </ion-card-header>
    <div class="card-stripe-header-1" v-motion-slide-visible-right :delay="400" :duration="200" />
    <div class="card-stripe-header-2" v-motion-slide-visible-right :delay="600" :duration="100" />
    <div class="card-stripe-header-3" v-motion-slide-visible-right :delay="700" :duration="200" />
  </ion-card>
</template>