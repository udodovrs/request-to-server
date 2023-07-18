// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAWIfMCd8pUHIXRC_AnEviSLF2unQRi7Yk',
	authDomain: 'todosproject-e5629.firebaseapp.com',
	projectId: 'todosproject-e5629',
	storageBucket: 'todosproject-e5629.appspot.com',
	messagingSenderId: '187514436345',
	appId: '1:187514436345:web:530a6516b92b617cd70028',
	databaseURL:
		'https://todosproject-e5629-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
