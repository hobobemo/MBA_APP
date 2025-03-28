<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonListHeader, IonLabel, IonList, IonItemSliding, IonItem, IonAvatar, IonImg, IonItemOptions, IonItemOption, IonIcon, IonNote, } from '@ionic/vue';
    import { ref as dbRef, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import { chevronBackOutline, } from 'ionicons/icons';
    import AdminIcon from '@/assets/icons/staff.svg';
    import StaffIcon from '@/assets/icons/team.svg';
    import SponsorIcon from '@/assets/icons/sponsor.svg';

    let items = ref(null);

    const links = ref([
        {
            title: "Admin",
            href: "/team/",
            color: "secondary",
            icon: AdminIcon
        }, {
            title: "Staff",
            href: "/team/",
            color: "primary",
            icon: StaffIcon
        }, {
            title: "Sponsor",
            href: "/team/",
            color: "tertiary",
            icon: SponsorIcon
        },
    ]);
    
    function fetchData(value) {
        const dataRef = dbRef(database, "users"); // Adjust the path

        onValue(dataRef, async (snapshot) => {
            items.value = snapshot.val();
        });
    };

    console.log(items);

    onMounted(() => {
        fetchData();
    });
</script>

<template>
    <ion-page>
        <ion-content>
            <ion-list :inset="true" class="list-container" v-motion-slide-visible-bottom :delay="500">
                <ion-list-header class="ion-text-center" color="primary">
                    <ion-label class="card-dark-header ion-text-uppercase" v-motion-fade :delay="700">Users</ion-label>
                    <div class="list-header-title-container-stripe-1" v-motion-fade :delay="900" />
                    <div class="list-header-title-container-stripe-2" v-motion-fade :delay="1100" />
                </ion-list-header>
                <ion-item-sliding>
                    <ion-item color="white" v-for="(a, i) in items" :key="i" lines="none">
                        <ion-avatar slot="start">
                            <ion-img :src="a.photoUrl" />
                        </ion-avatar>
                        {{ a.email }}

                        <ion-icon slot="end" v-if="a.level === 10" size="large" :icon="AdminIcon" />
                        <ion-icon slot="end" v-if="a.level === 9" size="large" :icon="StaffIcon" />
                        <ion-icon slot="end" v-if="a.level === 8" size="large" :icon="SponsorIcon" />
                        
                        <ion-icon slot="end" :icon="chevronBackOutline" />
                        
                    </ion-item>

                    <ion-item-options slot="end">
                        <ion-item-option v-for="(c, k) in links" :key="k" :color="c.color" :router-link="c.href">
                            <ion-icon slot="top" :icon="c.icon" />
                            {{ c.title }}
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
        </ion-content>
    </ion-page>
</template>