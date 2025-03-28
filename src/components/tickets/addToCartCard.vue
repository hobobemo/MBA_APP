<script setup>
    import { ref } from 'vue';
    import { IonCard, IonCardTitle, IonText, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonCardSubtitle } from '@ionic/vue';
    import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
    import { useTicketsStore } from '@/stores/ticketsStore';

    const ticketsStore = useTicketsStore();
    const count = ref(0);
    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
        price: {
            type: Object,
            required: true,
        },
    });

    let total = ref(0);

    async function addItem(){
        count.value = (count.value + 1);
        total.value = (props.product.unit_amount_decimal * count.value)
    }

    async function removeItem(){
        count.value = (count.value - 1);
        total.value = (props.product.unit_amount_decimal * count.value)
    }

    async function addToCart(){
        await ticketsStore.addToCart(props.item.id, props.item.name, props.price.id, props.price.unit_amount_decimal, props.price.nickname, count.value,);
    }

</script>

<template>
 <ion-card class="card-container-header">
        <ion-card-title class="card-header-title-container">
            <ion-text color="light">{{ props.price.nickname }}</ion-text>
            <ion-text class="ion-text-right" v-if="total > 0"> - ${{ (total / 100).toFixed(2) }}</ion-text>
            <div class="card-header-title-container-stripe-1"></div>
            <div class="card-header-title-container-stripe-2"></div>
        </ion-card-title>

        <ion-card-content>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col cols="2" class="ion-text-center">
                        <ion-button v-if="count > 0" @click="removeItem()" color="secondary">
                            <ion-icon :icon="removeCircleOutline" size="large"/>
                        </ion-button>
                    </ion-col>
                    <ion-col cols="8" class="ion-text-center">
                        <ion-text><h1>{{ count }}</h1></ion-text>
                    </ion-col>
                    <ion-col cols="2" class="ion-text-center">
                        <ion-button @click="addItem()" color="secondary">
                            <ion-icon :icon="addCircleOutline" size="large" />
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>

        <ion-button v-if="count > 0"@click="addToCart()" class="card-button">
            Add to Cart
        </ion-button>
    </ion-card>
</template>