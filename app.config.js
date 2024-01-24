import "dotenv/config";
export default {
  expo: {
    name: "TeleBird",
    slug: "TeleBird",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: "AIzaSyAmzWB78N-XxWrXDPbGFPDvJ38DEfDjVbM",
      authDomain: "telebird-46364.firebaseapp.com",
      projectId: "telebird-46364",
      storageBucket: "telebird-46364.appspot.com",
      messagingSenderId: "313603458075",
      appId: "1:313603458075:web:fb1a3c15167c413b0864be",
    },
  },
};
