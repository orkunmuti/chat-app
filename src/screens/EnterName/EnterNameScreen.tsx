import DismissKeyboard from '@app/components/DismissKeyboard.tsx/DismissKeyboard'
import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { EnterNameScreenProps } from './types'

export const EnterNameScreen: React.FC<EnterNameScreenProps> = ({ onSubmit }) => {
  const [displayName, setDisplayName] = useState('')
  const animatedValue = new Animated.Value(0)

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start()
  }

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', '#ff581e'],
  })

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  })

  useEffect(() => {
    startAnimation()
  }, [])

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { opacity }]}>
          Enter your name to start chatting
        </Animated.Text>
        <Animated.View style={[styles.inputContainer, { borderColor }]}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
            placeholder='Enter Display Name'
          />
        </Animated.View>
        <TouchableOpacity
          style={[styles.button, !displayName && { backgroundColor: 'rgba(255, 88, 30, 0.5)' }]}
          onPress={() => onSubmit(displayName)}
          disabled={!displayName}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: '80%',
  },
  input: {
    height: 40,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#ff581e',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
