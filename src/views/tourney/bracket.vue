<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonRefresher, IonRefresherContent,} from '@ionic/vue';
    import { useRoute } from 'vue-router'
    import API from '@/services/API.jsx';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import Bracket from '@/components/schedule/bracket.vue';
    import Loader from '@/components/shared/loader.vue';

    const route = useRoute();
    let length = ref(null);
    let items = ref(null);
    let winner = ref(null);
    let loser = ref(null);
    let pool = ref(null);
    let isLoading = ref(true);
    let isReleased = ref(null);
   
    async function getItems(event, div, value){
        try{
            const winnerResponse = await API.getBracket(event, div, 1, 1);
            winner.value = winnerResponse;
            isReleased.value = winnerResponse.released;
            if(isReleased.value){
                try {
                    const loserResponse = await API.getBracket(event, div, 0, 1);
                    loser.value = loserResponse;
                } catch (error){
                    isReleased.value = false;
                }
                try {
                    const poolResponse = await API.getBracket(event, div, 0, 0);
                    pool.value = poolResponse;
                } catch (error){
                    isReleased.value = false;
                }
            }
        } catch (error) {
            isReleased.value = false;
        }

        if(value != null){
            value.target.complete();
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

    onMounted(() => {
        watchDatabase(route.params.event);
        getItems(route.params.event, route.params.div, null);
    });
</script>

<template>
    <ion-page>
        <Loader v-if="isLoading" />
        <Bracket v-if="!isLoading && isReleased" :items="items" :winner="winner" :loser="loser" :pool="pool" @refreshData="getItems(route.params.event, route.params.div, $event)"/>
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