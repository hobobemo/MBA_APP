<script setup>
    import { ref, onMounted } from 'vue';
    import { IonCard, IonCardContent, IonCardTitle, IonButton, IonImg, IonGrid, IonRow, IonCol, } from '@ionic/vue';
    import API from '@/services/Concessions.jsx';
    import { useFoodStore } from '@/stores/foodStore.js';

    const foodStore = useFoodStore();
    let images = ref([]);
    let isLoading = ref(false);

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        }
    });

    async function getImages(){
        if(props.item.item_data.image_ids && props.item.item_data.image_ids.length > 0) {
            props.item.item_data.image_ids.forEach(async (image) => {
                isLoading.value = true;
                const itemImage = await API.getCatalogImage(image);
                images.value.push(itemImage.object.image_data.url);
                isLoading.value = false;
            });
        }
    }

    async function addItem(item){
        foodStore.addItem(item);
    }

    onMounted(() => {
        getImages();
    });

</script>

<template>
<ion-card class="card-container" v-if="!isLoading">
    <ion-img v-if="images.length> 0" :src="images[0]" class="store-image" />
    <ion-card-title color="black">{{ props.item.item_data.name }}</ion-card-title>
    <ion-card-content>
        <ion-button expand="block" fill="outline">Add to Cart</ion-button>
    </ion-card-content>
</ion-card> 
</template>

<style scoped>
.store-image {
    width: 100px;
    height: 100px;
}
</style>