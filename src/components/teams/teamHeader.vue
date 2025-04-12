<script setup>
    import { IonHeader, IonToolbar, IonAvatar, IonImg, IonNote, IonTitle, } from '@ionic/vue';

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <ion-header>
        <ion-toolbar color="white">
            <ion-avatar slot="start">
                <ion-img :src="props.item.info.picture" />
            </ion-avatar>
            <ion-title>{{ props.item.info.name }}</ion-title>
            <ion-note class="ion-padding">{{ props.item.info.city }}, {{ props.item.info.state }}</ion-note>
        </ion-toolbar>
    </ion-header>
</template>