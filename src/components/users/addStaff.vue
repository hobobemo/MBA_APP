<script setup>
    import { ref, onMounted } from 'vue';
    import { IonPage, IonContent, IonListHeader, IonLabel, IonList, IonItemSliding, IonItem, IonAvatar, IonImg, IonItemOptions, IonItemOption, IonIcon, IonNote, } from '@ionic/vue';
    import { update, ref as dbRef, onValue } from "firebase/database";
    import { database } from "@/firebase.ts";
    import Icon from '@/assets/icons/team.svg';

    const props = defineProps({
        user: {
            type: Object,
            required: true,
        }
    });

    async function setLevel(value){
        update(dbRef(database, "users/" + value.uid), {
            level: 9,
        }).then(() => 
            console.log("Data updated successfully")
        ).catch(error => 
            console.error("Error updating data:", error)
        );
    }
</script>

<template>
    <ion-item-option color="primary" @click="setLevel(props.user)">
        <ion-icon slot="top" :icon="Icon" />
        Staff
    </ion-item-option>
</template>