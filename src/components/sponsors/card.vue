<script setup>
    import { IonCard, IonList, IonCardTitle, IonCardContent, IonText, } from '@ionic/vue';
    import Item from '@/components/sponsors/item.vue';

    const props = defineProps({
        sponsor: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <ion-card>
        <ion-card-title color="primary" class="card-light-header" v-motion-roll-visible-once-top :delay="200">
            <ion-text>{{ props.sponsor.title }}</ion-text>
        </ion-card-title>

        <ion-card-content class="card-content">
            <ion-list class="list">
                <Item v-for="(a, i) in props.sponsor.items" :sponsor="a" />
            </ion-list>
        </ion-card-content>

        <div class="card-stripe-header-1" v-motion-slide-visible-right :delay="400" :duration="200" />
        <div class="card-stripe-header-2" v-motion-slide-visible-right :delay="600" :duration="100" />
        <div class="card-stripe-header-3" v-motion-slide-visible-right :delay="700" :duration="200" />
    </ion-card>
</template>