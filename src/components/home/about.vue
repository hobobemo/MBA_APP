<script setup>
    import { ref, onMounted } from 'vue';
    import { IonCard, IonImg, IonCardContent, } from '@ionic/vue';
    import Firebase from '@/helpers/firebase.js';

    let imageUrl = ref(null);

    const props = defineProps({
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    });

    onMounted(async () => {
        imageUrl.value = await Firebase.getFileUrl(props.image);
    })
</script>

<template>
    <ion-card color="white" v-motion-slide-visible-bottom :delay="200">
        <div class="image-container">
            <ion-img class="header-image" :src="imageUrl" />
            <div class="about-image-layer"></div>
        </div>
        <ion-card-content>
            {{ props.content }}
        </ion-card-content>
    </ion-card>
</template>

<style scoped>
    .about-image-layer {
        background: linear-gradient(180deg, rgba(var(--ion-color-secondary-rgb), 0.5) 0%, rgba(var(--ion-color-primary-rgb), 0.7) 100%);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
		z-index: 1001;
	}
</style>
