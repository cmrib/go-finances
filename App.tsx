import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme';
import { Register } from './src/screens/Register';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen'

export default function App() {

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  // segura a tela de splash enquanto as fontes não forem carregadas
  if (!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
  );
}