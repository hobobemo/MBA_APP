<script setup>
    import { ref, onMounted } from 'vue';
    import { IonImg, IonText, IonItem, IonThumbnail } from '@ionic/vue';
    import Firebase from '@/helpers/firebase.js';

    let image = ref(null);

    const props = defineProps({
        sponsor: {
            type: Object,
            required: true,
        }
    });

    async function getImage(value){
        image.value = await Firebase.getFileUrl(value.logo);
    }

    onMounted(async () => {
        await getImage(props.sponsor);
    });
</script>

<template>
    <ion-item color="white" v-motion-slide-right :delay="200" :href="props.sponsor.href">
        <ion-thumbnail slot="start">
            <ion-img :src="image" />
        </ion-thumbnail>
        <ion-text>{{ props.sponsor.name }}</ion-text>
    </ion-item>
</template>

<style scoped>
  .sponsor-logo {
    --size: 140px;
    --border-radius: 14px;
  }
</style>