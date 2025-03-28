<script setup>
  import { IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/vue';
  import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';

  const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
  });
</script>

<template>
    <ion-row class="ion-text-center">
        <ion-col>
            <ion-text color="primary">{{ props.product.productName }}</ion-text>
        </ion-col>

        <ion-col>
            <ion-text color="primary">{{ props.product.priceName }}</ion-text>
        </ion-col>

        <ion-col>
            <ion-button size="small" shape="round" fill="clear">
                <ion-icon slot="icon-only" :icon="removeCircleOutline" />
            </ion-button>

            <ion-text color="primary">{{ props.product.qty }}</ion-text>

            <ion-button size="small" shape="round" fill="clear" color="primary">
                <ion-icon slot="icon-only" :icon="addCircleOutline" />
            </ion-button>
        </ion-col>

        <ion-col>
            <ion-text color="primary">${{ ((props.product.price * props.product.qty)/ 100).toFixed(2) }}</ion-text>
        </ion-col>
    </ion-row>
</template>