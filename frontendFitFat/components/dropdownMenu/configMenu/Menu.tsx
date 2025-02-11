import { View, Pressable, Text, Switch,StyleSheet } from 'react-native';
import { useAppStore } from '@/store/store';
import { Colors } from '@/constants/colors';

export default function SettingsMenu() {
  const { 
    isSettingsOpen,
    isDarkMode,
    closeSettings,
    toggleDarkMode
  } = useAppStore();

  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (!isSettingsOpen) return null;

  return (
    <View style={styles.overlay}>
      <View style={[styles.popup, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Configurações</Text>
        
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: theme.textPrimary }]}>
            Modo Escuro
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <Pressable 
          style={[styles.closeButton, { backgroundColor: theme.headerBg }]}
          onPress={closeSettings}
        >
          <Text style={styles.closeText}>Fechar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
      },
      popup: {
        borderRadius: 12,
        padding: 20,
        width: '80%',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
      },
      settingText: {
        fontSize: 16,
      },
      closeButton: {
        marginTop: 20,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
      },
      closeText: {
        color: 'white',
        fontWeight: 'bold',
      }
})