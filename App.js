import * as SplashScreen from 'expo-splash-screen'
import AuthNavigation from './AuthNavigation'

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 2000)

  return (
    <AuthNavigation/>
  )
}