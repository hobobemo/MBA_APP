<script setup>
    import { ref, onMounted } from 'vue';
    import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonImg, IonLabel, IonThumbnail, IonIcon, IonText, } from '@ionic/vue';
    import { arrowUpOutline, arrowDownOutline, sunnyOutline } from 'ionicons/icons';

    const props = defineProps({
        daily: {
            type: Object,
            required: true,
        },
    });

    function createDate(value){
        const d = new Date(value);
        return d.toDateString();
    }

</script>

<template>
    <ion-card class="card-container" v-for="(item, i) in props.daily" :key="i" v-motion-fade-visible :duration="1000" :delay="100">
        <ion-card-title color="primary" class="card-light-header" v-motion-roll-visible-once-top :delay="1200">
            <ion-text>{{ createDate(item.date) }}</ion-text>
        </ion-card-title>

        <ion-card-subtitle v-motion-fade-visible-once :delay="1400">
            <ion-text>Skyview Sports Complex - Colorado Springs, CO</ion-text>
        </ion-card-subtitle>

        <ion-card-content class="card-content">
            <ion-list class="list">
                <ion-item color="primary" lines="none" class="card-cover" v-motion-fade-visible-once :delay="1800">
                    <ion-label slot="start" color="light">
                        <h1><strong>{{ item.day.condition.text }}</strong></h1>
                    </ion-label>
                    <ion-label slot="end">
                        <ion-thumbnail>
                            <ion-img :src="item.day.condition.icon" />
                        </ion-thumbnail>
                    </ion-label>
                </ion-item>
                <ion-list class="list">
                    <ion-item color="white" v-motion-slide-right :delay="2000 + (i * 100)">
                        <ion-icon :icon="arrowUpOutline" aria-hidden="true" slot="start" color="primary" />
                        <ion-label>{{ item.day.maxtemp_f }}°</ion-label>
                    </ion-item>
                    <ion-item color="white" v-motion-slide-right :delay="2200 + (i * 100)">
                        <ion-icon :icon="arrowDownOutline" aria-hidden="true" slot="start" color="primary" />
                        <ion-label>{{ item.day.mintemp_f }}°</ion-label>
                    </ion-item>
                    <ion-item color="white" v-motion-slide-right :delay="2400 + (i * 100)">
                        <ion-icon :icon="sunnyOutline" aria-hidden="true" slot="start" color="primary" />
                        <ion-label>{{ item.astro.sunrise }}</ion-label>
                    </ion-item>
                </ion-list>
            </ion-list>
        </ion-card-content>

        <div class="card-stripe-header-1" v-motion-slide-visible-right :delay="400" :duration="200" />
        <div class="card-stripe-header-2" v-motion-slide-visible-right :delay="600" :duration="100" />
        <div class="card-stripe-header-3" v-motion-slide-visible-right :delay="700" :duration="200" />
    </ion-card>
</template>