<script setup>
  import { ref } from 'vue';
  import { IonPage, IonContent, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonIcon, } from "@ionic/vue";
  import { useRoute } from 'vue-router';
  import Header from '@/components/blog/article.vue';
  import Image from '@/assets/field.svg';

  const route = useRoute()
  const id = route.params.id;


</script>

<template>
  <ion-page>
      <ion-content :fullscreen="true" >
        <Header :title="'Field ' + id" :image="Image" />
        <ion-card color="white">
          <ion-card-content>
            <ion-list class="list">
              <ion-item color="white" lines="none">
                Current Game
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </ion-content>
  </ion-page>
</template>