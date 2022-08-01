
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYZj_tOzmMU-6bmNvtTt31D2PXu6wO0m0",
  authDomain: "tasks-app-quasar.firebaseapp.com",
  projectId: "tasks-app-quasar",
  storageBucket: "tasks-app-quasar.appspot.com",
  messagingSenderId: "557587761242",
  appId: "1:557587761242:web:c3d4ec955eed919b14f063"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export {
    db
}