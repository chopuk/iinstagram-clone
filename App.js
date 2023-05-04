import * as SplashScreen from 'expo-splash-screen'

import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { firebase } from './firebase'
import { StatusBar } from 'react-native'
import AuthNavigation from './AuthNavigation'

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
  setTimeout(async () => {
    await SplashScreen.hideAsync()
  }, 3000)

  useEffect(
      () => {
        async function checkStorageCredentials() {
          try {
            const storedCredentials = await SecureStore.getItemAsync('credentials')
            if (storedCredentials) {
              const mycredentials = JSON.parse(storedCredentials)
              await firebase.auth().signInWithEmailAndPassword(mycredentials.email,mycredentials.password)
            }
          } catch (error) {
              console.log(error)
          }
        }
        checkStorageCredentials()
      },
      []
  )

  return (
    <>
      <StatusBar barStyle = 'light-content' hidden ={false} backgroundColor = '#1e5f6b' translucent ={true}/>
      <AuthNavigation/>
    </>
  )
}