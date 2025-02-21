import { StyleSheet, Text,View, Image, Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import { ImageSliderType } from "@/placeholderData/carouselData";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated,{ SharedValue, useAnimatedStyle, interpolate,Extrapolation } from "react-native-reanimated";

type Props ={
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;

}

const{width} =Dimensions.get('window');


const SliderItem = ({item,index,scrollX}: Props) => {

  const rnAnimatedStyle = useAnimatedStyle(()=>{
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width*0.5, 0, width*0.5],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.85, 1, 0.85],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  });

  return (
    <Animated.View style={[styles.itemContainer,rnAnimatedStyle]}>
      <Image source={item.image} style={styles.image}/>

      <LinearGradient
        colors={['transparent','rgba(0,0,0,0.8)']}
        style={styles.background}
      >
      
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="heart-outline" size={24} color="white"/>
        </TouchableOpacity>
      </View>


      <View style={{gap:10}}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>    
      </View>  
      </LinearGradient>
    </Animated.View>
  );
}

export default SliderItem;

const styles= StyleSheet.create({
  itemContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: width
  },
  background:{
    position: 'absolute',
    width: 200,
    height: 200,
    padding: 20,
    borderRadius:20,
    justifyContent: 'space-between',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.5
  },
  description:{
    fontSize: 10,
    fontWeight: 'normal',
    color: 'white',
    letterSpacing: 1.2
  },
  icon:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 50,
  },
  image:{
    width: 200,
    height: 200,
    borderRadius: 20
  }
});
