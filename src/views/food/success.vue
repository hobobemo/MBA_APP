<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonToast, useIonRouter } from '@ionic/vue';
    import { useFoodStore } from '@/stores/foodStore.js';
    import { useUserStore } from '@/stores/userStore.js';
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const foodStore = useFoodStore();
    const userStore = useUserStore();
    const router = useIonRouter();
    const user = route.query.user
    let message = ref(null);
    let isOpen = ref(false);

    onMounted(() => {
        if(userStore.getId == user){
            foodStore.clearCart();
            message.value = "Order Successfully Placed";
            isOpen.value = true;
            setTimeout(() => {
                router.push({ path: '/food' });
            }, 5000) 
        } else {
            message.value = "Error with your cart";
            isOpen.value = true;
            setTimeout(() => {
                router.push({ path: '/food' });
            }, 5000)
        } 
    });

    function setOpen(value){
        isOpen.value = value;
    }
</script>

<template>
    <ion-page>
        <ion-content>
            <ion-toast :is-open="isOpen" position="top" :message="message" :duration="5000" @didDismiss="setOpen(false)" />
        </ion-content>
    </ion-page>
</template>