<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { useUserStore } from '@/stores/userStore.js';
import { useFoodStore } from '@/stores/foodStore.js';
import { Preferences } from '@capacitor/preferences';
import { database } from '@/firebase.ts';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ref as dbRef, onChildAdded, get } from 'firebase/database';
import Helper from '@/helpers/firebase.js';

const userStore = useUserStore();
const foodStore = useFoodStore();
const userLevel = ref(null);
const savedUser = ref(null);

// ✅ Initialize app UI
async function initApp() {
  await StatusBar.setBackgroundColor({ color: "#1C3D67" });
  await SplashScreen.show({ showDuration: 2000, autoHide: true });
}

// ✅ Fetch user info from Firebase
async function getUser(userId) {
  const dataRef = dbRef(database, `users/${userId}`);
  try {
    const snapshot = await get(dataRef);
    userLevel.value = snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// ✅ Main login logic
async function checkUserStatus() {
  try {
    const response = await FirebaseAuthentication.getCurrentUser();
    if (response?.user) {
      const { user } = response;
      userStore.login(user);
      savedUser.value = await Helper.getUser(user.uid);
      userStore.setLevel(savedUser.value.level);
      await enableNotifications(user.uid);
    }
  } catch (error) {
    console.error("Failed to check user status:", error);
  }
}

onMounted(async () => {
  await initApp();
  await checkUserStatus();
});
</script>

<template>
  <ion-app>
    <component :is="$route.meta.layout || 'div'">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>
