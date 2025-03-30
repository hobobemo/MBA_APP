<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, IonProgressBar, } from '@ionic/vue';
  import API from '@/services/API.jsx';
  import Item from '@/components/food/item.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';

  const pageTitle = ref('Food');
  let items = ref([]);
  let isLoading = ref(true);

  async function getItems(){
    const response = await API.getStoreCatalog();
    items.value = response.objects;
    isLoading.value = false;
  }

  onMounted(async () => {
    await getItems();
  });
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" v-if="!isLoading">
      <Item v-for="(a, i) in items" :key="i" :item="a" />
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <ion-progress-bar color="primary" type="indeterminate" />
    </ion-content>
  </ion-page>
</template>