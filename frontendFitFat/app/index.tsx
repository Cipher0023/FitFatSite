import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import ProductCard from '../components/productBox/productBox';
import { useAppStore } from '../store/store';
import { Colors } from '../constants/colors';
import Carousel from "../components/carrousel/carousel";
import ChefInfo from "@/components/chef/chef";

const data = [
  { id: "1", title: "Segunda" },
  { id: "2", title: "Terça" },
  { id: "3", title: "Quarta" },
  { id: "4", title: "Quinta" },
  { id: "5", title: "Sexta" },
  { id: "6", title: "Sabado" },
  { id: "7", title: "Domingo" },
]


export default function Index() {
  const { isDarkMode } = useAppStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 40, // Espaço no final do scroll
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textPrimary,
      textAlign: 'center',
      marginVertical: 20,
      paddingHorizontal: 15,
    },
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3, // Reduz a opacidade para melhor legibilidade
    }
  });

  return (
    <View style={dynamicStyles.container}>
      <Image
        source={require('../assets/images/restaurant.png')}
        style={dynamicStyles.backgroundImage}
        resizeMode="cover"
      />
      
      <ScrollView 
        contentContainerStyle={dynamicStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={dynamicStyles.text}>Marmitas do dia</Text>

        <Carousel data={data} />

        <ChefInfo />

        <ProductCard
          title="Marmita Básica"
          price={49.90}
          imageUrl="https://exemplo.com/camiseta.jpg"
          onPress={() => console.log('Produto clicado')}
        />

        {/* Adicione mais espaço no final se necessário */}
        <View style={{ height: 20 }} /> 
      </ScrollView>
    </View>
  );
}