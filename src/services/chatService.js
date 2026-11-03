import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
} from 'firebase/firestore'

import { db } from '../firebase/config'

export const getOrCreateConversation = async (currentUserId, otherUserId) => {
  const conversationsRef = collection(db, 'conversations')

  const conversationQuery = query(
    conversationsRef,
    where('participants', 'array-contains', currentUserId)
  )

  const snapshot = await getDocs(conversationQuery)

  const existingConversation = snapshot.docs.find((document) => {
    const participants = document.data().participants

    return (
      participants.length === 2 &&
      participants.includes(otherUserId)
    )
  })

  if (existingConversation) {
    return existingConversation.id
  }

  const newConversation = await addDoc(conversationsRef, {
    participants: [currentUserId, otherUserId].sort(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessage: '',
  })

  return newConversation.id
}

export const sendMessage = async (conversationId, senderId, text) => {
  const messagesRef = collection(
    db,
    'conversations',
    conversationId,
    'messages'
  )

  await addDoc(messagesRef, {
    senderId,
    text: text.trim(),
    createdAt: serverTimestamp(),
  })
}

export const listenToMessages = (conversationId, callback) => {
  const messagesRef = collection(
    db,
    'conversations',
    conversationId,
    'messages'
  )

  const messagesQuery = query(
    messagesRef,
    orderBy('createdAt', 'asc')
  )

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }))

    callback(messages)
  })
}
