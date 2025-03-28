<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent } from '@ionic/vue';
  import Header from '@/components/shared/header.vue';
  import API from '@/services/Concessions.jsx';

  const pageTitle = ref('Food');
  let items = ref([]);

  async function getItems(){
    const response = await API.getCatalog();
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
        <ion-list>
          <ion-item v-for="(item, index) in items" :key="index">
            <ion-text color="black">{{ item.item_data.name }}</ion-text>
            <ion-list >
              <ion-item v-for="(variation, j) in item.item_data.variations" :key="j">
                <ion-text color="black">{{ variation }}</ion-text>
              </ion-item>
            </ion-list>
            
          </ion-item>
        </ion-list>
       
      </ion-content>
  </ion-page>
</template>