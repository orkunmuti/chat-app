import React from 'react'
import { ActivityIndicator } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { useChatMessages } from '../../hooks/useChatMessages'
import { ChatScreenProps } from './types'

export const ChatScreen: React.FC<ChatScreenProps> = ({ displayName }) => {
  const user = {
    _id: displayName,
    name: displayName,
  }
  const { messages, sendMessage, loadMoreMessages, isLoading } = useChatMessages({ user })

  return (
    <GiftedChat
      messages={messages}
      isLoadingEarlier={isLoading}
      onSend={(newMessages) => sendMessage(newMessages)}
      onLoadEarlier={loadMoreMessages}
      renderLoading={() => <ActivityIndicator size={'small'} />}
      user={user}
      scrollToBottom
      inverted={true}
      renderUsernameOnMessage
      showUserAvatar
      infiniteScroll
      loadEarlier
    />
  )
}

export default ChatScreen
