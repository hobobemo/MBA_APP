<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonToast } from '@ionic/vue';
    import { useFoodStore } from '@/stores/foodStore.js';
    import { useRoute } from 'vue-router'

    const foodStore = useFoodStore();
    const route = useRoute()
    const id = route.params.id;
    let response = ref(null);
    let isOpen = ref(false);

    onMounted(() => {
        foodStore.clearCart();
    });

    function setOpen(value){
        isOpen.value = value;
    }
</script>

<template>
    <ion-page>
        <ion-content>
            <ion-toast :is-open="isOpen" message="Order Successfully Placed" :duration="5000" @didDismiss="setOpen(false)" />
        </ion-content>
    </ion-page>
</template>