import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.militarybandaid.mobile',
  appName: 'Military Band-Aid',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    },
    CustomURLScheme: {
      scheme: 'bandaid',         // The custom scheme
      url: '',                 // Optional, leave blank for root
      androidHost: 'bandaid',    // Only for Android if needed
    }
  },
};

export default config;
