<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonCardTitle, IonCard, IonCardContent, IonList, IonListHeader, IonItem, IonText, IonGrid, IonRow, IonCol, } from '@ionic/vue';
    import API from '@/services/API.jsx';

    let items = ref([]);

    async function getItems(){
        const response = await API.getFields();
        items.value = response;
    }

    onMounted(async () => {
        getItems();
    })
</script>

<template>
    <ion-page>
        <ion-content>
            <div v-for="(a, i) in items" :key="i">
                <ion-card v-for="(b, j) in a.items" :key="j" class="card-container">
                    <ion-card-title color="primary" class="card-light-header">{{ a.name + ' - ' + b.name }}</ion-card-title>
                    <ion-card-content>
                        <ion-list class="list">
                            <ion-list-header class="ion-text-center" color="primary">Current Game</ion-list-header>
                            <ion-item color="white" lines="none">
                                <ion-text slot="start">Away Team</ion-text>
                                <ion-text slot="end">Home Team</ion-text>
                            </ion-item>
                        </ion-list>
                        <ion-grid>
                            <ion-row>
                                <ion-col cols="6">
                                    <ion-list class="list">
                                        <ion-list-header class="ion-text-center" color="primary">Next Game</ion-list-header>
                                        <ion-item color="white" lines="none">
                                            <ion-text slot="start">Away</ion-text>
                                            <ion-text slot="end">Home</ion-text>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                                <ion-col cols="6">
                                    <ion-list class="list">
                                        <ion-list-header class="ion-text-center" color="primary">Previous Game</ion-list-header>
                                        <ion-item color="white" lines="none">
                                            <ion-text slot="start">Away</ion-text>
                                            <ion-text slot="end">Home</ion-text>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card> 
            </div>
        </ion-content>
    </ion-page>
</template>