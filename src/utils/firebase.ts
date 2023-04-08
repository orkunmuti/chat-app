import { chatCollection, firebaseDb } from '@app/config/firebase'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { IMessage } from 'react-native-gifted-chat'

export const fetchMessagesFromFirebase = async (lastMessage?: IMessage) => {
  const messagesRef = collection(firebaseDb, chatCollection)
  let q = query(messagesRef, orderBy('createdAt', 'desc'), limit(25))

  if (lastMessage) {
    q = query(q, startAfter(lastMessage.createdAt))
  }

  const querySnapshot = await getDocs(q)
  const loadedMessages = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      _id: doc.id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: data.user,
    }
  })

  return loadedMessages
}

export const sendMessageToFirebase = async (message: IMessage) => {
  await addDoc(collection(firebaseDb, chatCollection), {
    text: message.text,
    createdAt: new Date(),
    user: message.user,
  })
}

export const subscribeToNewMessages = (onNewMessage: (newMessage: IMessage) => void) => {
  const messagesRef = collection(firebaseDb, chatCollection)
  const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1))

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0]
      const data = doc.data()
      const newMessage = {
        _id: doc.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      }

      onNewMessage(newMessage)
    }
  })

  return unsubscribe
}
