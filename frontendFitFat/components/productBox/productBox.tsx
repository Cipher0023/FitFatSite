import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStore } from '../../store/store';
import { Colors } from '../../constants/colors';

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl?: string;
  onPress?: () => void;
}

export default function ProductCard({
  title,
  price,
  imageUrl,
  onPress,
}: ProductCardProps) {
  const { isDarkMode } = useAppStore();
  const theme = isDarkMode ? Colors.dark : Colors.light;

  // Estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
      width: 160,
      backgroundColor: theme.background,
      borderRadius: 8,
      margin: 8,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      height: 140,
      backgroundColor: theme.background,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      overflow: 'hidden',
    },
    title: {
      fontSize: 14,
      color: theme.textPrimary,
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.textPrimary,
    },
    placeholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    }
  });

  return (
    <Pressable style={dynamicStyles.container} onPress={onPress}>
      <View style={dynamicStyles.imageContainer}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
          />
        ) : (
          <View style={dynamicStyles.placeholder}>
            <MaterialIcons 
              name="photo" 
              size={40} 
              color={theme.textSecondary} 
            />
          </View>
        )}
      </View>

      <View style={{ padding: 12 }}>
        <Text style={dynamicStyles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={dynamicStyles.price}>
          R$ {price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}