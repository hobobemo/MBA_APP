<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonTitle, IonToolbar, IonProgressBar, IonRefresher, IonRefresherContent, } from '@ionic/vue';
    import { useRoute } from 'vue-router'
    import API from '@/services/API.jsx';
    import Bracket from '@/components/schedule/brackets.vue';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";

    const route = useRoute();
    const pageType = ref(1);
    let length = ref(null);
    let items = ref(null);
    let winner = ref(null);
    let loser = ref(null);
    let isLoading = ref(true);
   
    async function getItems(event, div){
        const winnerResponse = await API.getBracket(event, div, 1);
        winner.value = winnerResponse;

        const loserResponse = await API.getBracket(event, div, 0);
        loser.value = loserResponse;

        isLoading.value = false;
    }

    const watchDatabase = (id) => {
        const dbRef = refer(database, "tournament/active/" + id);
        onValue(dbRef, (snapshot) => {
            items.value = snapshot.val();
            length.value = (items.value.gameCenterMenu[0].ageClasses[0].options.length - 1);
        });
    };

    function handleRefresh(event) {
        setTimeout(() => {
            isLoading.value = true;
            getItems(route.params.event, route.params.div);
            isLoading.value = false;
            event.target.complete();
        }, 2000);
      };

    onMounted(() => {
        watchDatabase(route.params.event);
        getItems(route.params.event, route.params.div);
    });
</script>

<template>
    <ion-page v-if="isLoading">
        <ion-progress-bar type="indeterminate"  />
    </ion-page>
    <ion-page v-else>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>{{ items.info.name }}</ion-title>
            </ion-toolbar>
            <ion-toolbar color="white">
                <ion-segment :value="1" v-if="length > 1">
                    <ion-segment-button :value=1 @click="pageType = 1">
                        <ion-label color="secondary">Winner</ion-label>
                    </ion-segment-button>
                    <ion-segment-button :value=2 @click="pageType = 2">
                        <ion-label color="secondary">Loser</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>

        </ion-header>

        <ion-content :scroll-events="true" :scroll-x="true" :scroll-y="true">
            <ion-refresher slot="fixed" class="custom-refresher" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content />
            </ion-refresher>

            <div v-if="!isLoading">
                <Bracket v-if="pageType == 1" :data="winner" />
                <Bracket v-if="pageType == 2" :data="loser" />
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.custom-refresher {
  --background: #e0e0e0; /* Change background color */
}

.custom-refresher .refresher-pulling {
  --icon-color: #ff4500; /* Change pull icon color */
}

.custom-refresher .refresher-refresh {
  --spinner-color: #007bff; /* Change spinner color */
}
</style>