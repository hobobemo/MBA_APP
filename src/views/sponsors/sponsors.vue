<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonList, } from '@ionic/vue';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts"; 
    import LearnMore from '@/components/sponsors/learnMore.vue';
    import Item from '@/components/sponsors/item.vue';

    let items = ref(null);

    const watchDatabase = () => {
        const dbRef = refer(database, "front/sponsors");
        onValue(dbRef, (snapshot) => {
            items.value = snapshot.val();
        });
    };

    onMounted(() => {
        watchDatabase();
    });
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-list class="list">
                <Item v-for="(a, i) in items" :key="i" :sponsor="a" v-motion-slide-visible-once-bottom />
            </ion-list>  
        </ion-content>
    </ion-page>
</template>