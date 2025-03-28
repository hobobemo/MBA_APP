<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, } from '@ionic/vue';
  import Header from '@/components/shared/header.vue';
  import API from '@/services/Concessions.jsx';
  import Item from '@/components/food/item.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';

  const pageTitle = ref('Food');
  let items = ref([]);

  async function getItems(){
    const response = await API.getCatalog();
    console.log(response);
    items.value = response.objects;
  }

  onMounted(() => {
    getItems();
  });
</script>

<template>
  <ion-page>
      <ion-content :fullscreen="true" >
        <Header :title="pageTitle" image="headers/IMG_4725.webp" />
        <swiper
          :slides-per-view="2.25"
          :space-between="0"
        >
          <swiper-slide v-for="(item, index) in items" :key="index">
            <Item :item="item" />
          </swiper-slide>
        </swiper>
        
      </ion-content>
  </ion-page>
</template>