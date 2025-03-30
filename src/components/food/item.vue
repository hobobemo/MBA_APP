<script setup>
    import { ref, onMounted } from 'vue';
    import { IonCard, IonCardContent, IonCardTitle, IonButton, IonImg, IonGrid, IonRow, IonCol, } from '@ionic/vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import API from '@/services/API.jsx';
    import Section from '@/components/shared/section.vue';
    import Card from '@/components/food/card.vue';
    import { useFoodStore } from '@/stores/foodStore.js';

    const foodStore = useFoodStore();
    let image = ref(null);
    let isLoading = ref(false);

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        }
    });

    async function getImages(value){
        if(value.item_data?.image_ids[0]){
            const response = await API.getStoreCatalogImage(value.item_data?.image_ids[0]);
            if(response.object){
                image.value = response.object.image_data.url;
            }
        }
    }

    onMounted(() => {
        getImages(props.item);
    })

</script>

<template>
    <Section v-if="props.item?.category_data?.name" :title="props.item?.category_data?.name" />
    <swiper :slides-per-view="1.25" :space-between="0">
        <swiper-slide v-for="(a, i) in props.item?.products?.items" :key="i">
            <Card :item="a" />
        </swiper-slide>
    </swiper>
</template>

<style scoped>
.store-image {
    width: 100px;
    height: 100px;
}
</style>