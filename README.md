# Firebase Chat App

This is a simple real-time chat application built using React Native, Firebase, and the react-native-gifted-chat library.

## Features

- Real-time messaging
- Infinite scrolling for loading more messages
- User display names
- Username and avatar display on messages
- Enter your name to start chatting

## Installation

Before running the application, make sure you have Node.js and the Expo CLI installed on your machine.

1.  Clone the repository:

`git clone https://github.com/yourusername/firebase-chat-app.git`

1.  Install the dependencies:

`cd firebase-chat-app
npm install`

1.  Set up a Firebase project:

    - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    - Enable Firestore for the project.
    - Create a collection named "messages" in Firestore.
    - Obtain your Firebase configuration object from the project settings.

2.  Configure the app with your Firebase credentials:

- Create a new file `firebase.ts` in the `src/config` directory.
- Add your Firebase configuration object to the file:


```
src/config/firebase.ts

export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
}
```


1.  Run the application:

`expo start`

This command will open Expo DevTools in your default web browser. You can then either run the app on an iOS or Android simulator or use the Expo Go app on a physical device by scanning the QR code.

## Usage

1.  Enter your display name on the "Enter your name to start chatting" screen.
2.  Press "Start Chatting" to enter the chat room.
3.  Type your message and hit send. The message will appear in real-time in the chatroom.
4.  Scroll up to load earlier messages.

That's it! Enjoy chatting with other users in real-time using the Firebase Chat App.
