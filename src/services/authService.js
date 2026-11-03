import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { auth, db } from '../firebase/config'

const saveUserProfile = async (user) => {
  const userRef = doc(db, 'users', user.uid)
  const userSnapshot = await getDoc(userRef)

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      createdAt: serverTimestamp(),
    })
  }
}

export const registerUser = async (displayName, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  const user = userCredential.user

  await updateProfile(user, { displayName })

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    displayName,
    email,
    createdAt: serverTimestamp(),
  })

  return user
}

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  const user = userCredential.user
  await saveUserProfile(user)

  return user
}

export const logoutUser = async () => {
  await signOut(auth)
}
