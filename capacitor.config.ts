import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.militarybandaid.mobile',
  appName: 'Military Band-Aid',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    },
    App: {
      scheme: 'bandaid', // custom URL scheme
    },
  },
};

export default config;
