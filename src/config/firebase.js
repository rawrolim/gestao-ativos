import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDWnpF1MzGpDYgsIPre2135QsrzHMrTuY0",
    authDomain: "gestao-ativos-84e74.firebaseapp.com",
    projectId: "gestao-ativos-84e74",
    storageBucket: "gestao-ativos-84e74.appspot.com",
    messagingSenderId: "619976581266",
    appId: "1:619976581266:web:404010e2b1099c61ab464b"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);