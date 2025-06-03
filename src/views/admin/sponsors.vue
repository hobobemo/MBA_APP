<script setup>
    import { ref } from 'vue';
    import { IonPage, IonContent, IonButton, IonList, IonItem, IonInput, IonTextarea, IonCard, IonCardContent, IonImg, IonToast, IonLabel, IonSelectOption, IonSelect, } from '@ionic/vue';
    import { ref as dbRef, push } from "firebase/database";
    import { database, storage } from "@/firebase.ts";
    import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

    // Form Data
    let formData = ref({
        name: null,
        url: null,
        logo: null,
        timestamp: Date.now(),
    });

    let toast = ref({
        message: null,
        color: null,
    });

    // File handling
    let file = ref(null);
    let previewUrl = ref(null);
    let isUploading = ref(false);
    let isOpen = ref(false);

    // Handle file selection
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            file.value = selectedFile;
            previewUrl.value = URL.createObjectURL(selectedFile);
        }
    }

    // Upload to Firebase Storage and Save in Database
    async function addNewMessage() {
        if (!file.value || !formData.value.name || !formData.value.url ) {
            toast.value = {
                message: "Please complete all fields before submitting.",
                color: "danger"
            };
            setOpen(true);
            return;
        }

        isUploading.value = true;

        try {
            // Upload image to Firebase Storage
            let directory = `sponsors/${Date.now()}_${file.value.name}`;
            const fileRef = storageRef(storage, directory);
            const snapshot = await uploadBytes(fileRef, file.value);
            const downloadUrl = await getDownloadURL(snapshot.ref);

            // Store image URL in formData
            formData.value.logo = directory;

            // Push the data to Firebase Realtime Database
            await push(dbRef(database, "front/sponsors"), formData.value);

            // Reset form
            formData.value = { 
                name: null, 
                url: null, 
                logo: null, 
                timestamp: Date.now() 
            };
            file.value = null;
            previewUrl.value = null;

            toast.value = {
                message: "Sponsor added successfully!",
                color: "success"
            };
            setOpen(true);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            isUploading.value = false;
        }
    }

    function setOpen(state){
        isOpen.value = state;
    };

    // Handle input changes
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
                            <ion-input label="Company" placeholder="Company Name" @ionInput="changeForm('name', $event)"></ion-input>
                        </ion-item>
                        <ion-item color="white">
                            <ion-input label="Website" placeholder="https://www.website.com" @ionInput="changeForm('url', $event)"></ion-input>
                        </ion-item>
                        <ion-item color="white">
                            <input type="file" accept="image/*" @change="handleFileChange" />
                        </ion-item>
                        <ion-item v-if="previewUrl" color="white">
                            <ion-img :src="previewUrl" alt="Preview Image" />
                        </ion-item>
                    </ion-list>
                </ion-card-content>
                <ion-button expand="full" @click="addNewMessage" :disabled="isUploading">
                    {{ isUploading ? "Uploading..." : "Submit" }}
                </ion-button>
            </ion-card>

            <ion-toast
                :is-open="isOpen"
                :message="toast.message"
                :duration="2000"
                @didDismiss="setOpen(false)"
                position="top"
                :color="toast.color"
            ></ion-toast>
            
        </ion-content>
    </ion-page>
</template>
