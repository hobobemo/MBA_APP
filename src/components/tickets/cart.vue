<script setup>
    import { IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonBadge} from '@ionic/vue';
    import { cartOutline } from 'ionicons/icons';
    import { useTicketsStore } from '@/stores/ticketsStore';

    const ticketsStore = useTicketsStore();
</script>

<template>
    <ion-grid>
        <ion-row class="ion-align-items-end">
            <ion-col>
                <ion-button router-link="/checkout">
                    <ion-icon :icon="cartOutline" slot="start" />
                    <ion-text>Checkout</ion-text>
                    <ion-badge color="light" slot="end">${{ ticketsStore.getCartTotal }}</ion-badge>
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>