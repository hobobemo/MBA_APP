<script setup>
    import { ref, onMounted } from "vue";
    import anime from "animejs";
    import { IonCard, IonCardContent, IonCardTitle, IonText, } from '@ionic/vue';
    
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        target: {
            type: Number,
            required: true,
        },
    });

    let animatedNumber = ref(0); // Reactive value to animate

    async function startAnimation() {
        await anime({
            targets: animatedNumber,
            value: props.target,
            duration: 2000,
            easing: "easeOutExpo",
            round: 1,
        });
    };

    onMounted(() => {
        startAnimation();
    });
</script>

<template>
    <ion-card class="card-container ion-text-center">
        <ion-card-title>
            <ion-text class="h1 ion-text-center">{{ Math.round(animatedNumber) }}</ion-text>
        </ion-card-title>
        <ion-card-content>
            <p class="ion-text-center">{{ props.title }}</p>
        </ion-card-content>
    </ion-card>
</template>  

<style scoped>
.h1 {
    font-family: var(--ion-font-family-accent);
    color: var(--ion-color-primary);
    font-size: 42px;
    font-weight: 900;
}
</style>