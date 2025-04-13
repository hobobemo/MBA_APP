<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonTitle, IonText, IonToolbar, IonProgressBar, IonRefresher, IonRefresherContent, } from '@ionic/vue';
    import { useRoute } from 'vue-router'
    import API from '@/services/API.jsx';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import Bracket from '@/components/schedule/bracket.vue';
    import NoBracket from '@/components/schedule/bracketError.vue';
    import Loader from '@/components/shared/loader.vue';

    const route = useRoute();
    let items = ref(null);
    let winner = ref(null);
    let loser = ref(null);
    let isLoading = ref(true);
    let isReleased = ref(null);
   
    async function getItems(event, div){
        try{
            const winnerResponse = await API.getBracket(event, div, 1);
            winner.value = winnerResponse;
            isReleased.value = winnerResponse.released;
            if(isReleased.value){
                try {
                    const loserResponse = await API.getBracket(event, div, 0);
                    loser.value = loserResponse;
                } catch (error){
                    isReleased.value = false;
                }
            }
        } catch (error) {
            isReleased.value = false;
        }
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
    <ion-page>
        <Loader v-if="isLoading" />
        <NoBracket v-if="!isLoading && !isReleased" />
        <Bracket v-if="!isLoading && isReleased" :items="items" :winner="winner" :loser="loser" />
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