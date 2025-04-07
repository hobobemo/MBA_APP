<script setup>
    import { ref } from 'vue';
    import { IonButtons, IonButton, IonIcon, IonContent, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonSpinner, IonNote, IonBadge, IonLabel, } from '@ionic/vue';
    import { cartOutline, closeCircle, closeCircleOutline, } from 'ionicons/icons';
    import { useFoodStore } from '@/stores/foodStore.js';
    import { useUserStore } from '@/stores/userStore.js';
    import API from '@/services/API.jsx';
    import { Browser } from '@capacitor/browser'

    const userStore = useUserStore();
    const foodStore = useFoodStore();
    let isOpen = ref(false);
    let isLoading = ref(false);

    function setOpen(value){
        isOpen.value = value;
    }

    function removeItem(value){
      foodStore.removeItem(value);
    }

    async function checkout() {
      isLoading.value = true;
      try {
        const response = await API.getStoreCheckout(foodStore.items, foodStore.getCartId, userStore.getId);
        await Browser.open({ url: response.payment_link.url });
      } catch (error) {
        console.error('Checkout error:', error);
      } finally {
        isLoading.value = false;
      }
    }
</script>

<template>

    <ion-buttons slot="end">
      <ion-button fill="clear" class="cart-button" @click="setOpen(true)">
        <div class="icon-container">
          <ion-icon :icon="cartOutline" slot="icon-only" />
          <ion-badge color="secondary" class="cart-badge">{{ foodStore.getNumberOfItems }}</ion-badge>
        </div>
      </ion-button>
    </ion-buttons>

    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Cart</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false)">
                <ion-icon slot="icon-only" color="danger" :icon="closeCircleOutline" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list class="list">
            <ion-item lines="none" color="white" v-for="(a, i) in foodStore.items">
              <ion-label slot="start">{{ a.type }} - {{ a.item.name }}</ion-label>
              <ion-label slot="start">${{ (a.item.price_money.amount / 100).toFixed(2) }}</ion-label>
              <ion-button slot="end" fill="clear" @click="removeItem(i)">
                <ion-icon color="primary" slot="icon-only" :icon="closeCircle" />
              </ion-button>
            </ion-item>
        </ion-list>
        <ion-button expand="block" @click="checkout()">
          <template v-if="isLoading">
            <ion-spinner name="dots" />
          </template>
          <template v-else>
            <ion-label>Checkout</ion-label>
            <div v-if="foodStore.getCartTotal > 0">
              <ion-label> - </ion-label>
              <ion-note slot="end"> ${{ foodStore.getCartTotal }}</ion-note>
            </div>
          </template>
        </ion-button>
      </ion-content>
    </ion-modal>
</template>

<style scoped>
  ion-popover {
    --background: var(--ion-color-primary);
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(var(--ion-color-black-rgb), 0.6);
    --color: white;
    --width: 80%;
  }

  ion-popover ion-content {
    --background: var(--ion-color-white);
  }

  ion-popover::part(backdrop) {
    background-color: var(--ion-color-primary);
  }

  .popup-card {
    color: #3399cc;
  }

  .cart-button {
    position: relative;
  }

  .icon-container {
    position: relative;
    display: inline-block;
  }

  .cart-badge {
    position: absolute;
    top: -2px;
    right: -4px;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
  }

</style>