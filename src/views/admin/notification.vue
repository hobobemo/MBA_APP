<script setup>
   import { ref } from 'vue';
   import { IonPage, IonContent, IonCard, IonCardContent, IonList, IonItem, IonInput, IonTextarea, IonButton,} from '@ionic/vue';
   import { ref as dbRef, push } from "firebase/database";
   import { database } from "@/firebase.ts";

    // Form Data
    let formData = ref({
        id: null,
        title: null,
        body: null,
    });

    async function addNotification(){
        formData.value.id = parseInt(Date.now().toString().slice(-6));
        await push(dbRef(database, "notifications"), formData.value);
        formData.value.title = null;
        formData.value.body = null;
    }

    function changeForm(field, event) {
        formData.value[field] = event.detail.value;
    }
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-card color="white">
                <ion-card-content>
                    <ion-list class="list">
                        <ion-item color="white">
                            <ion-input label="Title" placeholder="Title" @ionInput="changeForm('title', $event)"></ion-input>
                        </ion-item>
                        <ion-item color="white">
                            <ion-textarea label="Body" placeholder="Body" @ionInput="changeForm('body', $event)"></ion-textarea>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
                <ion-button expand="full" @click="addNotification">
                    Send Notification
                </ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>