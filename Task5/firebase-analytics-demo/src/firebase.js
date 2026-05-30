import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";



const app = initializeApp(firebaseConfig);

// Analytics
export const analytics = getAnalytics(app);

// Remote Config
export const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 10000,
};

remoteConfig.defaultConfig = {
  showNewUI: false,
};

export default app;