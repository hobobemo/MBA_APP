<script setup>
    import { ref } from 'vue';
    import { IonCardContent, IonFooter, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonCard, IonCardTitle, IonContent, IonText, IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue';
    import { addCircleOutline, closeCircleOutline, cartOutline } from 'ionicons/icons';
    import { useTicketsStore } from '@/stores/ticketsStore';
    import Card from '@/components/tickets/addToCartCard.vue';

    const ticketsStore = useTicketsStore();
    const isOpen = ref(false);
    const props = defineProps({
        products: {
            type: Object,
        }
    });

    async function setOpen(value){
        isOpen.value = value;
    }
</script>

<template>
    <ion-card-content>

        <ion-button expand="block" @click="setOpen(true)" class="card-button">
            <ion-icon slot="start" :icon="addCircleOutline" />
            <ion-text>Add to Cart</ion-text>
        </ion-button>

        <ion-modal :is-open="isOpen">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>
                        Shopping Cart
                    </ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="setOpen(false)" size="large">
                            <ion-icon :icon="closeCircleOutline" />
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content class="ion-padding">
                <Card v-for="option in props.products.price.data" :key="option.id" :value="option.id" :price="option" :item="props.products.item" />
            </ion-content>

            <ion-footer class="footer">
                <ion-grid>
                    <ion-row class="ion-align-items-right">
                        <ion-col cols="2" class="ion-text-right">
                            <ion-text color="primary" v-if="!ticketsStore.cart.length > 0">Total: <strong>$0</strong></ion-text>
                            <ion-text color="primary" v-else>Total: <strong>${{ ticketsStore.getCartTotal }}</strong></ion-text>
                        </ion-col>
                    </ion-row>
                    <ion-row v-if="ticketsStore.cart.length > 0">
                        <ion-col cols="12">
                            <ion-button expand="full" router-link="/checkout">
                                <ion-icon :icon="cartOutline" slot="start" />
                                <ion-text>Checkout</ion-text>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-footer>
            
        </ion-modal>
    </ion-card-content>  
</template>