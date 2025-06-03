<script setup>
  import { IonPage, IonContent, IonList, IonItem, IonButton, } from '@ionic/vue';
  import { ref, onMounted } from 'vue';
  import Utrip from '@/assets/icons/usssa.svg';
  import BandAid from '@/assets/logos/logo.svg';
  import Bylaws from '@/components/home/bylaws.vue';

  let isLoading = ref(true);

  const items = [
    {
      title: "USSSA",
      subtitle: "Military",
      image: Utrip,
      link: '/bylaws/usssa.pdf'
    }, {
      title: "Band-Aid",
      subtitle: "Combined",
      image: BandAid,
      link: '/bylaws/bandaid.pdf'
    }, {
      title: "Band-Aid",
      subtitle: "COED",
      image: BandAid,
      link: '/bylaws/coed.pdf'
    },  {
      title: "Band-Aid",
      subtitle: "Over 40",
      image: BandAid,
      link: '/bylaws/over40.pdf'
    }
  ];
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Bylaws v-for="(a, i) in items" :key="i" :item="a" v-motion-slide-right :delay="i * 500"/>
    </ion-content>
  </ion-page>
</template>