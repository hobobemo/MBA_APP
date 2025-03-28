<script setup>
    import { IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonImg, IonLabel, IonThumbnail, IonIcon, IonText, } from '@ionic/vue';
    import { paperPlaneOutline, compassOutline, thermometerOutline, handLeftOutline, eyeOutline, waterOutline} from 'ionicons/icons';

    const props = defineProps({
        current: {
            type: Object,
            required: true,
        },
    });

    const highlights = [
        {
            icon: thermometerOutline,
            label: props.current.temp_f + "°",
        },{
            icon: paperPlaneOutline,
            label: props.current.wind_mph + " mph",
        }, {
            icon: compassOutline,
            label: props.current.wind_dir,
        }, {
            icon: handLeftOutline,
            label: props.current.feelslike_f + "°",
        }, {
            icon: eyeOutline,
            label: props.current.vis_miles + " miles",
        }, {
            icon: waterOutline,
            label: props.current.humidity + "%",
        }
    ];
</script>

<template>
    <ion-card class="card-container" v-motion-fade-visible :duration="1000" :delay="100">
        <ion-card-title color="primary" class="card-light-header" v-motion-roll-visible-once-top :delay="1200">
            <ion-text>Skyview Sports Complex</ion-text>
        </ion-card-title>

        <ion-card-subtitle v-motion-fade-visible-once :delay="1400">
            <ion-text>Colorado Springs, CO</ion-text>
        </ion-card-subtitle>

        <ion-card-title v-motion-fade-visible-once :delay="1600">
            <ion-item color="primary" lines="none" class="card-cover">
                <ion-label color="light" ><h1><strong>{{ props.current.condition.text }}</strong></h1></ion-label>
                <ion-thumbnail slot="end">
                    <ion-img :src="props.current.condition.icon" />
                </ion-thumbnail>
            </ion-item>
        </ion-card-title>

        <ion-card-content class="card-content">
            <ion-list class="list">
                <ion-item v-for="(item, i) in highlights" :key="i" color="white" v-motion-slide-right :delay="1800 + (i * 100)">
                    <ion-icon :icon="item.icon" aria-hidden="true" slot="start" color="primary" />
                    <ion-label>{{ item.label }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-card-content>

        <div class="card-stripe-header-1" v-motion-slide-visible-right :delay="400" :duration="200" />
        <div class="card-stripe-header-2" v-motion-slide-visible-right :delay="600" :duration="100" />
        <div class="card-stripe-header-3" v-motion-slide-visible-right :delay="700" :duration="200" />
    </ion-card>

</template>