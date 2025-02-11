import { Stack } from 'expo-router';
import { View, Text, StyleSheet, Pressable,Switch  } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../store/store';
import Header from '../components/header/header'
import DropdownMenu from '../components/dropdownMenu/dropdown'
import SettingsMenu from '../components/dropdownMenu/configMenu/Menu'

export default function Layout() {
  // Busca apenas os estados/ações necessários
  const {
    isMenuOpen,
    isSettingsOpen,
    isDarkMode,
    toggleMenu,
    openSettings,
    closeSettings,
    toggleDarkMode
  } = useAppStore();

  return (
    <View style={styles.container}>
      {/* CABEÇALHO COM MENU */}

      <Header/>

      {/* MENU DROPDOWN */}

      <DropdownMenu/>

      {/* POPUP DE CONFIGURAÇÕES */}

      <SettingsMenu />

      
      {/* ÁREA DAS PÁGINAS */}
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' } 
        }} 
      />

      {/* RODAPÉ */}
      <Text style={styles.footer}>© 2025 Cubic developers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Importante para o dropdown
  },
  footer: {
    padding: 8,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  }
});