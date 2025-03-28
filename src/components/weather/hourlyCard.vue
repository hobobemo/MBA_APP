<script setup>
    import { IonCard, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonImg, IonLabel, IonThumbnail, IonIcon, IonCardContent, IonText } from '@ionic/vue';
    import { paperPlaneOutline, compassOutline, thermometerOutline } from 'ionicons/icons';

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        }
    });

    function createDate(value){
        const d = new Date(value);
        return d.toLocaleString();
    }
</script>

<template>
    <div class="ion-padding" slot="content" >
        <ion-card class="card-container" v-motion-fade-visible :duration="500" :delay="100">
            <ion-card-title color="primary" class="card-light-header" v-motion-roll-visible-once-top :delay="200">
                <ion-text>{{ createDate(props.item.time) }}</ion-text>
            </ion-card-title>

            <ion-card-subtitle v-motion-fade-visible :delay="400">
                <ion-text>Skyview Sports Complex - Colorado Springs, CO</ion-text>
            </ion-card-subtitle>

            <ion-card-content class="card-content">
                <ion-list color="light" lines="none" class="list" >
                    <ion-item color="primary" lines="none" class="card-cover" v-motion-fade-visible :delay="600">
                        <ion-label slot="start" color="light">
                            <h1><strong>{{ props.item.condition.text }}</strong></h1>
                        </ion-label>
                        <ion-label slot="end">
                            <ion-thumbnail>
                                <ion-img :src="props.item.condition.icon" />
                            </ion-thumbnail>
                        </ion-label>
                    </ion-item>
                </ion-list>
                <ion-list class="list">
                    <ion-item color="white" v-motion-slide-visible-right :delay="800">
                        <ion-icon :icon="thermometerOutline" aria-hidden="true" slot="start" color="primary" />
                        <ion-label>{{ props.item.temp_f }}°</ion-label>
                    </ion-item>
                    <ion-item color="white" v-motion-slide-visible-right :delay="1000">
                        <ion-icon :icon="paperPlaneOutline" aria-hidden="true" slot="start" color="primary" />
                        <ion-label>{{ props.item.wind_mph }}°</ion-label>
                    </ion-item>
                    <ion-item color="white" v-motion-slide-visible-right :delay="1200">
                        <ion-icon :icon="compassOutline" aria-hidden="true" slot="start" color="primary" />
                        <ion-label>{{ props.item.wind_dir }}</ion-label>
                    </ion-item>
                </ion-list>
            </ion-card-content>

            <div class="card-stripe-header-1" v-motion-slide-visible-right :delay="400" :duration="200" />
            <div class="card-stripe-header-2" v-motion-slide-visible-right :delay="600" :duration="100" />
            <div class="card-stripe-header-3" v-motion-slide-visible-right :delay="700" :duration="200" />
        </ion-card>
    </div>
</template>