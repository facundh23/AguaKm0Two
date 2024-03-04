import {initializeApp} from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore';

/*
* This is an object containing your Firebase project's configuration settings. Properties like apiKey, authDomain, projectId, etc., are specific to your Firebase project and are used to connect your app with your Firebase database.
* import.meta.env: This syntax suggests you're using environment variables to store your Firebase configuration keys. It's a good practice for keeping your configuration data secure, especially in a public repository.
*
*/
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain:import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID
  };
  
  const app = initializeApp(firebaseConfig); // This function is used to initialize your Firebase application with your project specific configuration.

  const db = getFirestore(app); // This function gets a Firestore instance to interact with your database.

  export { db, collection, addDoc };