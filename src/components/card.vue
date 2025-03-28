<script setup>
    import { onMounted } from 'vue';
    import { IonCard, IonCardContent, IonText, IonImg, IonCardHeader, IonCardSubtitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonIcon, } from '@ionic/vue';
    import { ref as storRef, getDownloadURL } from "firebase/storage";
    import { storage } from "@/firebase.ts"; 
    import { calendarOutline, personOutline } from 'ionicons/icons';

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
    });

    async function fetchImage(item) {
        try {
            props.item.image = await getDownloadURL(storRef(storage, item.image));
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    function formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    }

    onMounted(() => {
        fetchImage(props.item);
    })
</script>

<template>
    <ion-card color="white" :router-link="'/article/' + props.item.key" v-motion-slide-visible-bottom>
        <div class="card-image-container">
            <div class="image-top-stripe-1" v-motion-slide-visible-once-right :delay="200"></div>
            <div class="image-top-stripe-2" v-motion-slide-visible-once-right :delay="400"></div>
            <div class="image-top-stripe-3" v-motion-slide-visible-once-right :delay="600"></div>
            <ion-img height="200px" class="card-header-image" :src="props.item.image" />
            <div class="card-header-layer">
                <div class="centered">
                    <ion-text class="card-title" color="white">{{ props.item.title }}</ion-text>
                </div>
            </div>
            <div class="image-bottom-stripe-1" v-motion-slide-visible-once-left :delay="300"></div>
            <div class="image-bottom-stripe-2" v-motion-slide-visible-once-left :delay="500"></div>
            <div class="image-bottom-stripe-3" v-motion-slide-visible-once-left :delay="700"></div>
        </div>
        <ion-card-header>
            <ion-card-subtitle>
                <ion-grid>
                    <ion-row>
                        <ion-col size="6">
                            <ion-item color="white" lines="none">
                                <ion-icon :icon="personOutline" size="small" slot="start" color="medium" />
                                <ion-label class="card-header">John Karagiannes</ion-label>
                            </ion-item>
                        </ion-col>
                        <ion-col size="6">
                            <ion-item color="white" lines="none">
                                <ion-icon :icon="calendarOutline" size="small" slot="start" color="medium" />
                                <ion-label class="card-header">{{ formatDate(props.item.timestamp) }}</ion-label>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            {{ props.item.content }}
        </ion-card-content>
    </ion-card>
</template>

<style scoped>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-header {
    font-size: .75rem;
    color: var(--ion-color-medium);
}
</style>