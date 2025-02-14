import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../../store/store';
import { Colors } from '../../constants/colors';

export default function Header() {
  const { isDarkMode, toggleMenu } = useAppStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.headerBg }]}>
      {/* Container da Logo (Esquerda) */}
      <View style={styles.leftContainer}>
        <Image
          source={require('../../assets/images/real/fitfat.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>


      {/* Container do Menu (Direita) */}
      <View style={styles.rightContainer}>
        <Pressable onPress={toggleMenu} style={styles.menuButton}>
          <MaterialCommunityIcons 
            name="menu" 
            size={28} 
            color={theme.icons} 
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    height: 70, // Altura fixa para melhor consistência
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18, // Reduzi um pouco o tamanho para melhor ajuste
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 8, // Espaçamento lateral
  },
  menuButton: {
    padding: 8,
  },
  logoImage: {
    width: 150, // Largura fixa
    height: 150, // Altura fixa
  },
});