import { useEffect, useState } from 'react'
import { IMessage } from 'react-native-gifted-chat'

import { ChatUser } from '@app/screens/Chat/types'
import {
  fetchMessagesFromFirebase,
  sendMessageToFirebase,
  subscribeToNewMessages,
} from '@app/utils/firebase'

interface UseChatMessagesProps {
  user: ChatUser
}

export const useChatMessages = ({ user }: UseChatMessagesProps) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMessages = async (lastMessage?: IMessage) => {
    setIsLoading(true)
    const loadedMessages = await fetchMessagesFromFirebase(lastMessage)
    if (lastMessage) {
      setMessages((prevMessages) => [...prevMessages, ...loadedMessages])
    } else {
      setMessages(loadedMessages)
    }
    setIsLoading(false)
  }

  const loadMoreMessages = () => {
    const lastMessage = messages[messages.length - 1]
    fetchMessages(lastMessage)
  }

  const sendMessage = async (newMessages: IMessage[]) => {
    const message = newMessages[newMessages.length - 1]
    await sendMessageToFirebase(message)
  }

  const handleNewMessage = (newMessage: IMessage) => {
    const isMessageDuplicate = !!messages.find((message) => message._id === newMessage._id)

    if (messages.length !== 0 && !isMessageDuplicate) {
      setMessages((prevMessages) => [newMessage, ...prevMessages])
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [user._id])

  useEffect(() => {
    const unsubscribe = subscribeToNewMessages(handleNewMessage)
    return () => {
      unsubscribe()
    }
  }, [handleNewMessage])

  return { messages, sendMessage, fetchMessages, loadMoreMessages, isLoading }
}
