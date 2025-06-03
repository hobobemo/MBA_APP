<script setup>
import { IonApp, IonRouterOutlet, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import { database } from '@/firebase.ts';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { ref as dbRef, get, onChildAdded, remove } from 'firebase/database';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import Helper from '@/helpers/firebase.js';

// State
const userStore = useUserStore();
const userLevel = ref(null);
const savedUser = ref(null);
const deferredPrompt = ref(null);
const showInstall = ref(false);

// ✅ Notification logic (hybrid)
function showNotification(noti) {
  if (Capacitor.isNativePlatform()) {
    return LocalNotifications.schedule({
      notifications: [{
        id: noti.id || Date.now(),
        title: noti.title,
        body: noti.body,
        schedule: { at: new Date(Date.now() + 100) },
        smallIcon: 'ic_stat_notify',
      }]
    });
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(noti.title, {
      body: noti.body,
      icon: '/icons/icon-192x192.png'
    });
  }
}

// ✅ Fetch user info
async function getUser(userId) {
  const dataRef = dbRef(database, `users/${userId}`);
  try {
    const snapshot = await get(dataRef);
    userLevel.value = snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// ✅ Watch Firebase for new notifications
function startNotificationWatcher(userId) {
  const notiRef = dbRef(database, `notifications/${userId}`);
  onChildAdded(notiRef, async (snapshot) => {
    const noti = snapshot.val();
    const notiKey = snapshot.key;

    if (!noti || !noti.title || !notiKey) return;

    await showNotification(noti);

    const removeRef = dbRef(database, `notifications/${userId}/${notiKey}`);
    await remove(removeRef);
  });
}

// ✅ User status & login check
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

// ✅ Prompt to install PWA
function installPWA() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    deferredPrompt.value.userChoice.then(() => {
      deferredPrompt.value = null;
      showInstall.value = false;
    });
  }
}

// ✅ Catch browser install event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt.value = e;
  showInstall.value = true;
});

// ✅ On mount
onMounted(async () => {
  await checkUserStatus();

  if ('Notification' in window && Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
});
</script>

<template>
  <ion-app>
    <component :is="$route.meta.layout || 'div'">
      <ion-router-outlet />
      <ion-button v-if="showInstall" @click="installPWA" class="install-button" expand="block">
        Install App
      </ion-button>
    </component>
  </ion-app>
</template>

<style scoped>
.install-button {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 999;
}
</style>
