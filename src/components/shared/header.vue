<script setup>
    import { ref, onMounted } from 'vue';
    import { IonImg, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonItem, IonLabel, } from "@ionic/vue";
    import { useUserStore } from '@/stores/userStore';
    import Firebase from '@/helpers/firebase.js';
    import API from '@/services/API.jsx';
    import { calendarClearOutline, } from 'ionicons/icons';

    let image = ref(null);
    let weather = ref(null);
    let isLoading = ref(true);
    const userStore = useUserStore();
    const center = ref({lat: 38.7862983, lng: -104.722251});

    const props = defineProps({
        image: {
            type: String,
            required: true,
        }
    });

    async function getWeather(){
        isLoading.value = true;
        const response = await API.getWeather(center.value.lat, center.value.lng);
        weather.value = response;
        isLoading.value = false;
    }

    onMounted(async () => {
        image.value = await Firebase.getFileUrl(props.image);
        await getWeather();
    });

</script>

<template>
    <div class="image-container">
        <ion-img class="header-image" :src="image" />
        <div class="header-layer">
            <div class="top-right" v-if="!isLoading">
                <ion-text><small>Complex Temperature: {{ weather.current.temp_f }}&deg;</small></ion-text>
            </div>
            <div class="bottom-left">
                <ion-grid>
                    <ion-row>
                        <ion-col size="10">
                            <strong><ion-text color="light">{{ userStore.getFamilyName }}</ion-text></strong>, welcome to the 2025 Military Band-Aid!
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="10">
                            <ion-item lines="none">
                                <ion-icon :icon="calendarClearOutline" color="light" slot="start" />
                                <ion-label><small> June 4, 2025 - June 8, 2025</small></ion-label>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="10">
                            <ion-button expand="full" shape="round" fill="outline" color="light" router-link="/schedule">
                                View Schedule
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}
ion-item {
  --background: transparent;
  --border-width: 0;
  --inner-padding-start: 0;
  --inner-padding-end: 0;
  --padding-start: 0;
  --padding-end: 0;
}
</style>