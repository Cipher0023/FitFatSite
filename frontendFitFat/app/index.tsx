import { ScrollView, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { useAppStore } from '../store/store';
import { Colors } from '../constants/colors';
import Carousel from "../components/carousel/weklyCarousel/weklyCarousel";
import ChefInfo from "@/components/chef/chef";
import Slider from "@/components/carousel/highlightsCarousel/slider";

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
    page: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingBottom: 40,
      justifyContent: 'flex-start'
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
      flex: 1,
      marginBottom: 50,
    },
    heroImage: {
      height: screenWidth/3, 
      width:screenWidth,
      alignSelf: 'center'
    },
    testContainer: {
      flex: 1,
      marginBottom: 10,
      backgroundColor:theme.test
    }
  });

  return (
    <View style={dynamicStyles.page}>
      <ScrollView 
        contentContainerStyle={dynamicStyles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
      
        <View style={dynamicStyles.heroContainer}>
          <Image
            source={require('../assets/images/real/fitfatHeroImage.png')}
            style={dynamicStyles.heroImage}
          />
        </View>

        <View style={dynamicStyles.testContainer}>
          <Slider/>
        </View>

        <Text style={dynamicStyles.text}>Marmitas do dia</Text>

        <Carousel data={data} />

        <ChefInfo />

        {/* Outros componentes */}
      </ScrollView>
    </View>
  );
}