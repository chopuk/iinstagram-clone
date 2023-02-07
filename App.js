import * as SplashScreen from 'expo-splash-screen'
import AuthNavigation from './AuthNavigation'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { firebase } from './firebase'

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 2000)

  useEffect(
      () => {
        async function checkStorageCredentials() {
          try {
            const fred = await SecureStore.getItemAsync('credentials')
            const mycredentials = JSON.parse(fred)
            await firebase.auth().signInWithEmailAndPassword(mycredentials.email,mycredentials.password)
          } catch (error) {
              console.log(error)
          }
        }
        checkStorageCredentials()
      },
      []
  )

  return (
    <AuthNavigation/>
  )
}