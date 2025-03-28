<script setup>
import { ref } from 'vue';
import { IonPage, IonContent, IonButton, IonList, IonItem, IonInput, IonTextarea, IonCard, IonCardContent, IonImg, IonToast, } from '@ionic/vue';
import { ref as dbRef, push } from "firebase/database";
import { database, storage } from "@/firebase.ts";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

// Form Data
let formData = ref({
    title: null,
    content: null,
    image: null,
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

// Take photo with Camera Plugin
async function takePhoto() {
    const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt, // Camera, Photos, or Prompt
        quality: 90,
    });

    // Convert to Blob and Upload
    const response = await fetch(image.webPath);
    const blob = await response.blob();
    file.value = new File([blob], `photo_${Date.now()}.jpg`, { type: blob.type });
    previewUrl.value = image.webPath; // For preview
}

// Upload to Firebase Storage and Save in Database
async function addNewMessage() {
    if (!file.value || !formData.value.title || !formData.value.content) {
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
        let directory = `blog/${Date.now()}_${file.value.name}`;
        const fileRef = storageRef(storage, directory);
        const snapshot = await uploadBytes(fileRef, file.value);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        // Store image URL in formData
        formData.value.image = directory;

        // Push the data to Firebase Realtime Database
        await push(dbRef(database, "articles"), formData.value);

        // Reset form
        formData.value = { title: "", content: "", image: "", timestamp: Date.now() };
        file.value = null;
        previewUrl.value = null;

        toast.value = {
            message: "Blog post added successfully!",
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
                            <ion-input label="Title" placeholder="Blog Title" @ionInput="changeForm('title', $event)"></ion-input>
                        </ion-item>
                        <ion-item color="white">
                            <ion-textarea label="Content" placeholder="Blog Post" @ionInput="changeForm('content', $event)"></ion-textarea>
                        </ion-item>
                        <ion-item color="white">
                            <input type="file" accept="image/*" @change="handleFileChange" />
                            <ion-button @click="takePhoto">Take Photo</ion-button>
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
