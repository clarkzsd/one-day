import { auth } from './firebase';

export const createWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  auth.signOut();
};
