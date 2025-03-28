<script setup>
    import { IonImg, IonText, } from "@ionic/vue";

    const props = defineProps({
        title: {
            type: Object,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    });    
</script>

<template>
    <div class="image-container">
        <ion-img class="header-image" :src="props.image" />
        <div class="header-layer">
            <div class="centered">
                <ion-text class="card-title" color="white">{{ props.title }}</ion-text>
            </div>
        </div>
    </div>
</template>

<style scoped>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>