import { View, Text, StyleSheet, Image } from 'react-native';
import { useAppStore } from '../../store/store';
import { Colors } from '../../constants/colors';

export default function ChefInfo() {
  const { isDarkMode } = useAppStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Container da foto */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/real/chef.png')}
          style={styles.personImage}
          resizeMode="contain"
        />
      </View>

      {/* Container do texto */}
      <View style={styles.textContainer}>
        <Text>Chef Dani Rodrigues</Text>
        <Text style={[styles.description, { color: theme.textPrimary }]}>
          Aqui estão as informações da chef de cozinha. Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    marginLeft: 5,
    marginRight:5,
  },
  imageContainer: {
    flex: 1,
    marginRight: 15,
  },
  textContainer: {
    flex: 2,
  },
  personImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});