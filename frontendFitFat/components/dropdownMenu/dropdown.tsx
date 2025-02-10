import { View, Pressable,StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/store';
import { Colors } from '../../constants/colors';

export default function DropdownMenu() {
  const { isMenuOpen, openSettings } = useAppStore();
  const { isDarkMode } = useAppStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  if (!isMenuOpen) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Link href="/" asChild>
        <Pressable style={styles.menuItem}>
          <Text style={[styles.menuText, { color: theme.textPrimary }]}>Home</Text>
        </Pressable>
      </Link>

      <Pressable style={styles.menuItem}>
        <Text style={[styles.menuText, { color: theme.textPrimary }]}>Minha conta</Text>
      </Pressable>

      <Pressable style={styles.menuItem}>
        <Text style={[styles.menuText, { color: theme.textPrimary }]}>Meus pedidos</Text>
      </Pressable>

      <Pressable style={styles.menuItem}>
        <Text style={[styles.menuText, { color: theme.textPrimary }]}>Informações</Text>
      </Pressable>

      <Pressable 
        style={styles.menuItem} 
        onPress={openSettings}
      >
        <Text style={[styles.menuText, { color: theme.textPrimary }]}>Configurações</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 16,
        top: 60,
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        zIndex: 10,
        minWidth: 150,
      },
      menuItem: {
        paddingVertical: 10,
      },
      menuText: {
        fontSize: 16,
      }
})