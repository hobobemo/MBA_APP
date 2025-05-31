<script setup>
    import { ref, defineEmits } from 'vue';
    import Bracket from '@/components/schedule/brackets.vue';
    import Pool from '@/components/schedule/pool.vue';
    import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, } from '@ionic/vue';

    const emit = defineEmits(['refreshData']);

    function triggerRefresh(value){
        emit('refreshData', value);
    }

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
        },
        pool: {
            type: Object,
            required: false,
        },
    });
</script>

<template>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>{{ props.items.info.name }}</ion-title>
            </ion-toolbar>
            <ion-toolbar color="white">
                <ion-segment :value="1">
                    <ion-segment-button v-if="props.pool.pools" :value="0" @click="pageType = 0">
                        <ion-label color="secondary">Pool</ion-label>
                    </ion-segment-button>
                    <ion-segment-button :value="1" @click="pageType = 1">
                        <ion-label color="secondary">Winner</ion-label>
                    </ion-segment-button>
                    <ion-segment-button :value="2" @click="pageType = 2">
                        <ion-label color="secondary">Loser</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>

        <ion-content :scroll-events="true" :scroll-x="true" :scroll-y="true">
            <div>
                <Pool v-if="pageType == 0" :data="props.pool" />
                <Bracket v-if="pageType == 1" :data="props.winner" />
                <Bracket v-if="pageType == 2" :data="props.loser" />
            </div>
            <ion-refresher slot="fixed" class="custom-refresher" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="triggerRefresh($event)">
                <ion-refresher-content />
            </ion-refresher>
        </ion-content>
</template>