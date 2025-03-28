<script setup>
    import { IonGrid, IonRow, IonCol, IonText, useIonRouter, IonButton,  } from '@ionic/vue';

    const router = useIonRouter();

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: false,
        }
    });

    function goTo(value){
        router.push({ path: value })
    }
</script>

<template>
    <ion-grid>
        <ion-row>
            <ion-col size="8">
                <ion-text color="primary"><strong>{{ props.title }}</strong></ion-text>
            </ion-col>
            <ion-col size="4" v-if="props.link">
                <ion-button size="small" fill="clear" @click="goTo(props.link)">
                    View All
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>