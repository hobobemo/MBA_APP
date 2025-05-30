<script setup>
    import { IonCard, IonList, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonText, } from '@ionic/vue';
    import Helper from '@/helpers/dateHelper.js';

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
<ion-card v-for="(a, i) in props.data.pools" :key="i" class="white-card">
    <ion-card-title color="primary" class="card-light-header ion-padding">Pool: {{ a.pool }}</ion-card-title>
    <ion-card-content>
        <ion-card v-for="(b, j) in a.schedules" :key="j" class="white-card">
            <ion-card-title color="primary" class="card-light-header">{{ Helper.formatDate(b.the_datetime) + '@' + Helper.formatTime(b.the_datetime) }}</ion-card-title>
            <ion-card-subtitle color="primary">{{ b.fieldName }}</ion-card-subtitle>
            <ion-card-content>
                <ion-list class="list">
                    <ion-item color="white">
                        <ion-text slot="start">{{ b.winningTeam }}</ion-text>
                        <ion-text slot="end">{{ b.winnersScore }}</ion-text>
                    </ion-item>
                    <ion-item color="white">
                        <ion-text slot="start">{{ b.losingTeam }}</ion-text>
                        <ion-text slot="end">{{ b.losersScore }}</ion-text>
                    </ion-item>
                </ion-list>
            </ion-card-content>
        </ion-card>
    </ion-card-content>

    <div class="card-stripe-header-1" v-motion-slide-visible-right :delay="400" :duration="200" />
    <div class="card-stripe-header-2" v-motion-slide-visible-right :delay="600" :duration="100" />
    <div class="card-stripe-header-3" v-motion-slide-visible-right :delay="700" :duration="200" />
</ion-card>
</template>

<style scoped>
.white-card {
  --background: #ffffff; /* sets card background to white */
  --ion-card-background: #ffffff; /* fallback for some versions */
}
</style>