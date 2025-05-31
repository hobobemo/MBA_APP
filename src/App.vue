<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { useUserStore } from '@/stores/userStore.js';
import { database } from '@/firebase.ts';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { ref as dbRef, get, onChildAdded, remove } from 'firebase/database';
import { LocalNotifications } from '@capacitor/local-notifications';
import Helper from '@/helpers/firebase.js';

const userStore = useUserStore();
const userLevel = ref(null);
const savedUser = ref(null);

// ✅ Initialize app UI
async function initApp() {
  await StatusBar.setBackgroundColor({ color: "#1C3D67" });
  await SplashScreen.show({ showDuration: 2000, autoHide: true });

  const { display } = await LocalNotifications.requestPermissions();
  if (display !== 'granted') {
    console.warn('Notification permission not granted');
  }
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

// ✅ Start Firebase listener and auto-delete after display
function startNotificationWatcher(userId) {
  const notiRef = dbRef(database, `notifications/${userId}`);

  onChildAdded(notiRef, async (snapshot) => {
    const noti = snapshot.val();
    const notiKey = snapshot.key;

    if (!noti || !noti.title || !notiKey) return;

    await LocalNotifications.schedule({
      notifications: [{
        id: noti.id,
        title: noti.title,
        body: noti.body,
        schedule: { at: new Date(Date.now() + 100) },
        smallIcon: 'ic_stat_notify',
      }]
    });

    console.log('🔔 Local notification shown and removing from DB:', noti);

    // ✅ Remove notification from Firebase after display
    const removeRef = dbRef(database, `notifications/${userId}/${notiKey}`);
    await remove(removeRef);
  });
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

      startNotificationWatcher(user.uid); // 👈 Start DB notification listener
    }
  } catch (error) {
    console.error("Failed to check user status:", error);
  }
}

onMounted(async () => {
  await initApp();
  await checkUserStatus();

  try {
    const { display } = await LocalNotifications.requestPermissions();
    if (display !== 'granted') {
      console.warn('❌ Local notification permission NOT granted');
    } else {
      console.log('✅ Local notification permission granted');
    }
  } catch (err) {
    console.error('⚠️ Failed to request local notification permission:', err);
  }
});
</script>

<template>
  <ion-app>
    <component :is="$route.meta.layout || 'div'">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>