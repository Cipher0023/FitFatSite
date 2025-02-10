import { Text, View, Image, StyleSheet } from "react-native";
import ProductCard from '../components/productBox/productBox';
import { useAppStore } from '../store/store'; // Adicione esta linha
import { Colors } from '../constants/colors'; // Adicione esta linha
import Carousel from "../components/carrousel/carousel"

const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
  { id: "6", title: "Item 6" },
  { id: "7", title: "Item 7" },
  { id: "8", title: "Item 8" },
  { id: "9", title: "Item 9" },
  { id: "10", title: "Item 10" },
]



export default function Index() {
  const { isDarkMode } = useAppStore(); // Obtenha o estado do tema
  const theme = isDarkMode ? Colors.dark : Colors.light;

  // Estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.background,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.overlay,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textPrimary,
      textShadowColor: theme.shadow,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      marginTop: 40,
      alignSelf: 'center'
    }
  });

  return (
    <View style={dynamicStyles.container}>
      <Image
        source={require('../assets/images/restaurant.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Overlay para contraste */}
      <View style={dynamicStyles.overlay} />

      <Text style={dynamicStyles.text}>Fit Fat frontpage</Text>

      <Carousel data={data} />

      <ProductCard
        title="Marmita Básica"
        price={49.90}
        imageUrl="https://exemplo.com/camiseta.jpg"
        onPress={() => console.log('Produto clicado')}
      />
    </View>
  );
}

// Estilos estáticos (não dependem do tema)
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    top: 0,
    left: 0,
  },
});