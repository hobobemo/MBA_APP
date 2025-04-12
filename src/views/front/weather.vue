<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, IonSegment, IonHeader, IonToolbar, IonSegmentButton, IonLabel, IonProgressBar, } from '@ionic/vue';
  import { CapacitorHttp } from '@capacitor/core';
  import API from '@/services/API.jsx';
  import Daily from '@/components/weather/daily.vue';
  import Hourly from '@/components/weather/hourly.vue';  
  import Current from '@/components/weather/current.vue';

  const pageType = ref(1);
  const weather = ref({});
  const center = ref({lat: 38.7862983, lng: -104.722251});
  const isLoading = ref(true);

  async function getWeather(){
    isLoading.value = true;
    const response = await API.getWeather(center.value.lat, center.value.lng);
    weather.value = response;
    isLoading.value = false;
  }

  onMounted(() => {
    getWeather();
  });
</script>

<template>
  <ion-page v-if="isLoading">
      <ion-progress-bar type="indeterminate" color="primary" />
  </ion-page>

  <ion-page v-else>
    <ion-header>
      <ion-toolbar color="white">
        <ion-segment :value=1>
          <ion-segment-button :value=1 @click="pageType = 1">
            <ion-label color="secondary">Current</ion-label>
          </ion-segment-button>
          <ion-segment-button :value=2 @click="pageType = 2">
            <ion-label color="secondary">Daily</ion-label>
          </ion-segment-button>
          <ion-segment-button :value=3 @click="pageType = 3">
            <ion-label color="secondary">Hourly</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <Current :current="weather.current" v-if="pageType == 1" />
        <Daily v-for="(item, index) in weather.forecast" :key="index" :daily="item" v-if="pageType == 2" />
        <Hourly v-for="(item, index) in weather.forecast" :key="index" :daily="item" v-if="pageType == 3" />   
    </ion-content>
  </ion-page>

</template>