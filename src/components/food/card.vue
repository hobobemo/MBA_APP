<script setup>
    import { ref, onMounted } from 'vue';
    import { IonCard, IonCardContent, IonCardTitle, IonButton, IonImg, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonList, IonItem, IonLabel, IonThumbnail,  } from '@ionic/vue';
    import { addCircleOutline } from 'ionicons/icons';

    let images = ref([]);

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    });
</script>

<template>
    <ion-card color="white" v-motion-slide-right>
        <ion-card-content >
            <ion-list color="white" class="list">
                <ion-item color="white" lines="none">
                    <ion-thumbnail slot="start">
                        <ion-img :src="props.image" />
                    </ion-thumbnail>
                    <ion-label>{{ props.item.item_data.name }}</ion-label>
                </ion-item>
            </ion-list>

            <ion-button v-for="(a, i) in props.item.item_data.variations" :key="i" size="small">
                <ion-icon :icon="addCircleOutline" slot="start" />
                <ion-label>{{ a.item_variation_data.name }}</ion-label>
                <ion-note slot="end"><small>${{ (a.item_variation_data.price_money.amount / 100).toFixed(2) }}</small></ion-note>
            </ion-button>
        </ion-card-content>
    </ion-card>
</template>