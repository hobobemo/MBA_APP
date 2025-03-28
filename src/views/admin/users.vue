<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonListHeader, IonLabel, IonList, IonItemSliding, IonItem, IonAvatar, IonImg, IonItemOptions, IonItemOption, IonIcon, IonNote, IonText, } from '@ionic/vue';
    import { ref as dbRef, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import { chevronBackOutline, } from 'ionicons/icons';
    import AddAdmin from '@/components/users/addAdmin.vue';
    import AddStaff from '@/components/users/addStaff.vue';
    import AddSponsor from '@/components/users/addSponsorTeam.vue';

    let items = ref(null);

    function fetchData(value) {
        const dataRef = dbRef(database, "users"); // Adjust the path

        onValue(dataRef, async (snapshot) => {
            items.value = snapshot.val();
        });
    };

    function getLevel(value){
        const item = ref("User");
        switch (value) {
            case 10:
                item.value = "Admin";
                break;
            case 9:
                item.value = "Staff";
                break;
            case 8:
                item.value = "Sponsor Team";
                break;
            default:
                item.value = "User";
        }
        return item;
    }

    onMounted(() => {
        fetchData();
    });
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-list :inset="true" class="list-container" v-motion-slide-visible-bottom :delay="500">
                <ion-list-header class="ion-text-center" color="primary">
                    <ion-label class="card-dark-header ion-text-uppercase" v-motion-fade :delay="700">Users</ion-label>
                    <div class="list-header-title-container-stripe-1" v-motion-fade :delay="900" />
                    <div class="list-header-title-container-stripe-2" v-motion-fade :delay="1100" />
                </ion-list-header>
                <ion-item-sliding v-for="(a, i) in items" :key="i" lines="none">
                    <ion-item color="white">
                        <ion-avatar slot="start">
                            <ion-img :src="a.photoUrl" />
                        </ion-avatar>
                        <ion-text>{{ a.email }}</ion-text>
                        <ion-note slot="end" >{{ getLevel(a.level) }}</ion-note>                        
                        <ion-icon slot="end" :icon="chevronBackOutline" />
                    </ion-item>

                    <ion-item-options slot="end">
                        <AddAdmin :user="a" />
                        <AddStaff :user="a" />
                        <AddSponsor :user="a" />
                    </ion-item-options>

                </ion-item-sliding>
            </ion-list>
        </ion-content>
    </ion-page>
</template>