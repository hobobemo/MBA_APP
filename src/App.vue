<script setup>
  import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';
  import { onMounted } from 'vue';
  import { StatusBar } from '@capacitor/status-bar';
  import { SplashScreen } from '@capacitor/splash-screen';
  import { useUserStore } from '@/stores/userStore.js';
  import { useFoodStore } from '@/stores/foodStore.js';
  import { FCM } from '@capacitor-community/fcm';
  import { PushNotifications } from '@capacitor/push-notifications';
  import { database, auth } from '@/firebase.ts';
  import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
  import { LocalNotifications } from "@capacitor/local-notifications";
  import { ref as dbRef, onChildAdded, remove } from "firebase/database";

  const router = useIonRouter();
  const userStore = useUserStore();
  const foodStore = useFoodStore();

  async function enablePush(){
    if(await PushNotifications.requestPermissions() === 'granted'){
      await PushNotifications.register();

      FCM.setAutoInit({ enabled: true });

      FCM.isAutoInitEnabled().then(r => {

        console.log('Auto init is ' + (r.enabled ? 'enabled' : 'disabled'));
      });

      FCM.getToken().catch(err => console.log(err));

      FCM.subscribeTo({ topic: 'test' })
      .catch(err => console.log(err));
    }
  }
  
  async function initApp(){
    await StatusBar.setBackgroundColor({color: "#1C3D67"});
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  async function checkUserStatus() {
    try {
      const user = await FirebaseAuthentication.getCurrentUser();
      if (user) {
        userStore.login(user.user);
      }
    } catch (error) {

    }
  }

  // Function to listen for new notifications
  function listenForNotifications() {
    const notificationsRef = dbRef(database, `notifications`);

    onChildAdded(notificationsRef, async (snapshot) => {
      const notification = snapshot.val();

      if (notification) {
        // Display local notification
        await LocalNotifications.schedule({
          notifications: [
            {
              id: Date.now(),
              title: notification.title,
              body: notification.body,
              schedule: { at: new Date(Date.now() + 1000) }, // 1 sec delay
              sound: "default",
            },
          ],
        });
      }
    });
  };

  window.handleOpenURL = (url) => {
    try {
      console.log("Raw URL:", url);

      // Manually extract the path after "://"
      const pathStart = url.indexOf('://') + 3;
      const rawPath = url.substring(pathStart); // "payment/success"

      const fullPath = '/' + rawPath;
      console.log("Corrected path:", fullPath);

      router.push(fullPath).catch(err => {
        console.warn('Navigation error:', err);
      });
    } catch (err) {
      console.error('Invalid URL format:', url, err);
    }
  };

  onMounted(() => {
    checkUserStatus();
    initApp();
    if(!foodStore){
      foodStore;
    }
    enablePush();
    listenForNotifications();
  });

</script>

<template>
  <ion-app>
    <component :is="$route.meta.layout || 'div'">
      <ion-router-outlet />
    </component>
  </ion-app>
</template>