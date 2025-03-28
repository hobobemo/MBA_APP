<script setup>
import { ref } from 'vue';
import { IonButtons, IonButton, IonIcon, useIonRouter } from '@ionic/vue';
import { logoGoogle } from 'ionicons/icons';
import { auth, database } from '@/firebase';
import { ref as dbRef, update, get } from "firebase/database";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { useUserStore } from '@/stores/userStore.js';

const userStore = useUserStore();
const router = useIonRouter();
let userLevel = ref(null);

async function signInWithGoogle() {
  try {
    const result = await FirebaseAuthentication.signInWithGoogle();
    if (result.credential?.idToken) {
      const credential = GoogleAuthProvider.credential(result.credential.idToken);
      const userCredential = await signInWithCredential(auth, credential);
      await setUser(userCredential.user);
      await getUser(userCredential.user.uid);

      userStore.login(userCredential.user);

      console.log(userLevel.value?.level); // Use optional chaining

      if (userLevel.value?.level) { 
        userStore.setLevel(userLevel.value.level);
      }

      router.push({ path: '/index' });
    }
  } catch (error) {
    console.error("Google Sign-In error:", error);
  }
}

async function getUser(userId) {
  console.log('Fetching user data for:', userId);
  const dataRef = dbRef(database, "users/" + userId);

  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      userLevel.value = snapshot.val();
    } else {
      console.warn("User data not found in database");
      userLevel.value = {}; // Set an empty object to avoid null errors
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function setUser(user) {
  try {
    await update(dbRef(database, `users/${user.uid}`), {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      uid: user.uid,
    });
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}
</script>

<template>
  <ion-buttons slot="start">
    <ion-button expand="block" @click="signInWithGoogle()">
      <ion-icon slot="icon-only" size="large" :icon="logoGoogle" color="white" />
    </ion-button>
  </ion-buttons>
</template>
