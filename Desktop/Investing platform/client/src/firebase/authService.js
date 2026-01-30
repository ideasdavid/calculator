import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

/**
 * Register a new user
 */
export const registerUser = async (email, password, userData) => {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: userData.name || '',
      role: userData.role || 'child',
      age: userData.age || null,
      balance: 10000, // Starting balance
      portfolio: [],
      experience: 0,
      level: 1,
      createdAt: new Date()
    });

    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Get current user data from Firestore
 */
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
