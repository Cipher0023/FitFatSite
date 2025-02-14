import { StyleSheet,Text,View, Image, Dimensions, TouchableOpacity} from "react-native";
import React from 'react'
import { ImageSliderType } from "@/placeholderData/data";
import {LinearGradient} from 'expo-linear-gradient'
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated,{
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from "react-native-reanimated";


type Props = {
    item: ImageSliderType;
    index: number;
    scrollX: SharedValue<number>
    screenWidth: number;
    onNext:() =>void;
    onPrevious:() =>void;
};

const screenWidth = Dimensions.get('window').width;

const SliderItem = ({item,index,scrollX,screenWidth,onNext,onPrevious}: Props) => {

  const animatedStyle = useAnimatedStyle(()=> {

    const inputRange = [
      (index-1)*screenWidth,
      index*screenWidth,
      (index+1)*screenWidth
    ];
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [0.8,1,0.8],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5,1,0.5],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8,1,0.8],
      Extrapolation.CLAMP
    );

    return{
      opacity,
      transform: [
          {translateX},
          {scale}
      ]
    }
  })

  return (
    <Animated.View style={[styles.container, {width: screenWidth}, animatedStyle]}>

      <View style={styles.itemConatiner}>
        
        <Image source={item.image} style={[styles.image, {width:screenWidth/3}]} />

        <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style = {styles.gradient}>

          <View style={{alignItems:'flex-end'}}>

            <View style={styles.controls}>

              <TouchableOpacity style={styles.icon} onPress={onPrevious}>
                <Ionicons name="arrow-back-circle-outline" size={24} color={'rgb(255, 255, 255)'} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.icon} onPress={onNext}>
                <Ionicons name="arrow-forward-circle-outline" size={24} color={'rgb(255, 255, 255)'} />
              </TouchableOpacity>

            </View>

          </View>

          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

        </LinearGradient>

      </View>
    </Animated.View>
  )
}

export default SliderItem

const styles = StyleSheet.create({

  itemConatiner:{
    flex:1,
    justifyContent: 'space-between',
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    width:500,
    backgroundColor: Colors.light.test2
  },
  background:{
    position:'absolute',
    //height:screenWidth/3,
    height:300,
    //width:screenWidth-10,
    width:300,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  image: {
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  title:{
    color: 'rgb(255, 255, 255)',
    fontSize:18,

  },
  description:{
    color: 'rgb(255, 255, 255)',
    fontSize:10,
  },
  icon:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding:5,
    borderRadius:20,
    height:35
  },
  controls:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    position:'absolute',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.test3
  }


})