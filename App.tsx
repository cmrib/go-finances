import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { AppRoutes } from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native'

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
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}