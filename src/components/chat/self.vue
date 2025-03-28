<script setup>
    import { IonButton, IonLabel, IonIcon, IonText, IonNote, } from '@ionic/vue';
    import { closeCircleOutline } from 'ionicons/icons';
    import { remove, ref as dbRef, onValue, } from "firebase/database";
    import { database } from "@/firebase.ts";
    import Helper from '@/helpers/firebase.js';

    const props = defineProps({
        message: {
            type: Object,
            required: true,
        }
    });

    async function deleteMessage(value){
        const messageRef = dbRef(database, 'chat/admins/' + value);
        remove(messageRef).then(() => {
            console.log("Message deleted successfully!");
        }).catch((error) => {
            console.error("Error deleting message: ", error);
        });
    }
</script>

<template>
    <ion-label color="primary">
        <ion-text color="primary" class="h4">{{ props.message.name }}</ion-text>
        <ion-note><small>{{ Helper.formatTimestamp(props.message.timestamp) }}</small></ion-note>
        <ion-text color="black"><p>{{ props.message.text }}</p></ion-text>
    </ion-label>
    <ion-button shape="round" fill="clear" slot="end" @click="deleteMessage(props.message.key)">
        <ion-icon slot="icon-only" :icon="closeCircleOutline" />
    </ion-button>
</template>