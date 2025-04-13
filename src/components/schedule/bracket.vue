<script setup>
    import Bracket from '@/components/schedule/brackets.vue';
    import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonTitle, IonText, IonToolbar, IonProgressBar, IonRefresher, IonRefresherContent, } from '@ionic/vue';

    let length = ref(null);
    const pageType = ref(1);

    const props = defineProps({
        items: {
            type: Object,
            required: true,
        }, 
        winner: {
            type: Object,
            required: false,
        },
        loser: {
            type: Object,
            required: false
        }
    });
</script>

<template>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>{{ props.items.info.name }}</ion-title>
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
                <Bracket v-if="pageType == 1" :data="props.winner" />
                <Bracket v-if="pageType == 2" :data="props.loser" />
            </div>
        </ion-content>
</template>