<script setup>
  import { ref } from 'vue';
  import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonAlert, IonText } from '@ionic/vue';
  import Header from '@/components/shared/header.vue';
  import Row from '@/components/tickets/checkoutRow.vue';
  import API from '@/services/API.jsx';

  const pageTitle = ref('Checkout');
  let url = ref(null);
  let postData = ref([]);
  let isOpen = ref(false);

  const headers = [
    {
      title: "Item"
    },{
      title: "Type"
    },{
      title: "Quantity"
    },{
      title: "Total"
    },
  ];

  const alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Continue',
      role: 'confirm',
      handler: () => {
        window.open(url.value, '_blank');
      },
    },
  ]

  async function getCheckoutLink(){
    ticketsStore.getCart.forEach(item => {
      postData.value.push({price: item.priceId, quantity: item.qty});
    });
    const response = await API.getStoreCheckout(postData.value);
    console.log(response);
    isOpen.value = true;
  }
  
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
          <Header :title="pageTitle" image="headers/IMG_1444.webp" />
            <ion-grid>
              <ion-row class="table-header ion-text-center">
                <ion-col v-for="(col, index) in headers" :key="index">
                  <ion-text class="table-header-text" color="primary"><strong>{{ col.title }}</strong></ion-text>
                </ion-col>
              </ion-row>
              <Row v-for="(item, index) in ticketsStore.getCart" :key="index" :product="item" />
              <ion-row class="ion-text-right">
                <ion-col>
                  <ion-text color="black"><strong>Total: ${{ ticketsStore.getCartTotal }}</strong></ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-button expand="full" @click="getCheckoutLink()">
              Checkout
            </ion-button>

            <ion-alert
              :is-open="isOpen"
              header="Process Payment"
              message="Payment Processing will open an external website to complete the transaction."
              :buttons="alertButtons"
              @didDismiss="isOpen == false"
            ></ion-alert>

        </ion-content>
    </ion-page>
</template>

<style scoped>
.table-header{
  background: var(--ion-color-tertiary);
}
.table-header-text{
  color: var(--ion-color-light);
}
</style>