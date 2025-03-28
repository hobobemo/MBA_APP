<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, IonHeader, IonToolbar, IonAvatar, IonImg, IonGrid, IonList, IonAccordionGroup, IonAccordion, IonIcon, IonLabel, IonNote, IonRow, IonCol, IonTitle, IonItem, IonChip, IonText, IonProgressBar,  } from '@ionic/vue';
  import { useRoute } from 'vue-router'
  import API from '@/services/API.jsx';
  import { closeCircle, checkmarkCircle } from 'ionicons/icons';

  const route = useRoute()
  const id = route.params.id;

  let item = ref(null);
  let isLoading = ref(true);

  async function getItem(team){
    const response = await API.getTeam(team);
    item.value = response;
    isLoading.value = false;
  }

  onMounted(() => {
    getItem(id);
  });
</script>

<template>
    <ion-page v-if="isLoading">
        <ion-progress-bar type="indeterminate"  />
    </ion-page>
    <ion-page v-else>
      <ion-header>
        <ion-toolbar color="white">
          <ion-avatar slot="start">
            <ion-img :src="item.info.picture" />
          </ion-avatar>
          <ion-title>{{ item.info.name }}</ion-title>
          <ion-note class="ion-padding">{{ item.info.city }}, {{ item.info.state }}</ion-note>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true" >
        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <ion-item color="white" v-motion-slide-right :delay="200">
                <ion-text slot="start" v-motion-pop :delay="300">Ranking</ion-text>
                <ion-chip color="primary" v-motion-pop :delay="350">{{ item.stats.powerRanking }}</ion-chip>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item color="white" v-motion-slide-left :delay="400">
                <ion-text slot="start" v-motion-pop :delay="500">Record</ion-text>
                <ion-chip color="primary" v-motion-pop :delay="550">{{ item.stats.inClassRecord }}</ion-chip>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="6">
              <ion-item color="white" v-motion-slide-right :delay="600">
                <ion-text slot="start" v-motion-pop :delay="700">Points</ion-text>
                <ion-chip color="primary" v-motion-pop :delay="750">{{ item.stats.points }}</ion-chip>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item color="white" v-motion-slide-left :delay="800">
                <ion-text slot="start" v-motion-pop :delay="900">Streak</ion-text>
                <ion-chip color="primary" v-motion-pop :delay="950">{{ item.stats.streak }}</ion-chip>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-accordion-group class="ion-padding">
          <ion-accordion v-for="(a, i) in item.completedGames" :key="i" :value="i">
            <ion-item slot="header" color="primary">
              <ion-label class="card-dark-header ion-text-uppercase" v-motion-fade :delay="1000">{{ a.event }}</ion-label>
                <div class="list-header-title-container-stripe-1" v-motion-fade :delay="1200" />
                <div class="list-header-title-container-stripe-2" v-motion-fade :delay="1400" />
            </ion-item>
            <ion-list class="list" slot="content">
              <ion-item v-for="(b, j) in a.games" :key="j" color="white" lines="full">

                <ion-label>{{ b.opponent }}</ion-label>
                <ion-note>{{ b.wScore }} - {{ b.lScore }}</ion-note>
                <ion-icon v-if="b.result == 'L'" :icon="closeCircle" slot="end" color="danger"/>
                <ion-icon v-else :icon="checkmarkCircle" slot="end" color="success"/>
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group>
        
      </ion-content>
  </ion-page>
</template>