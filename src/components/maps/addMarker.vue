<script setup>
  import { IonFab, IonFabButton, IonIcon, } from "@ionic/vue";
  import { Geolocation } from "@capacitor/geolocation";
  import { addOutline } from 'ionicons/icons';
  import { ref as dbRef, push, set } from "firebase/database";
  import { ref as storageRef, uploadBytes  } from "firebase/storage";
  import { database, storage } from "@/firebase"; 
  import { useUserStore } from '@/stores/userStore.js';

  const userStore = useUserStore();

  // Add this function to your script
  const addCurrentLocationMarker = async () => {
    try {
        // 1. Get current position
        const position = await Geolocation.getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 2. Get the file (you can use a file input)
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.click();

        fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (!file) return;

        const title = prompt("Enter marker title:");
        if (!title) return;

        const iconPath = `icons/${Date.now()}_${file.name}`;
        const storageReference = storageRef(storage, iconPath);

        // 3. Upload icon to Firebase Storage
        await uploadBytes(storageReference, file);

        // 4. Save marker to Firebase Database
        const newMarkerRef = push(dbRef(database, "front/map/markers"));
        await set(newMarkerRef, {
            title,
            icon: iconPath,
            position: { lat, lng }
        });

        alert("Marker added successfully!");
        };
    } catch (error) {
        console.error("Error adding marker:", error);
        alert("Failed to add marker.");
    }
  };
</script>

<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="start" v-if="userStore.getLevel > 9">
        <ion-fab-button @click="addCurrentLocationMarker">
            <ion-icon color="white" :icon="addOutline" />
        </ion-fab-button>
    </ion-fab>
</template>