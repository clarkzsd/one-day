import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyDBhyKgENEfD7a4jzAvThBzOyKWjKmnKE4',
  authDomain: 'amazing-5f0e0.firebaseapp.com',
  databaseURL: 'https://amazing-5f0e0.firebaseio.com',
  projectId: 'amazing-5f0e0',
  storageBucket: 'amazing-5f0e0.appspot.com',
  messagingSenderId: '940083399833'
};

if (!firebase.app.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};
