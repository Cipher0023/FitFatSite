import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import React from 'react';
import { ImageSliderType } from "@/placeholderData/carouselData";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
  screenWidth: number;
  onNext: () => void;
  onPrevious: () => void;
};

const screenWidth = Dimensions.get('window').width;

const SliderItem = ({ item, index, scrollX, screenWidth, onNext, onPrevious }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth];
    const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.container, { width: screenWidth }, animatedStyle]}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </LinearGradient>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={onPrevious}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onNext}>
            <Ionicons name="arrow-forward-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.light.test2,
  },
  itemContainer: {
    position: 'relative',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth / 2,
    height: 300,
    borderRadius: 20,
    resizeMode: 'cover',
    marginVertical: 5,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 10,
    marginTop: 5,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});