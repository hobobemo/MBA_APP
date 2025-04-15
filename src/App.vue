<script setup>
import { IonApp, IonRouterOutlet, } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { useUserStore } from '@/stores/userStore.js';
import { useFoodStore } from '@/stores/foodStore.js';
import { Preferences } from '@capacitor/preferences';
import { database } from '@/firebase.ts';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ref as dbRef, onChildAdded, get, set, child } from "firebase/database";
import Helper from '@/helpers/firebase.js';

const userStore = useUserStore();
const foodStore = useFoodStore();
const userLevel = ref(null);
const savedUser = ref(null);

async function initApp() {
  await StatusBar.setBackgroundColor({ color: "#1C3D67" });
  await SplashScreen.show({
    showDuration: 2000,
    autoHide: true,
  });
}

// ✅ This handles login, sets stores, and triggers notifications
async function checkUserStatus() {
  try {
    const response = await FirebaseAuthentication.getCurrentUser();
    if (response?.user) {
      const { user } = response;
      userStore.login(user);
      savedUser.value = await Helper.getUser(user.uid);
      userStore.setLevel(savedUser.value.level);
      await enableNotifications(user.uid); // ✅ pass UID directly
    }
  } catch (error) {
    console.error("Failed to check user status:", error);
  }
}

async function getUser(userId) {
  const dataRef = dbRef(database, "users/" + userId);
  try {
    const snapshot = await get(dataRef);
    userLevel.value = snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function enableNotifications(userId) {
  const permission = await LocalNotifications.requestPermissions();
  if (permission.display !== 'granted') {
    console.warn('Local notification permission not granted');
    return;
  }

  const alertsRef = dbRef(database, 'notifications');
  const seenRef = dbRef(database, `users/${userId}/seenNotifications`);
  const subRef = dbRef(database, `users/${userId}/isSubscribed`);

  // Fetch user's subscribed teams once
  const subSnapshot = await get(subRef);
  const subscriptions = subSnapshot.exists() ? subSnapshot.val() : {};

  onChildAdded(alertsRef, async (snapshot) => {
    try {
      const data = snapshot.val();
      const key = snapshot.key;
      if (!key) return;

      const seenSnapshot = await get(child(seenRef, key));
      if (seenSnapshot.exists()) return;

      // 🟡 Check if the user is subscribed to this notification's team
      const teamId = data.team;
      if (!teamId || !subscriptions[teamId].value) {
        return;
      }

      // 🔔 Show the notification
      await LocalNotifications.schedule({
        notifications: [
          {
            title: data.title || 'New Alert',
            body: data.body || 'Something happened!',
            id: Math.floor(Math.random() * 1000000),
            smallIcon: 'res://ic_stat_notify',
            iconColor: '#1C3D67',
          },
        ],
      });
      await set(child(seenRef, key), true);
    } catch (error) {
      console.error('Error handling notification:', error);
    }
  });
}


onMounted(async () => {
  initApp();
  if (!foodStore) foodStore; // Not sure what this is for, maybe can be cleaned up
  checkUserStatus();
  const { value } = await Preferences.get({ key: 'subscriptions' });
  userStore.setSubscriptions(JSON.parse(value));
});
</script>

<template>
  <ion-app>
    <component :is="$route.meta.layout || 'div'">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>