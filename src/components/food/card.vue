<script setup>
    import { ref } from 'vue';
    import { IonCard, IonCardHeader, IonCardTitle, IonButton, IonImg, IonNote, IonLabel, } from '@ionic/vue';
    import { useFoodStore } from '@/stores/foodStore.js';

    const foodStore = useFoodStore();
    let images = ref([]);

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    });

    async function addToCart(value, type){
        foodStore.addItem(value.item_variation_data, type);
    }  
</script>

<template>
    <ion-card color="white" v-motion-slide-right>
        <ion-img v-if="props.image" :src="props.image" />
        <ion-card-header>
            <ion-card-title>{{ props.item.item_data.name }}</ion-card-title>
        </ion-card-header>

        <ion-button v-for="(a, i) in props.item.item_data.variations" :key="i" size="small" fill="clear" @click="addToCart(a, props.item.item_data.name)">
            <ion-label slot="start">{{ a.item_variation_data.name }} - </ion-label>
            <ion-note slot="end"><small>${{ (a.item_variation_data.price_money.amount / 100).toFixed(2) }}</small></ion-note>
        </ion-button>
    </ion-card>
</template>