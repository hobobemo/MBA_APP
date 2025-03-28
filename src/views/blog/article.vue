<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router'
    import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonIcon} from '@ionic/vue';
    import Header from '@/components/blog/article.vue';
    import { ref as dbRef, onValue } from "firebase/database";
    import { database, storage } from "@/firebase.ts";
    import { ref as storageRef, getDownloadURL } from "firebase/storage";
    import { calendarOutline, personOutline } from 'ionicons/icons';

    const route = useRoute()
    const id = route.params.id;
    const item = ref(null);
    const imageUrl = ref(null);
    let isLoading = ref(true);

    function fetchData(value) {
        const dataRef = dbRef(database, "articles/" + value); // Adjust the path

        onValue(dataRef, async (snapshot) => {
            item.value = snapshot.val();
            await fetchImage(item.value.image);
        });
    };

    async function fetchImage(path) {
        try {
            imageUrl.value = await getDownloadURL(storageRef(storage, path));
            isLoading.value = false;
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleString();
    }

    onMounted(() => {
        fetchData(id);
    });
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true" v-if="!isLoading">
            <Header :title="item.title" :image="imageUrl" />
            <ion-card color="white">
                <ion-card-header>
                    <ion-card-subtitle>
                        <ion-item color="white" lines="none">
                            <ion-icon :icon="calendarOutline" slot="start" size="small" color="medium" />
                            <ion-label class="card-header">{{ formatDate(item.timestamp) }}</ion-label>
                        </ion-item>
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    {{ item.content }}
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>


<style scoped>
.card-header {
    font-size: .75rem;
    color: var(--ion-color-medium);
}
</style>