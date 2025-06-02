<script setup>
import { IonApp, IonRouterOutlet, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { useUserStore } from '@/stores/userStore.js';
import { database } from '@/firebase.ts';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { ref as dbRef, get, onChildAdded, remove } from 'firebase/database';
import { LocalNotifications } from '@capacitor/local-notifications';
import Helper from '@/helpers/firebase.js';

// State
const userStore = useUserStore();
const userLevel = ref(null);
const savedUser = ref(null);

// PWA install logic
const deferredPrompt = ref(null);
const showInstall = ref(false);

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

      startNotificationWatcher(user.uid);
    }
  } catch (error) {
    console.error("Failed to check user status:", error);
  }
}

// ✅ Handle manual install button
function installPWA() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    deferredPrompt.value.userChoice.then((choiceResult) => {
      console.log('User choice:', choiceResult);
      deferredPrompt.value = null;
      showInstall.value = false;
    });
  }
}

// ✅ Capture install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt.value = e;
  showInstall.value = true;
});

onMounted(async () => {
  await checkUserStatus();

  if (Notification && Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }

  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const choice = await deferredPrompt.value.userChoice;
    console.log('Install result:', choice);
    deferredPrompt.value = null;
    showInstall.value = false;
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