<script setup>
  import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';
  import { ref, onMounted } from 'vue';
  import { StatusBar } from '@capacitor/status-bar';
  import { SplashScreen } from '@capacitor/splash-screen';
  import { useUserStore } from '@/stores/userStore.js';
  import { useFoodStore } from '@/stores/foodStore.js';
  import { database, auth } from '@/firebase.ts';
  import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
  import { LocalNotifications } from '@capacitor/local-notifications';
  import { ref as dbRef, onChildAdded, remove, update, get, set, child } from "firebase/database";
  import Helper from '@/helpers/firebase.js';

  const router = useIonRouter();
  const userStore = useUserStore();
  const foodStore = useFoodStore();
  let userLevel = ref(null);

  async function initApp(){
    await StatusBar.setBackgroundColor({color: "#1C3D67"});
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  async function checkUserStatus() {
    let savedUser = ref(null);
    try {
      const user = await FirebaseAuthentication.getCurrentUser();
      if (user) { 
        userStore.login(user.user);
        savedUser.value = await Helper.getUser(user.user.uid);
        userStore.setLevel(savedUser.value.level);
      }
    } catch (error) {

    }
  }

  async function getUser(userId) {
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

  async function enableNotifications() {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') {
      console.warn('Local notification permission not granted');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.warn('User not logged in, skipping notifications');
      return;
    }

    const userId = user.uid;
    const alertsRef = dbRef(database, 'notifications');
    const seenRef = dbRef(database, `users/${userId}/seenNotifications`);

    onChildAdded(alertsRef, async (snapshot) => {
      const data = snapshot.val();
      const key = snapshot.key;

      if (!key) return;

      // Check if this notification was already shown
      const seenSnapshot = await get(child(seenRef, key));
      if (seenSnapshot.exists()) {
        return; // Already shown
      }

      // Show the notification
      await LocalNotifications.schedule({
        notifications: [
          {
            title: data.title || 'New Alert',
            body: data.body || 'Something happened!',
            id: Math.floor(Math.random() * 1000000),
            schedule: { at: new Date(Date.now() + 100) },
            smallIcon: 'res://ic_stat_notify',
            iconColor: '#1C3D67',
          },
        ],
      });

      // Mark this notification as seen
      await set(child(seenRef, key), true);
    });
  }

  onMounted(() => {
    initApp();
    if(!foodStore){
      foodStore;
    }
    checkUserStatus();
    enableNotifications();
  });

</script>

<template>
  <ion-app>
    <component :is="$route.meta.layout || 'div'">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>