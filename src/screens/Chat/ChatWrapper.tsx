import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { EnterNameScreen } from '../EnterName/EnterNameScreen'
import ChatScreen from './ChatScreen'

export const ChatWrapper: React.FC = () => {
  const [displayName, setDisplayName] = useState('')

  const handleDisplayNameSubmit = (newDisplayName: string) => {
    setDisplayName(newDisplayName)
  }

  return (
    <SafeAreaView style={styles.container}>
      {!displayName ? (
        <EnterNameScreen onSubmit={handleDisplayNameSubmit} />
      ) : (
        <ChatScreen displayName={displayName} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
