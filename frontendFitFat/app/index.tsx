import { ScrollView, Text, View, Image, StyleSheet, Dimensions } from "react-native";
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
  { id: "7", title: "Domingo" }
];

export default function Index() {
  const { isDarkMode } = useAppStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const screenWidth = Dimensions.get('window').width;

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
    heroContainer: {
      width: screenWidth * 1, // 60% da largura da tela
      marginBottom: 20,
      height: 300
    },
    heroImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'relative',
    },
    heroTextContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      paddingHorizontal: 15,
    },
    heroText: {
      fontSize: 32,
      fontWeight: '800',
      color: 'white',
      textAlign: 'center',
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
    }
  });

  return (
    <View style={dynamicStyles.container}>
      <ScrollView 
        contentContainerStyle={dynamicStyles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={dynamicStyles.heroContainer}>
          <Image
            source={require('../assets/images/real/fitfatHeroImage.png')}
            style={dynamicStyles.heroImage}
          />
          <View style={dynamicStyles.heroTextContainer}>
            <Text style={dynamicStyles.heroText}>Marmitas Fit & Saborosas</Text>
          </View>
        </View>

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